import { ResponsiveLine } from "@nivo/line";
import data from "../../chartsData/LineChart.json";

type LineChartProps = {
  isDashBoard: boolean;
};
const LineChart = ({ isDashBoard }: LineChartProps) => {
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 20, bottom: 50, left: 60 }}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: "white",
            },
          },
          legend: {
            text: {
              fill: "white",
            },
          },
          ticks: {
            line: {
              stroke: "white",
              strokeWidth: 1,
            },
            text: {
              fill: "white",
            },
          },
        },
        legends: {
          text: {
            fill: "white",
          },
        },
        tooltip: {
          container: {
            color: "black",
          },
        },
        crosshair: {
          line: {
            stroke: "#ffffff",
          },
        },
      }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "transportation",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "count",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      lineWidth={3}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={
        isDashBoard
          ? [
              {
                anchor: "right",
                direction: "row",
                justify: false,
                translateX: 0,
                translateY: -220,
                itemWidth: 73,
                itemHeight: 64,
                itemsSpacing: 7,
                symbolSize: 12,
                symbolShape: "circle",
                itemDirection: "left-to-right",
                itemTextColor: "white",
              },
            ]
          : [
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
      }
    />
  );
};

export default LineChart;
