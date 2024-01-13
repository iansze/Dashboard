import { requests } from "../../utils/axios";
import DataTable from "../../components/dataTable/DataTable";

const Products = () => {
  return <DataTable query={requests.fetchProducts} tag={"fetchProducts"} />;
};

export default Products;
