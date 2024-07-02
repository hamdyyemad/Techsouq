import { useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import { useTranslation } from "react-i18next";

const ProductChart = ({ data }) => {
  const { t } = useTranslation();
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && chartRef.current.chartInstance) {
      chartRef.current.chartInstance.destroy();
    }
  }, [data]);

  const chartData = {
    labels: data.map((product) => product.name),
    datasets: [
      {
        label: t("chart.products_in_stock"),
        data: data.map((product) => product.countInStock),
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar ref={chartRef} data={chartData} options={chartOptions} />;
};

export default ProductChart;
