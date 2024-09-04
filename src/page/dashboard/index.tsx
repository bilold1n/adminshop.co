import React from "react";
import ReactApexChart from "react-apexcharts";
import useGetData from "../hooks/usegetdata";

const DynamicCharts: React.FC = () => {
  const { data } = useGetData("products", false);

  // Ma'lumotlar toifalarini chiqarib olish
  const categories = data.map((item: any) => item.category);
  const uniqueCategories = [...new Set(categories)];

  // Har bir toifa uchun toifalangan ma'lumotlarni olish
  const categoryData = uniqueCategories.map((category) => {
    const count = data.filter((item: any) => item.category === category).length;
    return { category, count };
  });

  // Rating bo'yicha ma'lumotlarni olish
  const ratings = data.map((item: any) => item.rating);
  const uniqueRatings = [...new Set(ratings)];

  const ratingData = uniqueRatings.map((rating) => {
    const count = data.filter((item: any) => item.rating === rating).length;
    return { rating, count };
  });

  // Radial diagramma uchun umumiy sozlamalar
  const generateRadialOptions: any = (category: string, value: number) => ({
    series: [value],
    chart: {
      height: 340,
      type: "radialBar",
      offsetY: -10,
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        dataLabels: {
          name: {
            fontSize: "16px",
            color: "#ffffff98",
            offsetY: 120,
          },
          value: {
            offsetY: 76,
            fontSize: "22px",
            color: "#ffffff",
            formatter: (val: number) => `${val}%`,
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        shadeIntensity: 0.15,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 65, 91],
      },
    },
    stroke: {
      dashArray: 4,
    },
    labels: [category],
  });

  const radialCharts = categoryData.map((catData, index) => (
    <div id={`radial-chart-${index}`} key={index}>
      <ReactApexChart
        options={generateRadialOptions(
          catData.category,
          (catData.count / data.length) * 100
        )}
        series={[(catData.count / data.length) * 100]}
        type="radialBar"
        height={340}
      />
    </div>
  ));

  return (
    <div className="overflow-y-scroll h-[84vh]">
      <div id="bar-chart">
        <ReactApexChart
          options={{
            chart: { height: 350, type: "bar" },
            series: [
              {
                name: "Inflation",
                data: [
                  2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 8.9,
                ],
              },
            ],
            plotOptions: {
              bar: { borderRadius: 10, dataLabels: { position: "top" } },
            },
            dataLabels: {
              enabled: true,
              formatter: (val: number) => `${val}%`,
              offsetY: -20,
              style: { fontSize: "12px", colors: ["#ffffff88"] },
            },
            xaxis: {
              categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
              position: "top",
              axisBorder: { show: false },
              axisTicks: { show: false },
              crosshairs: {
                fill: {
                  type: "gradient",
                  gradient: {
                    colorFrom: "#D8E3F0",
                    colorTo: "#BED1E6",
                    stops: [0, 100],
                    opacityFrom: 0.4,
                    opacityTo: 0.5,
                  },
                },
              },
              tooltip: { enabled: true },
            },
            yaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false, formatter: (val: number) => `${val}%` },
            },
            title: {
              text: "One year statistics of shop.co online magazine",
              floating: true,
              offsetY: 330,
              align: "center",
              style: { color: "#ffffff99" },
            },
          }}
          series={[
            {
              name: "Inflation",
              data: [
                2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 8.9,
              ],
            },
          ]}
          type="bar"
          height={350}
        />
      </div>
      <div className="flex justify-between flex-wrap">
        <div id="pie-chart">
          <ReactApexChart
            options={{
              chart: { width: 380, type: "pie" },
              labels: uniqueRatings,
            }}
            series={ratingData.map((rateData) => rateData.count)}
            type="pie"
            width={350}
          />
        </div>
        {radialCharts}
      </div>
    </div>
  );
};

export default DynamicCharts;
