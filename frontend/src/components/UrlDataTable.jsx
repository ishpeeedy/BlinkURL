import React, { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import { deleteShortUrl } from '../api/shortUrl.api';
import { generateQRCode } from '../utils/qrGenerator.js';
import { Card } from '@/components/ui/card';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
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
import {
  ArrowUpDown,
  MoreHorizontal,
  ChevronDown,
  QrCode,
  ClipboardMinus,
  ClipboardList,
  Trash,
  ChartColumn,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { DropdownMenuRadioGroup } from '@radix-ui/react-dropdown-menu';
import { toast } from 'sonner';

const formatColumnLabel = (id) => {
  if (id === 'full_url') return 'Original URL';
  if (id === 'short_url') return 'Short URL';
  if (id === 'clicks') return 'Clicks';
  if (id === 'createdAt') return 'Created';
  return id.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
};

const UrlDataTable = ({ urls }) => {
  const queryClient = useQueryClient();
  const [sorting, setSorting] = useState([]);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [currentUrl, setCurrentUrl] = useState('');

  const handleDelete = async (shortUrl) => {
    if (
      window.confirm(
        `Are you sure you want to delete the short URL "${shortUrl}"? This will also delete all associated click data.`
      )
    ) {
      try {
        await deleteShortUrl(shortUrl);
        // Invalidate and refetch the URLs query
        queryClient.invalidateQueries(['userUrls']);
        toast.success('URL deleted successfully!');
      } catch (error) {
        toast.info(`Failed to delete URL: ${error.message}`);
      }
    }
  };

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300); // 250ms debounce value
    return () => {
      clearTimeout(handler);
    };
  }, [search]);
  const generateAndShowQR = async (shortUrl) => {
    try {
      const qrData = await generateQRCode(shortUrl);
      setQrCodeDataUrl(qrData);
      setCurrentUrl(`${import.meta.env.VITE_BACKEND_URL}/${shortUrl}`);
      setShowQRModal(true);
    } catch (error) {
      console.error('Failed to generate QR code:', error);
      alert('Failed to generate QR code');
    }
  };

  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.href = qrCodeDataUrl;
    link.download = `qr-${currentUrl.split('/').pop()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState({
    full_url: true,
    short_url: true,
    clicks: true,
    createdAt: true,
  });

  // Filtering logic
  const filteredUrls = React.useMemo(() => {
    if (!debouncedSearch) return urls;
    return urls.filter(
      (url) =>
        url.full_url.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        url.short_url.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [urls, debouncedSearch]);

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
      enableHiding: false,
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
              onClick={() => generateAndShowQR(row.original.short_url)}
            >
              <QrCode className="h-4 w-4" />
              Show QR Code
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                const backendUrl = import.meta.env.VITE_BACKEND_URL;
                const shortUrlWithHost = `${backendUrl}/${row.original.short_url}`;
                navigator.clipboard.writeText(shortUrlWithHost);
                toast.success('Short URL copied to clipboard!');
              }}
            >
              {' '}
              <ClipboardMinus className="h-4 w-4" />
              Copy Short URL
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(row.original.full_url);
                toast.success('Original URL copied!');
              }}
            >
              {' '}
              <ClipboardList className="h-4 w-4" />
              Copy Original URL
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                handleDelete(row.original.short_url);
              }}
            >
              {' '}
              <Trash className="h-4 w-4" />
              Delete
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link
                to={`/analytics/${row.original.short_url}`}
                className="cursor-pointer"
              >
                <ChartColumn className="h-4 w-4" />
                Details
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const table = useReactTable({
    data: filteredUrls,
    columns,
    state: { sorting, columnVisibility, pagination },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Card className="w-full max-w-4xl mx-auto p-4 mb-4">
      <div className="flex pt-1 mb-1 ml-2">
        {/* search bar */}
        <div className="flex w-1/2">
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search URLs..."
            className="h-9"
          />
        </div>
        <div className="ml-auto mr-2">
          <div className="flex gap-2 items-center">
            {/* Dropdown-based column selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="noShadow" size="sm">
                  Columns <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                {/* Optional label at top */}
                <DropdownMenuLabel>Visible columns</DropdownMenuLabel>

                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {formatColumnLabel(column.id)}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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
      <Pagination className="cursor-pointer">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              as="button"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            />
          </PaginationItem>
          {Array.from({ length: table.getPageCount() }).map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                as="button"
                isActive={i === table.getState().pagination.pageIndex}
                onClick={(e) => {
                  e.preventDefault();
                  table.setPageIndex(i);
                }}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              as="button"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* QR Code Modal */}
      {showQRModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowQRModal(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-2xl max-w-md border-2 border-black"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">QR Code</h3>
              <button
                onClick={() => setShowQRModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            {/* QR Code Image */}
            <div className="flex justify-center mb-4 p-4 bg-white border-2 border-black rounded">
              <img src={qrCodeDataUrl} alt="QR Code" className="w-64 h-64" />
            </div>

            {/* URL Display */}
            <p className="text-sm text-center text-gray-600 mb-4 break-all font-mono bg-gray-100 p-2 rounded border border-gray-300">
              {currentUrl}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                variant="default"
                onClick={downloadQRCode}
                className="flex-1"
              >
                Download PNG
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default UrlDataTable;
