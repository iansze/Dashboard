import LineChart from "../../components/lineChart/LineChart";

const LineChartPage = () => {
  return (
    <>
      <h1 className="chart__container-title">Transportation Preferences Across Countries</h1>
      <div className="chart__container">
        <LineChart isDashBoard={false} />
      </div>
    </>
  );
};

export default LineChartPage;
