import { useQuery } from "@tanstack/react-query";
import { instance } from "../../utils/axios";
import { DataGrid } from "@mui/x-data-grid";
import { ColumnData, ConvertedRowData, DataTableProps, RowData } from "../../types/type";
import Loading from "../loading/Loading";

const DataTable = ({ query, tag }: DataTableProps) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [tag],
    queryFn: () => instance.get(query),
  });

  const columnNames = data?.data.metaData.map((column: ColumnData) => column.name);

  const col = columnNames?.map((column: string) => {
    return { field: column, headerName: column, flex: 1 };
  });

  const rows = data?.data.rows.map((row: RowData) => {
    return row.reduce((obj: ConvertedRowData, val, index) => {
      const key = columnNames[index];
      if (key === "ORDER_DATE") {
        val = val.split("T")[0];
      }
      if (key === "TOTAL_PRICE") {
        val = `$${parseFloat(val).toFixed(2)}`;
      }

      obj[key] = val;
      return obj;
    }, {} as ConvertedRowData);
  });

  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div style={{ width: "100%", padding: "2rem" }}>
      <DataGrid
        checkboxSelection
        rows={rows}
        getRowId={(row) => row.ORDER_ID || row.USER_ID || row.PRODUCT_ID}
        columns={col}
        sx={{
          backgroundColor: "white",
          color: "black",
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#eeeeee",
            color: "black",
          },
          "& .MuiDataGrid-row": {
            backgroundColor: "white",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #ddd",
          },
        }}
      />
    </div>
  );
};

export default DataTable;
