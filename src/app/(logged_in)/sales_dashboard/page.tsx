// First, install the required packages:
// npm install jspdf jspdf-autotable html2canvas

// Then modify your Dashboard.tsx file:

'use client';
import React, { useState, useEffect } from "react";
import { AnalyticsData } from "../../../type/types";
import Card from "../../components/cards/Card";
import Table from "../../components/cards/Table";
import Image from "next/image";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';
import {
  fetchConvertedQuotationsCount,
  fetchAverageTimeToConversion,
  fetchMostFrequentlyQuotedProducts,
  fetchProductConversionRate,
  fetchTotalValueByProduct,
  fetchClientsWithMostUnconverted,
  fetchTotalQuotationsCreated,
  fetchAverageProductsPerQuotation,
  fetchAverageQuotationValue,
  salesdetails,
  totalvaluebyproduct
} from "../../../services/AnalyticsApi";

const Dashboard: React.FC = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [generatingPDF, setGeneratingPDF] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [
          convertedQuotationsData,
          averageTimeToConversionData,
          mostQuotedProductsData,
          productConversionRatesData,
          totalValueByProductData,
          clientsWithMostUnconvertedData,
          totalQuotationsCreatedData,
          averageProductsPerQuotationData,
          averageQuotationValueData,
          SalesDetailsData,
          totalQuotationValueByProduct
        ] = await Promise.all([
          fetchConvertedQuotationsCount(),
          fetchAverageTimeToConversion(),
          fetchMostFrequentlyQuotedProducts(),
          fetchProductConversionRate(),
          fetchTotalValueByProduct(),
          fetchClientsWithMostUnconverted(),
          fetchTotalQuotationsCreated(),
          fetchAverageProductsPerQuotation(),
          fetchAverageQuotationValue(),
          salesdetails(),
          totalvaluebyproduct()
        ]);

        setData({
          convertedQuotations: convertedQuotationsData.ConvertedQuotations,
          conversionRate: convertedQuotationsData.taux_conversion,
          averageTimeToConversion: `${averageTimeToConversionData.averageTimeToConversion} days`,
          mostQuotedProducts: mostQuotedProductsData.map((item: any) => ({
            product_id: item.product_id,
            name: item.product_id,
            count: item.count
          })),
          productConversionRates: productConversionRatesData.map((item: any) => ({
            product_id: item.product_id,
            name: item.name,
            conversion_rate: item.conversion_rate
          })),
          totalQuotationValueByProduct: totalValueByProductData.map((item: any) => ({
            product_id: item.product_id,
            name: item.name,
            total_value: item.total_value
          })),
          clientsWithMostUnconverted: clientsWithMostUnconvertedData.map((item: any) => ({
            user_id: item.user_id,
            name: item.name,
            unconverted_count: item.unconverted_count
          })),
          totalQuotationsCreated: totalQuotationsCreatedData.totalQuotationsCreated,
          averageProductsPerQuotation: averageProductsPerQuotationData.averageProductsPerQuotation,
          averageQuotationValue: averageQuotationValueData.averageQuotationValue,
          newCustomers: SalesDetailsData.new_customers,
          existingCustomers: SalesDetailsData.existing_customers,
          totalCustomers: SalesDetailsData.total_customers,
          CustomerRetentionRate: SalesDetailsData.retention_rate,
        });
