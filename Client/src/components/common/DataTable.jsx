import { TableSkeleton } from "@/components/loaders/Skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DataTable = ({
  columns = [],
  data = [],
  isLoading = false,
  emptyText = "Nothing here yet",
  rowKey = (row, index) => row?._id || row?.id || index,
}) => {
  if (isLoading) return <TableSkeleton columns={columns.length} />;

  if (!data.length) {
    return (
      <div className="border border-border bg-white px-6 py-12 text-center text-muted-fg">
        {emptyText}
      </div>
    );
  }

  return (
    <div className="border border-border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key} className={column.className}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={rowKey(row, index)}>
              {columns.map((column) => (
                <TableCell key={column.key} className={column.className}>
                  {column.render ? column.render(row) : row[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
