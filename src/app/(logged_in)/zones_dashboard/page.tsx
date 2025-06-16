'use client'
import React, { useEffect, useState } from "react";
 
import DeviceStatusGrid from "../../components/cards/DeviceStatusGrid";
import UserCommentsTable from "@/src/app/components/cards/UserComment";
import NavigationLogsTable from "@/src/app/components/cards/NavigationLogsTable";
import ObstaclesBarChart from "@/src/app/components/cards/ObstaclesBarChart";
import TimeSpentChart from "@/src/app/components/cards/TimeSpentChart";
import ReroutingBarChart from "@/src/app/components/cards/ReroutingBarChart";
import TopVisitedPOIs from "@/src/app/components/cards/TopVisitedPOIs";
import UsersAuthChart from "@/src/app/components/cards/UsersAuthChart";
import { averagetimespent, successrateofnavigations, topvisitedPOIs, highestobstacles, mostreroutingrequests } from "../../../services/zonesApi"; // adjust the path if needed
import { navigationLogs } from "../../../services/zonesApi"; // adjust the path if needed
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import { useUser } from "@/src/utils/userContext";
import Image from "next/image";
const TestDeviceStatus = () => {
  // Updated interface for time spent data
  interface TimeSpentEntry {
    zone_id: number;
    avg_time_seconds: number;
  }
  
  // Updated interface for obstacle data
  interface ObstacleEntry {
    zone_id: number;
    total_obstacles: number;
  }
  
  const [timeSpentData, setTimeSpentData] = useState<TimeSpentEntry[]>([]);
  const { user, fetchUser } = useUser();
  interface DashboardLogEntry {
    id: number;
    environment_id: number;
    start_time: string;
    rerouting_count: number;
    end_time: string;
  }

  const [logsData, setLogsData] = useState<DashboardLogEntry[]>([]);
  interface SuccessRateEntry {
    success_rate: number;
  }
  const [succData, setsuccData] = useState<SuccessRateEntry[]>([]);
  const [topVisitedData, settopVisitedData] = useState([]);
  const [obstacleData, setObstacleData] = useState<ObstacleEntry[]>([]);
  const [reroutingData, setreroutingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generatingPDF, setGeneratingPDF] = useState(false);
  
  // Function to convert seconds to minutes for display
  const secondsToMinutes = (seconds: number) => {
    return Math.round(seconds / 60);
  };

  // Function to get zone name from zone_id (you might want to replace this with actual zone names)
  const getZoneName = (zoneId: number) => {
    // You could replace this with a mapping of zone IDs to names if available
    return `Zone ${zoneId}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await averagetimespent();
        
        // Transform time spent data if needed - converting seconds to minutes for display
        const formattedData = Array.isArray(data) ? data.map(item => ({
          ...item,
          // Add a label property for charts
          label: getZoneName(item.zone_id),
          // Add a time_spent property in minutes for charts
          time_spent: secondsToMinutes(item.avg_time_seconds)
        })) : [];
        
        setTimeSpentData(formattedData);
        console.log("Fetched time spent data:", formattedData);
      } catch (error) {
        console.error("Error fetching time spent data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await navigationLogs();
        setLogsData(data);
        console.log("Fetched logs data:", data);
      } catch (error) {
        console.error("Error fetching navigation logs:", error);
      }
    };
  
    fetchLogs();
  }, []);

  useEffect(() => {
    const fetchSucc = async () => {
      try {
        const data = await successrateofnavigations();
        setsuccData(data);
      } catch (error) {
        console.error("Error fetching success rate of navigation :", error);
      }
    };
  
    fetchSucc();
  }, []);

  useEffect(() => {
    const fetchSucc = async () => {
      try {
        const data = await topvisitedPOIs();
        settopVisitedData(data);
      } catch (error) {
        console.error("Error fetching top visited POIs:", error);
      }
    };
  
    fetchSucc();
  }, []);

  useEffect(() => {
    const fetchObstacles = async () => {
      try {
        const data = await highestobstacles();
        
        // Transform obstacle data if needed
        const formattedData = Array.isArray(data) ? data.map(item => ({
          ...item,
          // Add a label property for charts
          label: getZoneName(item.zone_id),
          // For consistency with chart function expectations
          obstacle_count: item.total_obstacles
        })) : [];
        
        setObstacleData(formattedData);
        console.log("Fetched obstacle data:", formattedData);
      } catch (error) {
        console.error("Error fetching highest obstacles data:", error);
      }
    };
  
    fetchObstacles();
  }, []);

  useEffect(() => {
    const fetchSucc = async () => {
      try {
        const data = await mostreroutingrequests();
        setreroutingData(data);
      } catch (error) {
        console.error("Error fetching most rerouting requests:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchSucc();
  }, []);

  // Function to format date-time strings
  const formatDateTime = (dateTimeString: string) => {
    if (!dateTimeString) return 'N/A';
    const date = new Date(dateTimeString);
    return date.toLocaleString();
  };

  // Function to calculate duration between start and end times
  const calculateDuration = (startTime: string, endTime: string) => {
    if (!startTime || !endTime) return 'N/A';
    
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationMs = end.getTime() - start.getTime();
    
    // Convert to minutes
    const minutes = Math.floor(durationMs / 60000);
    return `${minutes} mins`;
  };

  // Function to draw charts in PDF
  const drawChartInPDF = (
    pdf: jsPDF,
    data: any[],
    title: string,
    xPos: number,
    yPos: number,
    width: number,
    height: number,
    type = "bar",
    valueField = "value" // Default value field to use
  ) => {
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
  
    
    pdf.text(title, xPos, yPos);
  
    const chartWidth = width;
    const chartHeight = height;
    
    // Default to some sample data if data is empty
    const chartData = data && data.length > 0 ? data : [
      { label: "Sample", value: 50 },
      { label: "Data", value: 75 },
      { label: "Points", value: 25 }
    ];
    
    // Extract labels and values using appropriate fields
    const labels = Array.isArray(chartData)
      ? chartData.map(item => item.label || `Item ${chartData.indexOf(item)}`)
      : [];
    
    // Select the appropriate field for the value based on data type
    const values = Array.isArray(chartData)
      ? chartData.map(item => {
          if (title.includes("Time Spent")) {
            return item.time_spent || 0;
          } else if (title.includes("Obstacles")) {
            return item.obstacle_count || item.total_obstacles || 0;
          } else if (title.includes("Top Visited")) {
            return item.visit_count || 0;
          } else if (title.includes("Rerouting")) {
            return item.rerouting_count || 0;
          } else {
            return item[valueField] || 0;
          }
        })
      : [];
    
    const maxValue = Math.max(...values) * 1.1 || 100;
    const numPoints = labels.length;
  
    pdf.setFillColor(240, 240, 240);
    pdf.rect(xPos, yPos + 5, chartWidth, chartHeight, 'F');
  
    pdf.setDrawColor(200, 200, 200);
    pdf.setLineWidth(0.1);
    const gridLines = 5;
    for (let i = 0; i <= gridLines; i++) {
      const lineY = yPos + 5 + (chartHeight - (i * (chartHeight / gridLines)));
      pdf.line(xPos, lineY, xPos + chartWidth, lineY);
      const value = Math.round((i * maxValue) / gridLines);
      pdf.setFontSize(8);
      pdf.setTextColor(100, 100, 100);
      pdf.text(value.toString(), xPos - 7, lineY, { align: 'right' });
    }
  
    const segmentWidth = chartWidth / numPoints;
  
    if (type === "bar") {
      const barWidth = segmentWidth / 2;
      values.forEach((value: number, index: number) => {
        const barHeight = (value / maxValue) * chartHeight;
        const barX = xPos + index * segmentWidth + segmentWidth / 4;
        const barY = yPos + 5 + chartHeight - barHeight;
  
        pdf.setFillColor(75, 192, 192);
        pdf.rect(barX, barY, barWidth, barHeight, 'F');
      });
    } else if (type === "line") {
      pdf.setDrawColor(75, 192, 192);
      pdf.setLineWidth(1);
  
      values.forEach((value: number, index: number) => {
        const x = xPos + index * segmentWidth + segmentWidth / 2;
        const y = yPos + 5 + chartHeight - (value / maxValue) * chartHeight;
  
        if (index > 0) {
          const prevX = xPos + (index - 1) * segmentWidth + segmentWidth / 2;
          const prevY = yPos + 5 + chartHeight - (values[index - 1] / maxValue) * chartHeight;
          pdf.line(prevX, prevY, x, y);
        }
  
        // Draw point
        pdf.setFillColor(75, 192, 192);
        pdf.circle(x, y, 1.5, 'F');
      });
    }
  
    // X-axis labels
    pdf.setFontSize(8);
    pdf.setTextColor(100, 100, 100);
    labels.forEach((label: string, index: number) => {
      const labelX = xPos + index * segmentWidth + segmentWidth / 2;
      const shortenedLabel = label.length > 10 ? label.substring(0, 10) + "..." : label;
      pdf.text(shortenedLabel, labelX, yPos + 5 + chartHeight + 10, { align: 'center' });
    });
  
    // Legend
    const legendX = xPos + chartWidth - 40;
    const legendY = yPos + 10;
    pdf.setFillColor(75, 192, 192);
    pdf.rect(legendX, legendY, 5, 5, 'F');
    pdf.setTextColor(50, 50, 50);
    pdf.text(title, legendX + 8, legendY + 4);
  
    return yPos + 5 + chartHeight + 15;
  };

  // Generate PDF Report
  const generatePDF = async () => {
    if (loading) return;
    
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
      // Create new PDF document
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
      pdf.text("Navigation Analytics Report", pageWidth / 2, margin + 10, { align: 'center' });
      
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
      pdf.setTextColor(33, 33, 33);
      pdf.setFont('helvetica', 'bold');
      pdf.text("Executive Summary", margin, finalY);
      
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      pdf.text("This report provides an overview of navigation metrics, including time spent in zones, common obstacles, and rerouting requests.", 
               margin, finalY + 7);
      
      // Draw time spent chart - updated for new data structure
      let yPos = finalY + 20;
      yPos = drawChartInPDF(
        pdf,
        timeSpentData,
        "Time Spent by Zone (minutes)",
        margin,
        yPos,
        contentWidth,
        60,
        "line",
        "time_spent" // Use time_spent field for values
      );
      
      // Add spacing
      yPos += 15;
      
      // Check if we need to add a page for the top visited POIs chart
      if (yPos + 80 > pageHeight) {
        pdf.addPage();
        yPos = margin;
      }
      
      // Draw top visited POIs chart
      yPos = drawChartInPDF(
        pdf, 
        topVisitedData, 
        "Top Visited Points of Interest",
        margin,
        yPos,
        contentWidth,
        60,
        "bar",
        "visit_count" // Use visit_count field for values
      );
      
      // Add new page for obstacles chart
      pdf.addPage();
      yPos = margin;

      // Draw obstacles chart - updated for new data structure
      yPos = drawChartInPDF(
        pdf, 
        obstacleData, 
        "Zones with Highest Obstacles",
        margin,
        yPos,
        contentWidth,
        60,
        "bar",
        "obstacle_count" // Use obstacle_count field for values
      );
      
      // Add spacing
      yPos += 15;
      
      // Draw rerouting chart
      yPos = drawChartInPDF(
        pdf, 
        reroutingData, 
        "Environments with Most Rerouting Requests",
        margin,
        yPos,
        contentWidth,
        60,
        "bar",
        "rerouting_count" // Use rerouting_count field for values
      );
      
      // Check if we need to add a new page for navigation logs
      if (yPos + 80 > pageHeight) {
        pdf.addPage();
        yPos = margin;
      } else {
        yPos += 20;
      }
      
      // Add navigation logs table - updated for new log structure
      pdf.setFontSize(16);
      pdf.setTextColor(33, 33, 33);
      pdf.setFont('helvetica', 'bold');
      pdf.text("Navigation Logs", margin, yPos);
      
      if (logsData && logsData.length > 0) {
        
        // Prepare table data with the updated structure
        const tableData = logsData.slice(0, 10).map(log => [
          log.id?.toString() || 'N/A',
          `Env-${log.environment_id}` || 'N/A',
          formatDateTime(log.start_time) || 'N/A',
          formatDateTime(log.end_time) || 'N/A',
          calculateDuration(log.start_time, log.end_time),
          log.rerouting_count?.toString() || '0'
        ]);
        
        // Create table with updated headers
        autoTable(pdf, {
          startY: yPos + 10,
          head: [['ID', 'Environment', 'Start Time', 'End Time', 'Duration', 'Reroutings']],
          body: tableData,
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
            0: { cellWidth: 15 },
            1: { cellWidth: 25 },
            2: { cellWidth: 35 },
            3: { cellWidth: 35 },
            4: { cellWidth: 20, halign: 'center' },
            5: { cellWidth: 20, halign: 'center' }
          },
          margin: { top: margin }
        });
      } else {
        pdf.setFontSize(12);
        pdf.setTextColor(100, 100, 100);
        pdf.text("No navigation logs available", margin, yPos + 20);
      }
      
      // Add success rate metrics
      pdf.addPage();
      
      pdf.setFontSize(16);
      pdf.setTextColor(33, 33, 33);
      pdf.setFont('helvetica', 'bold');
      pdf.text("Navigation Success Metrics", margin, margin + 10);
      
      // Add success rate information
      const totalSuccessRate = succData.reduce((total, entry) => total + entry.success_rate, 0);
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text("Overall Navigation Success Rate:", margin, margin + 25);
      
      pdf.setFontSize(20);
      pdf.setTextColor(75, 192, 192);
      pdf.text(`${totalSuccessRate}%`, margin + 80, margin + 25);
      
      // Add obstacle summary table
      yPos = margin + 40;
      pdf.setFontSize(14);
      pdf.setTextColor(33, 33, 33);
      pdf.setFont('helvetica', 'bold');
      pdf.text("Obstacle Summary by Zone", margin, yPos);
      
      // Create obstacle summary table
      if (obstacleData && obstacleData.length > 0) {
        const obstacleTableData = obstacleData.map(obstacle => [
          getZoneName(obstacle.zone_id),
          obstacle.total_obstacles.toString()
        ]);
        
        autoTable(pdf, {
          startY: yPos + 10,
          head: [['Zone', 'Obstacle Count']],
          body: obstacleTableData,
          theme: 'grid',
          headStyles: {
            fillColor: [51, 122, 183],
            textColor: [255, 255, 255],
            fontStyle: 'bold'
          },
          alternateRowStyles: {
            fillColor: [245, 245, 245]
          },
          styles: {
            cellPadding: 5
          },
          columnStyles: {
            0: { cellWidth: 120 },
            1: { cellWidth: 40, halign: 'center' }
          }
        });
      }
      
      // Add insights and recommendations page
      yPos = 180;
      
      pdf.setFontSize(14);
      pdf.setTextColor(33, 33, 33);
      pdf.setFont('helvetica', 'bold');
      pdf.text("Key Insights & Recommendations", margin, yPos);
      
      // Add insights
      yPos += 15;
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text("Key Navigation Insights:", margin, yPos);
      
      const insights = [
        "- Identify zones with highest obstacle counts to prioritize improvement",
        "- Analyze time spent in each zone to optimize navigation paths",
        "- Review rerouting patterns to understand navigation challenges",
        "- Monitor success rates to track overall system performance"
      ];
      
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      insights.forEach((insight, index) => {
        pdf.text(insight, margin + 5, yPos + 10 + (index * 7));
      });
      
      // Add recommendations
      yPos += 45;
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text("Recommendations:", margin, yPos);
      
      const recommendations = [
        "- Focus improvement efforts on zones with highest obstacle counts",
        "- Consider redesigning areas with frequent rerouting requests",
        "- Optimize navigation algorithms for most frequently visited POIs",
        "- Address navigation bottlenecks to reduce time spent in certain zones",
        "- Regularly analyze navigation logs to identify recurring issues"
      ];
      
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      recommendations.forEach((rec, index) => {
        pdf.text(rec, margin + 5, yPos + 10 + (index * 7));
      });
      
      // Add footer with page numbers
      const totalPages = pdf.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(100, 100, 100);
        pdf.text(`Page ${i} of ${totalPages}`, pageWidth - 20, pageHeight - 10);
      }
      
      // Save the PDF
      pdf.save("Navigation_Analytics_Report.pdf");
      
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("There was an error generating the PDF. Please try again.");
    }
    
    setGeneratingPDF(false);
  };
  return (
    <div className="bg-[#262626] h-screen w-full relative overflow-y-scroll">
      <div className="absolute h-1/3 w-full rounded-b-lg overflow-hidden ">
        <Image src="/images/login_image.png" alt="Background" layout="fill" objectFit="cover" quality={100} priority className="rounded-b-lg" />
        <div className="absolute top-1/2 left-10 transform -translate-y-1/2 text-white">
          <h1 className="text-4xl font-bold drop-shadow-lg">Zones & navigation Informations</h1>
          <p className="text-lg drop-shadow-md"></p>
          
          {/* Add PDF Generation Button */}
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
                  Download Navigation Report
                </>
              )}
            </button>
          )}
        </div>
      </div>
          
      <div className="relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/5 bg-transparent p-6 w-full mt-72"></div>
          
      <div className="flex flex-col min-h-screen w-full bg-[#262626] p-1/10 space-y-6 overflow-auto text-white">
        {/* Section 3: Comprehensive Analytics */}
        <section className="w-full max-w-6xl mx-auto bg-[#262626] p-6 rounded-lg shadow-md">
          <h2 className="text-xl text-white font-semibold mb-4 border-b border-gray-700 pb-2">
          Detailed Analysis
          </h2>
    
          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            {/* Large Chart on Top - Full Width */}
            <div className="w-full bg-[#262626] p-6 rounded-xl shadow">
              <h3 className="text-lg text-white font-semibold mb-3"> </h3>
              <TimeSpentChart data={timeSpentData} />
            </div>
          </div>
    
          {/* Two Charts Side by Side (Each takes half of the screen) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-[#262626] p-6 rounded-xl shadow">
              <h3 className="text-lg text-white font-semibold mb-3">Main Points of Interest</h3>
              <TopVisitedPOIs />
            </div>
    
            <div className="bg-[#262626] p-6 rounded-xl shadow">
              <h3 className="text-lg text-white font-semibold mb-3">Areas with the Most Obstacles</h3>
              <ObstaclesBarChart />
            </div>
          </div>
    
          {/* Navigation Logs (2/4 width) & Rerouting Chart (1/3 width) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {/* Navigation Logs - Takes 2/4 of the screen */}
            <div className="md:col-span-2 bg-[#262626] p-6 rounded-xl shadow">
              <h3 className="text-lg text-white font-semibold mb-3">Navigation Logs</h3>
              {/* Note: You might need to update your NavigationLogsTable component as well */}
              <NavigationLogsTable data={logsData} />
            </div>
    
            {/* Rerouting Chart - Takes 1/3 of the screen */}
            <div className="bg-[#262626] p-6 rounded-xl shadow">
              <h3 className="text-lg text-white font-semibold mb-3">Successful Navigations</h3>
              <ReroutingBarChart />
              <div className="bg-[#1a1a1a] p-4 rounded-lg shadow-inner border border-gray-700 mt-22">
                <h4 className="text-md text-white font-semibold mb-2">Successful Navigations</h4>
                <p className="text-2xl font-bold text-white">
                  {
                    succData.reduce((total: number, entry: any) => total + entry.success_rate, 0).toFixed(2)
                  }
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
  
export default TestDeviceStatus;