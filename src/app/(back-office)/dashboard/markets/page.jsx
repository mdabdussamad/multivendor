import React from "react";
import PageHeader from "@/components/backoffice/PageHeader";
import DataTable from "@/components/data-table-components/DataTable";
import { getData } from "@/lib/getData";
import { columns } from './columns';

export default async function page() {
  const markets = await getData('markets');
  return (
    <div>
      {/* Header */}
      <PageHeader
        heading="Markets"
        href="/dashboard/markets/new"
        linkTitle="Add Market"
      />

      <div className="py-8">
        <DataTable data={markets} columns={columns} />
      </div>
    </div>
  );
}
