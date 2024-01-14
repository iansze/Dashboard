import BarChart from "../../components/BarChart/BarChart";

const BarChartPage = () => {
  return (
    <>
      <h1 className="chart__container-title">International Food Popularity Comparison</h1>
      <div className="chart__container">
        <BarChart isDashBoard={false} />
      </div>
    </>
  );
};

export default BarChartPage;
