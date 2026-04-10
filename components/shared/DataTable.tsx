"use client";

import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Pagination,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
  ColumnDef,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  columnFilters?: ColumnFiltersState;
  pageSize?: number;
  resetTrigger?: string;
  showPagination?: boolean;
}

export default function DataTable<TData>({
  data,
  columns,
  columnFilters = [],
  pageSize = 20,
  resetTrigger,
  showPagination = true,
}: DataTableProps<TData>) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      columnVisibility: {
        gen: false,
      },
    },
    initialState: {
      pagination: {
        pageSize: showPagination ? pageSize : 100000,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex: false,
  });

  useEffect(() => {
    if (resetTrigger === "") {
      table.setSorting([]);
    }
    table.setPageIndex(0);
  }, [resetTrigger, table]);

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <TableContainer
        component={Paper}
        sx={{
          ...tableContainerStyle,
          maxWidth: "100%",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <Table stickyHeader sx={{ minWidth: isMobile ? 500 : "100%" }}>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    sx={{
                      ...headStyle,
                      px: isMobile ? 1 : 2,
                      whiteSpace: "nowrap",
                    }}
                    align={"left"}
                  >
                    <TableSortLabel
                      active={!!header.column.getIsSorted()}
                      direction={header.column.getIsSorted() || "asc"}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:hover": { bgcolor: "#fbfbfb" }, cursor: "pointer" }}
                onClick={() =>
                  router.push(
                    `/moves/${row.original.name
                      .toLowerCase()
                      .replace(/[,.\s]+/g, "-")}`,
                  )
                }
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    sx={{
                      py: isMobile ? 1 : 1.5,
                      px: isMobile ? 1 : 2,
                      borderBottom: "1px solid #eee",
                      fontSize: isMobile ? "0.8125rem" : "0.875rem",
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {showPagination && table.getPageCount() > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", pb: 4 }}>
          <Pagination
            count={table.getPageCount()}
            page={table.getState().pagination.pageIndex + 1}
            onChange={(_, page) => {
              table.setPageIndex(page - 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            color="primary"
            shape="rounded"
            size={isMobile ? "small" : "medium"}
            siblingCount={isMobile ? 0 : 1}
          />
        </Box>
      )}
    </Stack>
  );
}

const tableContainerStyle = {
  borderRadius: "16px",
  boxShadow: "none",
  border: "1px solid #E5E7EB",
};

const headStyle = {
  bgcolor: "#F7FAFC",
  color: "#374151",
  fontWeight: 800,
  fontSize: "0.75rem",
  py: 2,
  borderBottom: "2px solid #F3F4F6",
};
