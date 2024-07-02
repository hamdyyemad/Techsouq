import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useTranslation } from "react-i18next";
const WeeklySalesChart = ({ dailySales }) => {
  const { t } = useTranslation();
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current && dailySales) {
      const ctx = chartRef.current.getContext("2d");

      // Destroy existing chart instance, if any
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Calculate labels dynamically
      const today = new Date();
      const labels = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const month = date.toLocaleString("default", { month: "short" });
        const day = date.getDate();
        return `${month} ${day}`;
      }).reverse();

      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: t("chart.sales_this_week"),
              data: dailySales,
              fill: false,
              borderColor: "rgba(75, 192, 192, 1)",
              tension: 0.1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                // Include a dollar sign in the ticks
                callback: function (value) {
                  return "$" + value;
                },
              },
            },
          },
        },
      });
    }

    // Cleanup: destroy chart instance when component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartRef, dailySales, t]);

  return <canvas ref={chartRef} width="400" height="200"></canvas>;
};

export default WeeklySalesChart;