console.log ("fffff",productConversionRatesData),
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const generatePDF = async () => {
    if (!data || loading) return;
    
    setGeneratingPDF(true);
    
    try {
      // Create a new PDF document
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      
      // Add title
      pdf.setFontSize(22);
      pdf.setTextColor(0, 0, 0);
      pdf.text("Quotation Analytics Report", pageWidth / 2, 20, { align: 'center' });
      
      // Add current date
      const today = new Date();
      pdf.setFontSize(10);
      pdf.text(`Generated on: ${today.toLocaleDateString()}`, pageWidth / 2, 30, { align: 'center' });
      
      // Add executive summary
      pdf.setFontSize(14);
      pdf.text("Executive Summary", 14, 40);
      pdf.setFontSize(10);
      pdf.text("This report provides a comprehensive analysis of quotation performance metrics.", 14, 48);
      
      // KPI Summary section
      pdf.setFontSize(14);
      pdf.text("Key Performance Indicators", 14, 60);
      
      // KPI data
      pdf.setFontSize(12);
      const kpiData = [
        ["Metric", "Value"],
        ["Converted Quotations", data.convertedQuotations],
        ["Conversion Rate", `${data.conversionRate}%`],
        ["Average Time to Conversion", data.averageTimeToConversion],
        ["Total Quotations Created", data.totalQuotationsCreated],
        ["Average Products/Quotation", data.averageProductsPerQuotation],
        ["Average Quotation Value", `$${data.averageQuotationValue}`],
        ["New Customers", data.newCustomers],
        ["Existing Customers", data.existingCustomers],
        ["Total Customers", data.totalCustomers],
        ["Customer Retention Rate", `${data.CustomerRetentionRate}%`]
      ];
      
      autoTable(pdf, {
        startY: 65,
        head: [kpiData[0]],
        body: kpiData.slice(1),
        theme: 'grid',
        headStyles: {
          fillColor: [51, 122, 183],
          textColor: [255, 255, 255], // White text
        },
        
      });
      
      // Most Quoted Products table
      pdf.addPage();
      pdf.setFontSize(14);
      pdf.text("Most Quoted Products", 14, 20);
      
      const mostQuotedData = [
        ["Product", "Count"],
        ...data.mostQuotedProducts.map(item => [item.product_id || '', item.count || 0])
      ];
      
      autoTable(pdf, {
        startY: 25,
        head: [mostQuotedData[0]],
        body: mostQuotedData.slice(1),
        theme: 'grid',
        headStyles: {
          fillColor: [51, 122, 183],
          textColor: [255, 255, 255], // White text
        },
        columnStyles: {
          0: { cellWidth: 60 },  // First column takes 50% of the table width
          1: { cellWidth: 60 },  // Second column takes 50% of the table width
        },
      });
      
      // Product Conversion Rates table
      const conversionY = (pdf as any).lastAutoTable.finalY + 15;
      pdf.setFontSize(14);
      pdf.text("Product Conversion Rates", 14, conversionY);
      
      const conversionData = [
        ["Product", "Conversion Rate (%)"],
        ...data.productConversionRates.map(item => [item.name, item.conversion_rate])
      ];
      
      autoTable(pdf, {
        startY: conversionY + 5,
        head: [conversionData[0].map(cell => cell ?? '')],
        body: conversionData.slice(1).map(row => row.map(cell => cell ?? '')),
        theme: 'grid',
        headStyles: {
          fillColor: [51, 122, 183],
          textColor: [255, 255, 255], // White text
        },
        columnStyles: {
          0: { cellWidth: 60 },  // First column takes 50% of the table width
          1: { cellWidth: 60 },  // Second column takes 50% of the table width
        },
      });
      
      // Clients with Most Unconverted Quotations
      pdf.addPage();
      pdf.setFontSize(14);
      pdf.text("Clients with Most Unconverted Quotations", 14, 20);
      
      const clientsData = [
        ["Client", "Unconverted Count"],
        ...data.clientsWithMostUnconverted.map(item => [item.name, item.unconverted_count])
      ];
      
      autoTable(pdf, {
        startY: 25,
        head: [clientsData[0]],
        body: clientsData.slice(1),
        theme: 'grid',
        headStyles: {
          fillColor: [51, 122, 183],
          textColor: [255, 255, 255], // White text
        },
        columnStyles: {
          0: { cellWidth: 60 },  // First column takes 50% of the table width
          1: { cellWidth: 60 },  // Second column takes 50% of the table width
        },
      });
      
      // Total Value by Product
      const valueY = (pdf as any).lastAutoTable.finalY + 15;
      pdf.setFontSize(14);
      pdf.text("Total Value by Product", 14, valueY);
      
      const valueData = [
        ["Product", "Total Value ($)"],
        ...data.totalQuotationValueByProduct.map(item => [
          item.name || `Product #${item.product_id}`,
          `$${(item.total_value ?? 0).toFixed(2)}`
        ])
      ];
      
      autoTable(pdf, {
        startY: valueY + 5,
        head: [valueData[0]],
        body: valueData.slice(1),
        theme: 'grid',
        headStyles: {
          fillColor: [51, 122, 183],
          textColor: [255, 255, 255], // White text
        },
      });
      
      // Recommendations section
      pdf.addPage();
      pdf.setFontSize(14);
      pdf.text("Recommendations", 14, 20);
      pdf.setFontSize(10);
      
      const recommendations = [
        "1. Follow-up with clients showing high interest but low conversion rates.",
        "2. Focus marketing efforts on highest-converting products.",
        "3. Review pricing strategy for products with high quotation counts but low conversion.",
        "4. Implement customer retention programs to improve repeat business.",
        "5. Optimize sales process to reduce time to conversion."
      ];
      
      recommendations.forEach((rec, idx) => {
        pdf.text(rec, 14, 30 + (idx * 8));
      });
      
      // Footer
      const totalPages = pdf.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.text(`Page ${i} of ${totalPages}`, pageWidth - 20, pdf.internal.pageSize.getHeight() - 10);
      }
      
      // Save PDF with filename
      pdf.save("Quotation_Analytics_Report.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("There was an error generating the PDF. Please try again.");
    }
    
    setGeneratingPDF(false);
  };

  return (
    <div className="bg-black h-screen w-full relative overflow-y-scroll">
      {/* Top Image Header */}
      <div className="absolute h-1/3 w-full rounded-b-lg overflow-hidden">
        <Image
          src="/images/login_image.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
          className="rounded-b-lg"
        />
        <div className="absolute top-1/2 left-10 transform -translate-y-1/2 text-white">
          <h1 className="text-4xl font-bold drop-shadow-lg">Quotations</h1>
          {loading && (
            <p className="text-lg drop-shadow-md mt-2">Chargement des données...</p>
          )}
          
          {!loading && (
            <button
              onClick={generatePDF}
              disabled={generatingPDF}
              className="mt-4 bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition-colors flex items-center"
            >
              {generatingPDF ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating PDF...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download PDF Report
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <div className="relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/5 bg-transparent p-6 w-full mt-72">
        {loading ? (
          <div className="text-white text-center mt-20 text-lg animate-pulse">
            Veuillez patienter pendant le chargement des statistiques...
          </div>
        ) : (
          <>
            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card title="Converted Quotations" value={data!.convertedQuotations} />
              <Card title="Conversion Rate" value={`${data!.conversionRate}%`} />
              <Card title="Avg. Time to Convert" value={data!.averageTimeToConversion} />
              <Card title="Total Quotations Created" value={data!.totalQuotationsCreated} />
              <Card title="Avg. Products/Quotation" value={data!.averageProductsPerQuotation} />
              <Card title="Avg. Quotation Value" value={`$${data!.averageQuotationValue}`} />
              <Card title="New Customers" value={data!.newCustomers} />
              <Card title="Existing Customers" value={data!.existingCustomers} />
              <Card title="Total Customers" value={data!.totalCustomers} />
              <Card title="Retention Rate" value={`${data!.CustomerRetentionRate}%`} />
            </div>

            {/* Tables */}
            <Table
              title="Most Quoted Products"
              headers={["Product", "Count"]}
              data={data!.mostQuotedProducts.map(p => [p.name, p.count!])}
            />
            <Table
              title="Product Conversion Rates"
              headers={["Product", "Conversion Rate (%)"]}
              data={data!.productConversionRates.map(p => [p.name, p.conversion_rate!])}
            />
            <Table
              title="Clients with Most Unconverted Quotations"
              headers={["Client", "Unconverted Count"]}
              data={data!.clientsWithMostUnconverted.map(c => [c.name, c.unconverted_count])}
            />
            <Table
              title="Total Value by Product"
              headers={["Product", "Total Value ($)"]}
              data={data!.totalQuotationValueByProduct.map(p => [
                p.name || `Product #${p.product_id}`,
                `$${(p.total_value ?? 0).toFixed(2)}`
              ])}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;