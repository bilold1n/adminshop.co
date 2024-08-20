import React from "react";
import ReactApexChart from "react-apexcharts";

const PieChart: React.FC = () => {
  const pieOptions: any = {
    chart: {
      width: 380,
      type: "pie",
    },
    labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const pieSeries = [44, 55, 13, 43, 22];

  const barOptions: any = {
    series: [
      {
        name: "Inflation",
        data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 8.9],
      },
    ],
    chart: {
      height: 350,
      type: "bar",
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val + "%";
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#ffffff88"],
      },
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
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
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
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val: number) {
          return val + "%";
        },
      },
    },
    title: {
      text: "One year statistics of shop.co online magazine",
      floating: true,
      offsetY: 330,
      align: "center",
      style: {
        color: "#ffffff99",
      },
    },
  };

  const radialOptions: any = {
    series: [17],
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
            formatter: function (val: number) {
              return val + "%";
            },
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
    labels: ["Median Ratioy"],
  };

  return (
    <div className="overflow-y-scroll h-[84vh]">
      <div id="bar-chart">
        <ReactApexChart
          options={barOptions}
          series={barOptions.series}
          type="bar"
          height={barOptions.chart.height}
        />
      </div>
      <div className="flex justify-between">
        <div id="pie-chart">
          <ReactApexChart
            options={pieOptions}
            series={pieSeries}
            type="pie"
            width={pieOptions.chart.width}
          />
        </div>
        <div id="radial-chart-1">
          <ReactApexChart
            options={radialOptions}
            series={radialOptions.series}
            type="radialBar"
            height={radialOptions.chart.height}
          />
        </div>
        <div id="radial-chart-2">
          <ReactApexChart
            options={radialOptions}
            series={radialOptions.series}
            type="radialBar"
            height={radialOptions.chart.height}
          />
        </div>
      </div>
    </div>
  );
};

export default PieChart;
