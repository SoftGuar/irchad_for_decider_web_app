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
import { useUser } from "@/src/utils/userContext";
import { ClipLoader } from "react-spinners";

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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);
  const { user, fetchUser } = useUser();

  const generatePDF = async () => {
    if (!data || loading) return;
    setGeneratingPDF(true);
    const getBase64ImageFromURL = async (url: string): Promise<string> => {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    };
    try {
      // Create a new PDF document
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      const contentWidth = pageWidth - (margin * 2);
      
      // Add logo
      const logoBase64 = await getBase64ImageFromURL("/images/logo_pdf.png");
      pdf.addImage(logoBase64, "PNG", margin, 10, 15, 15);
  
      // Add title and date
      pdf.setFontSize(22);
      pdf.setTextColor(33, 33, 33);
      pdf.setFont('helvetica', 'bold');
      pdf.text("User Activity Analytics Report", pageWidth / 2, margin + 10, { align: 'center' });
      
      const today = new Date();
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Generated on: ${today.toLocaleDateString()}`, pageWidth / 2, margin + 20, { align: 'center' });
  
      // Add user information section
      pdf.setFontSize(14);
      pdf.setTextColor(33, 33, 33);
      pdf.setFont('helvetica', 'bold');
      pdf.text("Report Generated By", margin, margin + 35);
      
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      
      // Add user details in a table format
      autoTable(pdf, {
        startY: margin + 40,
        head: [['User Information', 'Details']],
        body: [
          ['Name', user?.first_name || 'N/A'],
          ['Email', user?.email || 'N/A'],
          ['Generation Date', today.toLocaleString()]
        ],
        theme: 'grid',
        headStyles: { 
          fillColor: [51, 122, 183],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          fontSize: 10
        },
        bodyStyles: {
          textColor: [51, 51, 51],
          fontSize: 9
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245]
        },
        styles: {
          overflow: 'linebreak',
          cellPadding: 4,
          fontSize: 9,
          valign: 'middle'
        },
        columnStyles: {
          0: { cellWidth: 40, fontStyle: 'bold' },
          1: { cellWidth: 'auto' }
        },
        margin: { top: margin }
      });
  
      // Get the final Y position after the user info table
      const finalY = (pdf as any).lastAutoTable.finalY + 10;
      
      // Add executive summary - starting from the position after user info table
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text("Executive Summary", margin, finalY);
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text("This report provides a comprehensive analysis of quotation performance metrics.", margin, finalY + 8);
      
      // KPI Summary section - continue from the previous section
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text("Key Performance Indicators", margin, finalY + 20);
      
      // KPI data
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
        startY: finalY + 25,
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
      pdf.setFont('helvetica', 'bold');
      pdf.text("Most Quoted Products", margin, margin + 5);
      
      const mostQuotedData = [
        ["Product", "Count"],
        ...data.mostQuotedProducts.map(item => [item.product_id || '', item.count || 0])
      ];
      
      autoTable(pdf, {
        startY: margin + 10,
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
      pdf.setFont('helvetica', 'bold');
      pdf.text("Product Conversion Rates", margin, conversionY);
      
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
      pdf.setFont('helvetica', 'bold');
      pdf.text("Clients with Most Unconverted Quotations", margin, margin + 5);
      
      const clientsData = [
        ["Client", "Unconverted Count"],
        ...data.clientsWithMostUnconverted.map(item => [item.name, item.unconverted_count])
      ];
      
      autoTable(pdf, {
        startY: margin + 10,
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
      pdf.setFont('helvetica', 'bold');
      pdf.text("Total Value by Product", margin, valueY);
      
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
      pdf.setFont('helvetica', 'bold');
      pdf.text("Recommendations", margin, margin + 5);
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      
      const recommendations = [
        "1. Follow-up with clients showing high interest but low conversion rates.",
        "2. Focus marketing efforts on highest-converting products.",
        "3. Review pricing strategy for products with high quotation counts but low conversion.",
        "4. Implement customer retention programs to improve repeat business.",
        "5. Optimize sales process to reduce time to conversion."
      ];
      
      recommendations.forEach((rec, idx) => {
        pdf.text(rec, margin, margin + 15 + (idx * 8));
      });
      
      // Footer
      const totalPages = pdf.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.text(`Page ${i} of ${totalPages}`, pageWidth - 20, pageHeight - 10);
      }
      
      // Save PDF with filename
      pdf.save("Quotation_Analytics_Report.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("There was an error generating the PDF. Please try again.");
    }
    
    setGeneratingPDF(false);
  };

  // --- LOADER BLOCK ---
  if (loading || generatingPDF) {
    return (
      <div className="bg-black min-h-screen w-full flex flex-col items-center justify-center">
        <ClipLoader
          color="orange"
          loading={true}
          size={80}
          aria-label="Loading Spinner"
          data-testid="loader"
          cssOverride={{ display: "block", margin: "80px auto", borderColor: "orange" }}
        />
        <div className="text-white text-center mt-6 text-lg animate-pulse">
          {generatingPDF
            ? "Génération du rapport PDF..."
            : "Chargement des statistiques..."}
        </div>
      </div>
    );
  }
  // --- END LOADER BLOCK ---

  if (!data) {
    return (
      <div className="bg-black min-h-screen w-full overflow-y-auto">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-white text-center text-2xl">No data available</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-black min-h-screen w-full overflow-y-auto">
      {/* Top Image Header - fixed height */}
      <div className="h-64 w-full rounded-b-lg overflow-hidden relative">
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

      {/* Main content container */}
      <div className="container mx-auto px-4 py-8">
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card title="Converted Quotations" value={data.convertedQuotations} />
          <Card title="Conversion Rate" value={`${data.conversionRate}%`} />
          <Card title="Avg. Time to Convert" value={data.averageTimeToConversion} />
          <Card title="Total Quotations Created" value={data.totalQuotationsCreated} />
          <Card title="Avg. Products/Quotation" value={data.averageProductsPerQuotation} />
          <Card title="Avg. Quotation Value" value={`  ${data.averageQuotationValue}  DA`} />
          <Card title="New Customers" value={data.newCustomers} />
          <Card title="Total Customers" value={data.totalCustomers} />
          <Card title="Retention Rate" value={`${data.CustomerRetentionRate}%`} />
        </div>
        {/* Tables Section */}
        <div className="space-y-8">
          <Table
            title="Most Quoted Products"
            headers={["Product", "Count"]}
            data={data.mostQuotedProducts.map(p => [p.name, p.count!])}
          />
          <Table
            title="Clients with Most Unconverted Quotations"
            headers={["Client", "Unconverted Count"]}
            data={data.clientsWithMostUnconverted.map(c => [c.name, c.unconverted_count])}
          />
          <Table
            title="Total Value by Product"
            headers={["Product", "Total Value (DA)"]}
            data={data.totalQuotationValueByProduct.map(p => [
              p.name,
              `DA ${(p.total_value ?? 0).toFixed(2)}`
            ])}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// If you use getBase64ImageFromURL in your PDF logic, define it here
function getBase64ImageFromURL(arg0: string) {
  throw new Error("Function not implemented.");
}
