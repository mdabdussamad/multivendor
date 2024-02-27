"use client"

import { Checkbox } from "@/components/ui/checkbox"
import SortableColumn from "@/components/DataTableColumns/SortableColumn"
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
    accessorKey: "couponCode",
    header: "Coupon Code",
  },
  {
    accessorKey: "expiryDate",
    header: "Expiry Date ",
    cell: ({ row }) => (<DateColumn row={row} accessorKey='expiryDate' />)
  },
  {
    accessorKey: "isActive",
    header: "IsActive",
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => (<DateColumn row={row} accessorKey='createdAt' />)
  },
  {
    id: "actions",   
    cell: ({ row }) => {
      const coupon = row.original;
      return (
        <ActionColumn
          row ={row} 
          title='Coupon' 
          endpoint={`coupons/${coupon.id}`} 
        />
      );      
    },
  },
]
