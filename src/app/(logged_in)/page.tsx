'use client';
import React, { useState, useEffect } from "react";
import { AnalyticsData } from "../../type/types";
import Card from "../components/cards/Card";
import Table from "../components/cards/Table";
import Image from "next/image";
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
} from "../../services/AnalyticsApi";

const Dashboard: React.FC = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

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
            name: item.name,
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
