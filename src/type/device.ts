export interface Device {
    id: string;
    type: string;
    mac: string;
    status: string;
    lastEdited: string;
    activationDate: string;
    assignedTo: string;
    version: string;
    photo: string;
}

export interface DeviceData {
    Product: any;
    state: any;
    end_date: any;
    start_date: any;
    id: string;
    assignedUser: any;
    image: string;
    location: string;
    status: string;
    battery: string;
    deviceId: string;
    type: string;
    MAC: string;
    activationDate: string;
    softwareVersion: string;
    maintenanceHistory: { time: string; event: string }[];
    systemLogs: { issue: string; description: string }[];
    user_id : string;
}
// types/deviceAnalytics.ts

export interface DeviceStatus {
    dispositive_id: number;
    connected: boolean;
    timestamp: string;
    battery_level: number;
  }
  
  export interface DeviceIssueStats {
    month: string;
    type: string;
    issue_count: number;
  }
  
  export interface DevicePerformance {
    device_id: number;
    device_mac: string;
    avg_battery_level: number;
    total_issues: number;
    avg_days_to_first_issue: number;
  }
  
  export interface DeviceIssueList {
    dispositiveId: number;
    _count: {
      id: number;
    };
  }
  
  export interface DeviceSales {
    sale_month: string;
    devices_sold: number;
    total_revenue: number;
  }
  
  export interface DeviceRevenue {
    sale_period: string;
    devices_sold: number;
    total_revenue: number;
    avg_device_price: number;
  }
  
  export interface PopularDevice {
    product_name: string;
    total_devices: number;
    sales_count: number;
    total_revenue: number;
  }
  
  export interface DeviceIntervention {
    intervention_month: string;
    type: string;
    intervention_count: number;
    resolution_rate: number;
  }
  