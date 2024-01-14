import PieChart from "../../components/pieChart/pieChart";

const PieChartPage = () => {
  return (
    <>
      <h1 className="chart__container-title">Programming Language Popularity Metrics</h1>
      <div className="chart__container">
        <PieChart isDashBoard={false}></PieChart>
      </div>
    </>
  );
};

export default PieChartPage;
