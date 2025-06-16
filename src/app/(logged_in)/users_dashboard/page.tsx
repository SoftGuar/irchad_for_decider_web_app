"use client";
import React, { useEffect, useState } from "react";
import DailyChart from "../../components/cards/DailyChart";
import WeeklyChart from "../../components/cards/WeeklyChart";
import MonthlyChart from "../../components/cards/MonthlyChart";
import UserCommentsTable from "../../components/cards/UserComment";
import Image from "next/image";
import html2canvas from "html2canvas";
import { useUser } from "../../../utils/userContext";
import { User } from "../../../type/user";
import jsPDF from "jspdf";
import {
  daily_active,
  weekly_active,
  monthly_active,
} from "../../../services/usersApi";
import autoTable from 'jspdf-autotable';
import { ClipLoader } from "react-spinners"; // <-- Import the loader

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
  const { user, fetchUser } = useUser();
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
        const [daily, weekly, monthly] = await Promise.all([
          daily_active(),
          weekly_active(),
          monthly_active(),
        ]);

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
    type: "bar" | "line" = "bar"
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

      const finalY = (pdf as any).lastAutoTable.finalY + 10;

      // Add executive summary
      pdf.setFontSize(14);
      pdf.setTextColor(33, 33, 33);
      pdf.setFont('helvetica', 'bold');
      pdf.text("Executive Summary", margin, finalY);

      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      pdf.text("This report provides an overview of user activity metrics across daily, weekly, and monthly timeframes.",
        margin, finalY + 7);

      let yPos = finalY + 20;
      yPos = drawChartInPDF(
        pdf,
        chartData.dailyData,
        "Daily Active Users",
        margin,
        yPos,
        contentWidth,
        60,
        "line"
      );

      yPos += 15;

      yPos = drawChartInPDF(
        pdf,
        chartData.weeklyData,
        "Weekly Active Users",
        margin,
        yPos,
        contentWidth,
        60
      );

      pdf.addPage();
      yPos = margin;

      yPos = drawChartInPDF(
        pdf,
        chartData.monthlyData,
        "Monthly Active Users",
        margin,
        yPos,
        contentWidth,
        60
      );

      if (yPos + 80 > pageHeight) {
        pdf.addPage();
        yPos = margin;
      } else {
        yPos += 20;
      }

      pdf.addPage();

      pdf.setFontSize(16);
      pdf.setTextColor(33, 33, 33);
      pdf.setFont('helvetica', 'bold');
      pdf.text("Key Insights & Recommendations", margin, margin + 10);

      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text("Key User Activity Insights:", margin, margin + 25);

      const insights = [
        "- Track daily active user trends to identify usage patterns and peak activity times",
        "- Weekly activity patterns show user engagement consistency and retention",
        "- Monthly trends indicate long-term growth or decline in platform adoption",
      ];

      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      insights.forEach((insight, index) => {
        pdf.text(insight, margin + 5, margin + 35 + (index * 7));
      });

      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text("Recommendations:", margin, margin + 70);

      const recommendations = [
        "- Target engagement initiatives during periods of lower activity",
        "- Regularly analyze activity trends to measure impact of platform changes",
        "- Consider seasonal factors that may influence usage patterns",
        "- Use comparative analysis between daily, weekly and monthly charts to isolate anomalies"
      ];

      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      recommendations.forEach((rec, index) => {
        pdf.text(rec, margin + 5, margin + 80 + (index * 7));
      });

      const totalPages = pdf.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(100, 100, 100);
        pdf.text(`Page ${i} of ${totalPages}`, pageWidth - 20, pageHeight - 10);
      }

      pdf.save("User_Activity_Report.pdf");

    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("There was an error generating the PDF. Please try again.");
    }

    setGeneratingPDF(false);
  };

  // Loader style
  const loaderStyle = {
    display: "block",
    margin: "80px auto",
    borderColor: "orange"
  };

  // If loading or generating PDF, show loader
  if (loading || generatingPDF) {
    return (
      <div className="bg-black min-h-screen w-full flex flex-col items-center justify-center">
        <ClipLoader
          color="orange"
          loading={true}
          cssOverride={loaderStyle}
          size={80}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <div className="text-white text-center mt-6 text-lg animate-pulse">
          {generatingPDF ? "Génération du rapport PDF..." : "Chargement des statistiques utilisateurs..."}
        </div>
      </div>
    );
  }

  return (
    <ChartDataContext.Provider value={chartData}>
      <div className="bg-black h-screen w-full relative overflow-y-scroll">
        <div className="absolute h-1/3 w-full rounded-b-lg overflow-hidden">
          <Image src="/images/login_image.png" alt="Background" layout="fill" objectFit="cover" quality={100} priority className="rounded-b-lg" />
          <div className="absolute top-1/2 left-10 transform -translate-y-1/2 text-white">
            <h1 className="text-4xl font-bold drop-shadow-lg">Users Informations</h1>
            <p className="text-lg drop-shadow-md"></p>
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
                  Génération du PDF...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                 Download report
                </>
              )}
            </button>
          </div>
        </div>

        <div className="relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/5 bg-transparent p-6 w-full mt-36"></div>
        <div className="bg-[#1E1E1E] w-full">
          <div className="bg-[#1E1E1E] p-6 rounded-lg text-white w-full flex gap-6">
            <div className="w-full flex flex-col h-full">
              <div className="bg-[#1E1E1E] p-6 rounded-xl shadow">
                <h3 className="text-xl font-semibold mb-4 mt-8">Active Users (Daily)</h3>
                <DailyChart />
                <div className="flex flex-row gap-10 w-full ">
                  <div className="bg-[#262626] p-4 rounded-xl shadow mt-16 w-full">
                    <h3 className="text-lg font-semibold mb-3">Active Users (Weekly)</h3>
                    <WeeklyChart />
                  </div>
                  <div className="bg-[#262626] p-4 rounded-xl shadow mt-16 w-full">
                    <h3 className="text-lg font-semibold mb-3">Active Users (Monthly)</h3>
                    <MonthlyChart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ChartDataContext.Provider>
  );
};

export default UsersAuthChart;
