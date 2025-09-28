import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

const UrlDataTable = ({ urls }) => {
  const [sorting, setSorting] = useState([]);
  const [search, setSearch] = useState('');

  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState({
    full_url: true,
    short_url: true,
    clicks: true,
    createdAt: false,
  });

  // Filtering logic
  const filteredUrls = React.useMemo(() => {
    if (!search) return urls;
    return urls.filter(
      (url) =>
        url.full_url.toLowerCase().includes(search.toLowerCase()) ||
        url.short_url.toLowerCase().includes(search.toLowerCase())
    );
  }, [urls, search]);

  const columns = [
    {
      accessorKey: 'full_url',
      header: ({ column }) => (
        <Button
          variant="noShadow"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Original URL
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => row.getValue('full_url'),
    },
    {
      accessorKey: 'short_url',
      header: ({ column }) => (
        <Button
          variant="noShadow"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Short URL
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => row.getValue('short_url'),
    },
    {
      accessorKey: 'clicks',
      header: ({ column }) => (
        <Button
          variant="noShadow"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Clicks
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => row.getValue('clicks'),
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <Button
          variant="noShadow"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Created
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) =>
        new Date(row.getValue('createdAt')).toLocaleDateString(),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="noShadow" className="size-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                const backendUrl = import.meta.env.VITE_BACKEND_URL;
                const shortUrlWithHost = `${backendUrl}/${row.original.short_url}`;
                navigator.clipboard.writeText(shortUrlWithHost);
              }}
            >
              Copy Short URL
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(row.original.full_url)
              }
            >
              Copy Original URL
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                // TODO: Implement delete logic here
                alert(`Delete URL: ${row.original.short_url}`);
              }}
            >
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem>Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const table = useReactTable({
    data: filteredUrls,
    columns,
    state: { sorting, columnVisibility },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 bg-white">
      {/* Search Bar & Column Visibility Filter */}
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div className="flex gap-2 items-center">
          <span className="font-semibold text-sm">Columns:</span>
          {Object.keys(columnVisibility).map((col) => (
            <label
              key={col}
              className="flex items-center gap-1 text-xs font-medium"
            >
              <input
                type="checkbox"
                checked={columnVisibility[col]}
                onChange={() =>
                  setColumnVisibility((prev) => ({
                    ...prev,
                    [col]: !prev[col],
                  }))
                }
                className="accent-purple-600"
              />
              {col === 'full_url'
                ? 'Original URL'
                : col === 'short_url'
                  ? 'Short URL'
                  : col === 'clicks'
                    ? 'Clicks'
                    : col === 'createdAt'
                      ? 'Created'
                      : col}
            </label>
          ))}
        </div>
        <div className="flex justify-end">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search URLs..."
            className="border border-border rounded-base px-3 py-2 text-sm w-64"
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="bg-white">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="bg-white">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                No URLs found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UrlDataTable;
