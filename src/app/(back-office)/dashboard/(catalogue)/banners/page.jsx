import React from "react";
import PageHeader from "@/components/backoffice/PageHeader";
import { columns } from "./columns";
import DataTable from "@/components/data-table-components/DataTable";
import { getData } from "@/lib/getData";

export default async function page() {
  const banners = await getData("banners");
  return (
    <div>
      {/* Header */}
      <PageHeader
        heading="Banners"
        href="/dashboard/banners/new"
        linkTitle="Add Banner"
      />

      <div className="py-8">
        <DataTable data={banners} columns={columns} />
      </div>
    </div>
  );
}
