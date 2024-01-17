import { X } from "lucide-react";
import React from 'react';

export default function FormHeader({title}) {
  return (
    <div className="flex items-center justify-between py-6 px-12 bg-white text-slate-800 dark:text-slate-50 dark:bg-slate-700 rounded-lg shadow">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button className="">
          <X />
        </button>
      </div>
  )
}
