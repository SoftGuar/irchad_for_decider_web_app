"use client";
import React, { useEffect, useState } from "react";
import DailyChart from "../../components/cards/DailyChart";
import WeeklyChart from "../../components/cards/WeeklyChart";
import MonthlyChart from "../../components/cards/MonthlyChart";
import UserCommentsTable from "../../components/cards/UserComment";
import Image from "next/image";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  feedback,
  daily_active,
  weekly_active,
  monthly_active,
} from "../../../services/usersApi";
import autoTable from 'jspdf-autotable';

const UsersAuthChart: React.FC = () => {
  interface ChartData {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor?: string | string[];
      borderColor?: string | string[];
    }[];
  }
  
  // Create a context for chart data
  const ChartDataContext = React.createContext<{
    dailyData: ChartData;
    weeklyData: ChartData;
    monthlyData: ChartData;
  }>({
    dailyData: {
      labels: [],
      datasets: [{ label: '', data: [] }]
    },
    weeklyData: {
      labels: [],
      datasets: [{ label: '', data: [] }]
    },
    monthlyData: {
      labels: [],
      datasets: [{ label: '', data: [] }]
    }
  });
  
  const [commentsData, setCommentsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dailyData, setDailyData] = useState<any[]>([]);
  const [weeklyData, setWeeklyData] = useState<any[]>([]);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [generatingPDF, setGeneratingPDF] = useState(false);

  const formatWeek = (dateStr: string) => {
    const date = new Date(dateStr);
    const weekNumber = Math.ceil(date.getDate() / 7);
    const month = date.toLocaleString("default", { month: "short" });
    return `${month} W${weekNumber}`;
  };

  const formatMonth = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString("default", { month: "short" });
  };

  const [chartData, setChartData] = useState({
    dailyData: {
      labels: [],
      datasets: [{ label: '', data: [] }]
    },
    weeklyData: {
      labels: [],
      datasets: [{ label: '', data: [] }]
    },
    monthlyData: {
      labels: [],
      datasets: [{ label: '', data: [] }]
    }
  });
  
  useEffect(() => {
    async function fetchAllData() {
      setLoading(true);
      try {
        const [comments, daily, weekly, monthly] = await Promise.all([
          feedback(),
          daily_active(),
          weekly_active(),
          monthly_active(),
        ]);
  
        setCommentsData(comments);
  
        setChartData({
          dailyData: {
            labels: daily.map((item: any) => item.date),
            datasets: [{ label: 'Daily Active Users', data: daily.map((item: any) => item.dau_count) }]
          },
          weeklyData: {
            labels: weekly.map((item: any) => formatWeek(item.date)),
            datasets: [{ label: 'Weekly Active Users', data: weekly.map((item: any) => item.wau_count) }]
          },
          monthlyData: {
            labels: monthly.map((item: any) => formatMonth(item.date)),
            datasets: [{ label: 'Monthly Active Users', data: monthly.map((item: any) => item.mau_count) }]
          }
        });
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Erreur lors du chargement des données.");
      } finally {
        setLoading(false);
      }
    }
  
    fetchAllData();
  }, []);

  const drawChartInPDF = (
    pdf: jsPDF,
    data: ChartData,
    title: string,
    xPos: number,
    yPos: number,
    width: number,
    height: number,
    type: "bar" | "line" = "bar" // default to bar
  ) => {
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(50, 50, 50);
    pdf.text(title, xPos, yPos);
  
    const chartWidth = width;
    const chartHeight = height;
    const maxValue = Math.max(...data.datasets[0].data) * 1.1;
    const numPoints = data.labels.length;
  
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
    const dataset = data.datasets[0].data;
  
    if (type === "bar") {
      const barWidth = segmentWidth / 2;
      dataset.forEach((value, index) => {
        const barHeight = (value / maxValue) * chartHeight;
        const barX = xPos + index * segmentWidth + segmentWidth / 4;
        const barY = yPos + 5 + chartHeight - barHeight;
  
        pdf.setFillColor(75, 192, 192);
        pdf.rect(barX, barY, barWidth, barHeight, 'F');
      });
    } else if (type === "line") {
      pdf.setDrawColor(75, 192, 192);
      pdf.setLineWidth(1);
  
      dataset.forEach((value, index) => {
        const x = xPos + index * segmentWidth + segmentWidth / 2;
        const y = yPos + 5 + chartHeight - (value / maxValue) * chartHeight;
  
        if (index > 0) {
          const prevX = xPos + (index - 1) * segmentWidth + segmentWidth / 2;
          const prevY = yPos + 5 + chartHeight - (dataset[index - 1] / maxValue) * chartHeight;
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
    data.labels.forEach((label, index) => {
      const labelX = xPos + index * segmentWidth + segmentWidth / 2;
      pdf.text(label, labelX, yPos + 5 + chartHeight + 10, { align: 'center' });
    });
  
    // Legend
    const legendX = xPos + chartWidth - 40;
    const legendY = yPos + 10;
    pdf.setFillColor(75, 192, 192);
    pdf.rect(legendX, legendY, 5, 5, 'F');
    pdf.setTextColor(50, 50, 50);
    pdf.text(data.datasets[0].label, legendX + 8, legendY + 4);
  
    return yPos + 5 + chartHeight + 15;
  };
  

  const generatePDF = async () => {
    if (loading) return;
    
    setGeneratingPDF(true);
    
    try {
      // Create new PDF document
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      const contentWidth = pageWidth - (margin * 2);
      
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
      
      // Add executive summary
      pdf.setFontSize(14);
      pdf.setTextColor(33, 33, 33);
      pdf.setFont('helvetica', 'bold');
      pdf.text("Executive Summary", margin, margin + 35);
      
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      pdf.text("This report provides an overview of user activity metrics across daily, weekly, and monthly timeframes.", 
               margin, margin + 42);
      
      // Draw daily chart
      let yPos = margin + 55;
      yPos = drawChartInPDF(
        pdf,
        chartData.dailyData,
        "Daily Active Users",
        margin,
        yPos,
        contentWidth,
        60,
        "line" // Line chart!
      );
      
      
      // Add spacing
      yPos += 15;
      
      // Draw weekly chart
      yPos = drawChartInPDF(
        pdf, 
        chartData.weeklyData, 
        "Weekly Active Users",
        margin,
        yPos,
        contentWidth,
        60
      );
      
      // Add new page for Monthly Chart
pdf.addPage();
yPos = margin;

// Draw monthly chart on the new page
yPos = drawChartInPDF(
  pdf, 
  chartData.monthlyData, 
  "Monthly Active Users",
  margin,
  yPos,
  contentWidth,
  60
);

      
      // Check if we need to add a new page for comments
      if (yPos + 80 > pageHeight) {
        pdf.addPage();
        yPos = margin;
      } else {
        yPos += 20;
      }
      
      // Add user comments table
      pdf.setFontSize(16);
      pdf.setTextColor(33, 33, 33);
      pdf.setFont('helvetica', 'bold');
      pdf.text("User Feedback & Comments", margin, yPos);
      
      if (commentsData && commentsData.length > 0) {
        // Prepare table data
        const tableData = commentsData.map(comment => [
          comment.userName || 'Anonymous',
          comment.date || 'N/A',
          comment.rating ? `${comment.rating}/5` : 'N/A',
          comment.text || 'No comment provided'
        ]);
        
        // Create table
        autoTable(pdf, {
          startY: yPos + 10,
          head: [['User', 'Date', 'Rating', 'Comment']],
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
            0: { cellWidth: 30, fontStyle: 'bold' },
            1: { cellWidth: 30 },
            2: { cellWidth: 20, halign: 'center' },
            3: { cellWidth: 'auto' }
          },
          margin: { top: margin }
        });
      } else {
        pdf.setFontSize(12);
        pdf.setTextColor(100, 100, 100);
        pdf.text("No user comments available", margin, yPos + 20);
      }
      
      // Add insights and recommendations page
      pdf.addPage();
      
      pdf.setFontSize(16);
      pdf.setTextColor(33, 33, 33);
      pdf.setFont('helvetica', 'bold');
      pdf.text("Key Insights & Recommendations", margin, margin + 10);
      
      // Add insights
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text("Key User Activity Insights:", margin, margin + 25);
      
      const insights = [
        "- Track daily active user trends to identify usage patterns and peak activity times",
        "- Weekly activity patterns show user engagement consistency and retention",
        "- Monthly trends indicate long-term growth or decline in platform adoption",
        "- User feedback provides qualitative context to quantitative activity metrics"
      ];
      
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      insights.forEach((insight, index) => {
        pdf.text(insight, margin + 5, margin + 35 + (index * 7));
      });
      
      // Add recommendations
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text("Recommendations:", margin, margin + 70);
      
      const recommendations = [
        "- Target engagement initiatives during periods of lower activity",
        "- Address common concerns from user feedback to improve retention",
        "- Regularly analyze activity trends to measure impact of platform changes",
        "- Consider seasonal factors that may influence usage patterns",
        "- Use comparative analysis between daily, weekly and monthly charts to isolate anomalies"
      ];
      
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      recommendations.forEach((rec, index) => {
        pdf.text(rec, margin + 5, margin + 80 + (index * 7));
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
      pdf.save("User_Activity_Report.pdf");
      
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("There was an error generating the PDF. Please try again.");
    }
    
    setGeneratingPDF(false);
  };

  return (
    <ChartDataContext.Provider value={chartData}>
      <div className="bg-black h-screen w-full relative overflow-y-scroll">
        <div className="absolute h-1/3 w-full rounded-b-lg overflow-hidden">
          <Image src="/images/login_image.png" alt="Background" layout="fill" objectFit="cover" quality={100} priority className="rounded-b-lg" />
          <div className="absolute top-1/2 left-10 transform -translate-y-1/2 text-white">
            <h1 className="text-4xl font-bold drop-shadow-lg">Quotations</h1>
            <p className="text-lg drop-shadow-md"></p>
            
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
                    Download User Activity Report
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        <div className="relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/5 bg-transparent p-6 w-full mt-36"></div>
        <div className="bg-[#1E1E1E] w-full">
          <div className="bg-[#1E1E1E] p-6 rounded-lg text-white w-full flex gap-6">
            <div className="w-2/3 flex flex-col h-full">
              <div className="bg-[#1E1E1E] p-6 rounded-xl shadow">
                <h3 className="text-xl font-semibold mb-4">Utilisateurs actifs (Quotidien)</h3>
                <DailyChart />
                {loading ? (
                  <p className="mt-4">Chargement des commentaires...</p>
                ) : error ? (
                  <p className="mt-4 text-red-500">{error}</p>
                ) : (
                  <UserCommentsTable data={commentsData} />
                )}
              </div>
            </div>

            <div className="w-1/3 flex flex-col gap-6">
              <div className="bg-[#262626] p-4 rounded-xl shadow">
                <h3 className="text-lg font-semibold mb-3">Utilisateurs actifs (Hebdomadaire)</h3>
                <WeeklyChart />
              </div>

              <div className="bg-[#262626] p-4 rounded-xl shadow">
                <h3 className="text-lg font-semibold mb-3">Utilisateurs actifs (Mensuel)</h3>
                <MonthlyChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ChartDataContext.Provider>
  );
};

export default UsersAuthChart;