import React from "react";
import PageHeader from "@/components/backoffice/PageHeader";
import DataTable from "@/components/data-table-components/DataTable";
import { getData } from "@/lib/getData";
import { columns } from "./columns";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export default async function Coupons() {
  const session = await getServerSession(authOptions);
  const id = session?.user?.id;
  const role = session?.user?.role;
  const sales = await getData("sales");

  // Fetch all the Sales
  // Filter by vendorId => to get sales for this vendor
  // Fetch Order by Id
  // Customer Name, Email, Phone, OrderNumber 
  const farmerSales = allSales.filter((sale)=>sale.venderId===id);

  return (
    <div>
      {/* Header */}
      <PageHeader
        heading="Coupons"
        href="/dashboard/coupons/new"
        linkTitle="Add Coupon"
      />

      <div className="py-8">
      {role==="ADMIN"?(
          <DataTable data={allSales} columns={columns} />
          ):(
          <DataTable data={farmerSales} columns={columns} />
          )}
      </div>
    </div>
  );
}
