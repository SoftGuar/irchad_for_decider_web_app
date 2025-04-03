// pages/index.tsx
import React from "react";
import { AnalyticsData } from "../../type/types"; // Adjust the import path as necessary
import Card from "../../components/shared/cards/Card";
import Table from "../../components/shared/cards/Table";
import Image from "next/image";
const sampleData: AnalyticsData = {
  convertedQuotations: 125,
  conversionRate: 37.5,
  averageTimeToConversion: "3 days",
  mostQuotedProducts: [
    { product_id: 1, name: "Laptop", count: 45 },
    { product_id: 2, name: "Monitor", count: 30 },
  ],
  productConversionRates: [
    { product_id: 1, name: "Laptop", conversion_rate: 45 },
    { product_id: 2, name: "Monitor", conversion_rate: 32 },
  ],
  totalQuotationValueByProduct: [
    { product_id: 1, name: "Laptop", total_value: 15000 },
    { product_id: 2, name: "Monitor", total_value: 9000 },
  ],
  clientsWithMostUnconverted: [
    { user_id: 101, name: "John Doe", unconverted_count: 12 },
    { user_id: 102, name: "Jane Smith", unconverted_count: 8 },
  ],
  totalQuotationsCreated: 200,
  averageProductsPerQuotation: 3.2,
  averageQuotationValue: 500,
};

const Dashboard: React.FC = () => {
    return (
        
      <div className="bg-black w-full relative">  {/* Added relative to the parent div */}
        <div className="absolute h-1/3 w-full rounded-b-lg overflow-hidden">
          <Image src="/images/login_image.png" alt="Background" layout="fill" objectFit="cover" quality={100} priority className="rounded-b-lg" />
          <div className="absolute top-1/2 left-10 transform -translate-y-1/2 text-white">
            <h1 className="text-4xl font-bold drop-shadow-lg">Qotations</h1>
            <p className="text-lg drop-shadow-md"> </p>
          </div>
        </div>
  
        {/* This div is now absolutely positioned to appear on top of the image */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent p-6 w-full mt-64">
           
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card title="Converted Quotations" value={sampleData.convertedQuotations} />
            <Card title="Conversion Rate" value={`${sampleData.conversionRate}%`} />
            <Card title="Avg. Time to Convert" value={sampleData.averageTimeToConversion} />
            <Card title="Total Quotations Created" value={sampleData.totalQuotationsCreated} />
            <Card title="Avg. Products/Quotation" value={sampleData.averageProductsPerQuotation} />
            <Card title="Avg. Quotation Value" value={`$${sampleData.averageQuotationValue}`} />
          </div>
  
          <Table title="Most Quoted Products" headers={["Product", "Count"]} data={sampleData.mostQuotedProducts.map(p => [p.name, p.count!])} />
          <Table title="Product Conversion Rates" headers={["Product", "Conversion Rate (%)"]} data={sampleData.productConversionRates.map(p => [p.name, p.conversion_rate!])} />
          <Table title="Clients with Most Unconverted Quotations" headers={["Client", "Unconverted Count"]} data={sampleData.clientsWithMostUnconverted.map(c => [c.name, c.unconverted_count])} />
        </div>
      </div>
      
    );
  };
  export default Dashboard;
