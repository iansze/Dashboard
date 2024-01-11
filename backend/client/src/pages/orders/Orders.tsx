import { requests } from "../../utils/axios";
import DataTable from "../../components/dataTable/DataTable";

const Orders = () => {
  return <DataTable query={requests.fetchOrders} tag={"fetchOrders"} />;
};

export default Orders;
