export interface Product {
    product_id: number;
    name: string;
    count?: number;
    conversion_rate?: number;
    total_value?: number;
  }
  
  export interface Client {
    user_id: number;
    name: string;
    unconverted_count: number;
  }
  
  export interface AnalyticsData {
    convertedQuotations: number;
    conversionRate: number;
    averageTimeToConversion: string;
    mostQuotedProducts: Product[];
    productConversionRates: Product[];
    totalQuotationValueByProduct: Product[];
    clientsWithMostUnconverted: Client[];
    totalQuotationsCreated: number;
    averageProductsPerQuotation: number;
    averageQuotationValue: number;
    newCustomers: number;
    existingCustomers: number;
    totalCustomers: number;
    CustomerRetentionRate: number;
    
  }

  
  
  