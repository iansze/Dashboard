import { useQuery } from "@tanstack/react-query";
import { instance, requests } from "../../utils/axios";
import { DataGrid } from "@mui/x-data-grid";

type ColumnData = {
  name: string;
};

type RowData = string[];

type ConvertedRowData = {
  [key: string]: string | number;
};

const Users = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["fetchUsers"],
    queryFn: () => instance.get(requests.fetchUsers),
  });

  const columnNames = data?.data.metaData.map((column: ColumnData) => column.name);

  const col = columnNames?.map((column: string) => {
    if (column === "USER_ID" || column === "AGE")
      return { field: column, headerName: column, maxWidth: 70, flex: 1 };
    else {
      return { field: column, headerName: column, minWidth: 100, flex: 1 };
    }
  });

  const rows = data?.data.rows.map((row: RowData) => {
    return row.reduce((obj: ConvertedRowData, val, index) => {
      const key = columnNames[index];
      obj[key] = val;
      return obj;
    }, {} as ConvertedRowData);
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div style={{ width: "100%", padding: "2rem" }}>
      <DataGrid checkboxSelection rows={rows} getRowId={(row) => row.USER_ID} columns={col} />
    </div>
  );
};

export default Users;
