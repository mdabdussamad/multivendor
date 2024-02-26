"use client"

import { Checkbox } from "@/components/ui/checkbox"
import SortableColumn from "@/components/DataTableColumns/SortableColumn"
import ImageColumn from "@/components/DataTableColumns/ImageColumn"
import DateColumn from "@/components/DataTableColumns/DateColumn"
import ActionColumn from "@/components/DataTableColumns/ActionColumn"

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },  
  {
    accessorKey: "title",
    header: ({ column }) => (<SortableColumn column={column} title='Title' />)
  },
  {
    accessorKey: "imageUrl",
    header: "Banner Image",
    cell: ({ row }) => (<ImageColumn row={row} accessorKey='imageUrl' />)
  },  
  {
    accessorKey: "link",
    header: "Banner Link",
  },
  {
    accessorKey: "isActive",
    header: "IsActive",
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => (<DateColumn row={row} accessorKey='accessorKey' />)
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => (<ActionColumn row ={row} title='Banner' />)
  },
]
