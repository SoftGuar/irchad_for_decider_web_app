// services/deviceAnalyticsApi.ts
import { DeviceIntervention, DeviceIssueStats, DevicePerformance, DeviceRevenue, DeviceSales, DeviceStatus, PopularDevice } from "../type/device";
import { AnalyticsData } from "../type/types";
import { ApiResponse } from "./ApiResponse";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


 



// Sales Stats Endpoints
export async function fetchCustomerRetentionRate() {
  const response = await fetch(`${API_URL}/analytics/sales-stats/crr`);
  if (!response.ok) throw new Error("Failed to fetch customer retention rate");
  return response.json();
}

export async function fetchCustomerRetentionDetails() {
  const response = await fetch(`${API_URL}/analytics/sales-stats/crr/details`);
  if (!response.ok) throw new Error("Failed to fetch customer retention details");
  return response.json();
}

// Quotations Endpoints
export async function fetchConvertedQuotationsCount() {
  const response = await fetch(`http://localhost:2000/analytics/quotations/count-converted`);
  if (!response.ok) throw new Error("Failed to fetch converted quotations count");
  return response.json();
}

export async function fetchAverageTimeToConversion() {
  const response = await fetch(`${API_URL}/analytics/quotations/average-time-to-conversion`);
  if (!response.ok) throw new Error("Failed to fetch average time to conversion");
  return response.json();
}

export async function fetchMostFrequentlyQuotedProducts() {
  const response = await fetch(`${API_URL}/analytics/quotations/most-frequently-quoted-products`);
  if (!response.ok) throw new Error("Failed to fetch most frequently quoted products");
  return response.json();
}

export async function fetchProductConversionRate() {
  const response = await fetch(`${API_URL}/analytics/quotations/product-conversion-rate`);
  if (!response.ok) throw new Error("Failed to fetch product conversion rate");
  return response.json();
}

export async function fetchTotalValueByProduct() {
  const response = await fetch(`${API_URL}/analytics/quotations/total-value-by-product`);
  if (!response.ok) throw new Error("Failed to fetch total value by product");
  return response.json();
}

export async function fetchClientsWithMostUnconverted() {
  const response = await fetch(`${API_URL}/analytics/quotations/clients-with-most-unconverted`);
  if (!response.ok) throw new Error("Failed to fetch clients with most unconverted quotations");
  return response.json();
}

export async function fetchTotalQuotationsCreated() {
  const response = await fetch(`${API_URL}/analytics/quotations/total-created`);
  if (!response.ok) throw new Error("Failed to fetch total quotations created");
  return response.json();
}

export async function fetchAverageProductsPerQuotation() {
  const response = await fetch(`${API_URL}/analytics/quotations/average-products-per-quotation`);
  if (!response.ok) throw new Error("Failed to fetch average products per quotation");
  return response.json();
}

export async function fetchAverageQuotationValue() {
  const response = await fetch(`${API_URL}/analytics/quotations/average-value`);
  if (!response.ok) throw new Error("Failed to fetch average quotation value");
  return response.json();
}
