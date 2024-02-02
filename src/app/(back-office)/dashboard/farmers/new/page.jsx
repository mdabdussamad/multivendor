"use client";
import React, { useState } from "react";
import FormHeader from "@/components/backoffice/FormHeader";
import NewFarmerForm from '@/components/backoffice/NewFarmerForm'

export default function NewFarmer() {  
  
  return (
    <div>
      <FormHeader title="New Farmer" />
      <NewFarmerForm />
    </div>
  );
}
