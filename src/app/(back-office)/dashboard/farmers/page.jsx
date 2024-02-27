import React from "react";
import PageHeader from "@/components/backoffice/PageHeader";
import DataTable from "@/components/data-table-components/DataTable";
import { getData } from "@/lib/getData";
import { columns } from './columns';

export default async function page() {
  const farmers = await getData('farmers');
  return (
    <div>
      {/* Header */}
      <PageHeader
        heading="Farmers"
        href="/dashboard/farmers/new"
        linkTitle="Add Farmer"
      />

      <div className="py-8">
        <DataTable data={farmers} columns={columns} filterKeys={["name"]} />
      </div>
    </div>
  );
}
