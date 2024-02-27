import React from "react";
import PageHeader from "@/components/backoffice/PageHeader";
import DataTable from "@/components/data-table-components/DataTable";
import { getData } from "@/lib/getData";
import { columns } from './columns';

export default async function page() {
  const trainings = await getData('trainings');
  return (
    <div>
      {/* Header */}
      <PageHeader
        heading="Hygienic Community Trainings"
        href="/dashboard/community/new"
        linkTitle="Add Training"
      />

      <div className="py-8">
        <DataTable data={trainings} columns={columns} />
      </div>
    </div>
  );
}
