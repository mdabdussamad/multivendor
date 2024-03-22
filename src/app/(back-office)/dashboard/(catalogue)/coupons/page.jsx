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
  const allCoupons = await getData("coupons");
  const farmerCoupons = allCoupons.filter((coupon)=>coupon.venderId===id);

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
          <DataTable data={allCoupons} columns={columns} />
          ):(
          <DataTable data={farmerCoupons} columns={columns} />
          )}
      </div>
    </div>
  );
}
