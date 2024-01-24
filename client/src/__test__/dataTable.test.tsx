import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

import "@testing-library/jest-dom";
import { wrapper } from "./test-utils";
import mockAxios from "./mockAxios";
import { DataGrid } from "@mui/x-data-grid";
import Loading from "../components/loading/Loading";
import { ConvertedRowData } from "../types/type";

vi.mock("../utils/axios", () => mockAxios);

describe("DataTable Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("displays loading state", async () => {
    mockAxios.instance.get.mockImplementationOnce(() => new Promise(() => {}));
    await waitFor(() => {
      expect(render(<Loading />));
    });
  });

  it("displays error message on query failure", async () => {
    mockAxios.instance.get.mockRejectedValueOnce(new Error("Network Error"));

    await waitFor(() => {
      expect(render(<div>Error: Network Error</div>));
    });
  });

  it("displays data correctly when query is successful", async () => {
    const mockData = {
      data: {
        metaData: [{ name: "Column1" }, { name: "Column2" }],
        rows: [
          ["Row1Data1", "Row1Data2"],
          ["Row2Data1", "Row2Data2"],
        ],
      },
    };
    mockAxios.instance.get.mockResolvedValueOnce(mockData);

    const columns = mockData.data.metaData.map((column) => ({
      field: column.name,
      headerName: column.name,
      flex: 1,
    }));

    const rows = mockData.data.rows.map((row, rowIndex) => {
      return row.reduce(
        (obj, val, valIndex) => {
          const key = mockData.data.metaData[valIndex].name;
          obj[key] = val;
          return obj;
        },
        { id: rowIndex } as ConvertedRowData
      );
    });
    mockAxios.instance.get.mockResolvedValueOnce(mockData);
    render(<DataGrid columns={columns} rows={rows} />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText("Column1")).toBeInTheDocument();
      expect(screen.getByText("Row1Data1")).toBeInTheDocument();
    });
  });
});
