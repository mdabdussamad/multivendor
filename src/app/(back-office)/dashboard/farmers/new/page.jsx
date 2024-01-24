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
import { useRouter } from "next/navigation";

export default function newFarmer() {
  const [imageUrl, setImageUrl] = useState("");
  const categories = [
    {
      id: 1,
      title: "Category 1",
    },
    {
      id: 2,
      title: "Category 2",
    },
    {
      id: 3,
      title: "Category 3",
    },
  ];
  const farmers = [
    {
      id: 1,
      title: "Farmer 1",
    },
    {
      id: 2,
      title: "Farmer 2",
    },
    {
      id: 3,
      title: "Farmer 3",
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
  const router = useRouter()
    function redirect(){
      router.push('/dashboard/farmers');
    }    
  const isActive = watch("isActive");

  async function onSubmit(data) {
    const code = generateUserCode('LFF', data.name);
    data.code = code;   
    console.log(code);
    makePostRequest(setLoading, "api/farmers", data, "Farmer", reset, redirect);
    setImageUrl("");
  }
  return (
    <div>
      <FormHeader title="New Farmer" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          
          <TextInput
            label="Farmer's Full Name"
            name="name"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Farmer's Phone"
            name="phone"
            type="tel"
            register={register}
            errors={errors}
            className="w-full"
            isRequired={false}
          />
          <TextInput
            label="Farmer's Email Address"
            name="email"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Farmer's Physical Address"
            name="physicalAddress"
            register={register}
            errors={errors}
            className="w-full"
            isRequired={false}
          />
          <TextInput
            label="Farmer's Contact Persion"
            name="contactPerson"            
            register={register}
            errors={errors}
            className="w-full"
            isRequired={false}
          />
          <TextInput
            label="Farmer's Contact Phone"
            name="contactPersonPhone" 
            type="tel"           
            register={register}
            errors={errors}
            className="w-full"
          />
          <ImageInput 
              label="Former Profile Image"
              imageUrl={logoUrl}
              setLogoUrl={setLogoUrl}
              endpoint="farmerProfileUploader"
            /> 
          <TextareaInput
            label="Farmer's Payment Terms"
            name="terms"
            register={register}
            errors={errors}
            isRequired={false}            
          />
          <TextareaInput
            label="Nots"
            name="notes"
            register={register}
            errors={errors} 
            isRequired={false}           
          />                
          <ToggleInput
            label="Farmer Status"
            name="isActive"
            trueTitle="Active"
            falseTitle="Draft"
            register={register}
          />
        </div>
        <SubmitButton
          isLoading={loading}
          buttonTitle="Create Farmer"
          loadingButtonTitle="Creating Farmer please wait..."
        />
      </form>
    </div>
  );
}
