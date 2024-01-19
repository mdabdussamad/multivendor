import React from "react";
import PageHeader from "@/components/backoffice/PageHeader";
import TableActions from "@/components/backoffice/TableActions";

export default function page() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        heading="Categories"
        href="/dashboard/categories/new"
        linkTitle="Add Category"
      />

      {/* Table Actions */}
      {/* Export || Search || Bulk Delete */}
      <TableActions  />

      <div className="py-8">
      <h2>Table</h2>
      </div>
    </div>
  );
}
