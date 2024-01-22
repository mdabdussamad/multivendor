"use client";

import React, { useState } from "react";
import FormHeader from "@/components/backoffice/FormHeader";
import TextInput from "@/components/Forminputs/TextInput";
import { useForm } from "react-hook-form";
import SubmitButton from "@/components/Forminputs/SubmitButton";
import TextareaInput from "@/components/Forminputs/TextareaInput";
import { generateSlug } from "@/lib/generateSlug";
import ImageInput from "@/components/Forminputs/ImageInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import SelectInput from "@/components/Forminputs/SelectInput";
import ArrayItemsInput from "@/components/Forminputs/ArrayItemsInput";
import ToggleInput from "@/components/Forminputs/ToggleInput";

export default function newFarmer() {
  const [imageUrl, setImageUrl] = useState("");
  const roles = [
    {
      id: 1,
      title: "Role 1",
    },
    {
      id: 2,
      title: "Role 2",
    },
    {
      id: 3,
      title: "Role 3",
    },
  ];
  const staffs = [
    {
      id: 1,
      title: "Staff 1",
    },
    {
      id: 2,
      title: "Staff 2",
    },
    {
      id: 3,
      title: "Staff 3",
    },
  ];
  // TAGS
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isActive: true,
    },
  }); 
  const isActive = watch("isActive");
  async function onSubmit(data) {
    /*
    -name
    -password
    -email
    -phone
    -physicalAddress
    -NIN
    -DOB
    -notes
    -code
    -isActive
    */  
    const code = generateUserCode("HSM", data.name);
    data.code = code;   
    console.log(code);
    makePostRequest(setLoading, "api/staffs", data, "Staff", reset);   
  }
  return (
    <div>
      <FormHeader title="New Staff" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          
          <TextInput
            label="Staff's Full Name"
            name="name"
            register={register}
            errors={errors}            
          />
          <TextInput
            label="NIN (Id Number)"
            name="nin"           
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Date of Birth"
            name="dob"   
            type="date"        
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Password"
            name="password"
            type="password"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Staff's Email Address"
            name="email"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Staff's Phone"
            name="phone"
            type="tel"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Staff's physical Address"
            name="physicalAddress"            
            register={register}
            errors={errors}
            className="w-full"
          />         
          <TextareaInput
            label="Nots"
            name="notes"
            register={register}
            errors={errors} 
            isRequired={false}           
          />                
          <ToggleInput
            label="Staff Status"
            name="isActive"
            trueTitle="Active"
            falseTitle="Draft"
            register={register}
          />
        </div>
        <SubmitButton
          isLoading={loading}
          buttonTitle="Create Staff"
          loadingButtonTitle="Creating Staff please wait..."
        />
      </form>
    </div>
  );
}
