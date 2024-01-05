import { requests } from "../../utils/axios";

import DataTable from "../../components/dataTable/DataTable";

const Users = () => {
  return <DataTable query={requests.fetchUsers} tag={"fetchUsers"} />;
};

export default Users;
