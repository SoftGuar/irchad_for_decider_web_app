'use client'
import React, { useState, useEffect } from "react";
import { AnalyticsData } from "../../../type/types"; // Adjust the import path as necessary
import Card from "../../components/cards/Card";
import Table from "../../components/cards/Table";
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
  fetchAverageQuotationValue
} from "../../../services/AnalyticsApi"; // Assuming you put the fetch functions in utils/analyticsDevice.ts

const Dashboard: React.FC = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const convertedQuotationsData = await fetchConvertedQuotationsCount();
        const averageTimeToConversionData = await fetchAverageTimeToConversion();
        const mostQuotedProductsData = await fetchMostFrequentlyQuotedProducts();
        const productConversionRatesData = await fetchProductConversionRate();
        const totalValueByProductData = await fetchTotalValueByProduct();
        const clientsWithMostUnconvertedData = await fetchClientsWithMostUnconverted();
        const totalQuotationsCreatedData = await fetchTotalQuotationsCreated();
        const averageProductsPerQuotationData = await fetchAverageProductsPerQuotation();
        const averageQuotationValueData = await fetchAverageQuotationValue();

        // Set the fetched data to state
        setData({
          convertedQuotations: convertedQuotationsData.ConvertedQuotations,
          conversionRate: convertedQuotationsData.taux_conversion,
          averageTimeToConversion: `${averageTimeToConversionData.averageTimeToConversion} days`,
          mostQuotedProducts: mostQuotedProductsData.map((item: any) => ({
            product_id: item.product_id,
            name: item.name, // Assuming the API returns name along with product_id
            count: item.count
          })),
          productConversionRates: productConversionRatesData.map((item: any) => ({
            product_id: item.product_id,
            name: item.name, // Assuming the API returns name along with product_id
            conversion_rate: item.conversion_rate
          })),
          totalQuotationValueByProduct: totalValueByProductData.map((item: any) => ({
            product_id: item.product_id,
            name: item.name, // Assuming the API returns name along with product_id
            total_value: item.total_value
          })),
          clientsWithMostUnconverted: clientsWithMostUnconvertedData.map((item: any) => ({
            user_id: item.user_id,
            name: item.name, // Assuming the API returns name along with user_id
            unconverted_count: item.unconverted_count
          })),
          totalQuotationsCreated: totalQuotationsCreatedData.totalQuotationsCreated,
          averageProductsPerQuotation: averageProductsPerQuotationData.averageProductsPerQuotation,
          averageQuotationValue: averageQuotationValueData.averageQuotationValue
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Render the dashboard with fetched data
  if (!data) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className="bg-black h-screen w-full relative overflow-y-scroll">
      <div className="absolute h-1/3 w-full rounded-b-lg overflow-hidden">
        <Image src="/images/login_image.png" alt="Background" layout="fill" objectFit="cover" quality={100} priority className="rounded-b-lg" />
        <div className="absolute top-1/2 left-10 transform -translate-y-1/2 text-white">
          <h1 className="text-4xl font-bold drop-shadow-lg">Quotations</h1>
          <p className="text-lg drop-shadow-md"></p>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent p-6 w-full mt-64">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card title="Converted Quotations" value={data.convertedQuotations} />
          <Card title="Conversion Rate" value={`${data.conversionRate}%`} />
          <Card title="Avg. Time to Convert" value={data.averageTimeToConversion} />
          <Card title="Total Quotations Created" value={data.totalQuotationsCreated} />
          <Card title="Avg. Products/Quotation" value={data.averageProductsPerQuotation} />
          <Card title="Avg. Quotation Value" value={`$${data.averageQuotationValue}`} />
        </div>

        <Table title="Most Quoted Products" headers={["Product", "Count"]} data={data.mostQuotedProducts.map(p => [p.name, p.count!])} />
        <Table title="Product Conversion Rates" headers={["Product", "Conversion Rate (%)"]} data={data.productConversionRates.map(p => [p.name, p.conversion_rate!])} />
        <Table title="Clients with Most Unconverted Quotations" headers={["Client", "Unconverted Count"]} data={data.clientsWithMostUnconverted.map(c => [c.name, c.unconverted_count])} />
      </div>
    </div>
  );
};

export default Dashboard;
