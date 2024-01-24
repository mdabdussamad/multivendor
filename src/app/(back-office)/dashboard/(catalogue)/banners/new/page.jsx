"use client";

import React, { useState } from "react";
import FormHeader from "@/components/backoffice/FormHeader";
import TextInput from "@/components/Forminputs/TextInput";
import { useForm } from "react-hook-form";
import SubmitButton from "@/components/Forminputs/SubmitButton";
import ImageInput from "@/components/Forminputs/ImageInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import ToggleInput from "@/components/Forminputs/ToggleInput";
import { useRouter } from "next/navigation";

export default function newBanner() {
  const [imageUrl, setImageUrl] = useState("");
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
    router.push('/dashboard/banners');
  }  
  const isActive = watch("isActive");
  async function onSubmit(data) {
    {
      /*
      -id => auto()
      -title
      -link
      -imageUrl
      -isActive
  */
    }
    data.imageUrl = imageUrl;
    console.log(data);
    makePostRequest(setLoading, "api/banners", data, "Banner", reset, redirect);
    setImageUrl("");
  }
  return (
    <div>
      <FormHeader title="New Banner" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Banner Title"
            name="title"
            register={register}
            errors={errors}
          />
          <TextInput
            label="Banner Link"
            name="link"
            register={register}
            errors={errors}
          />
          <ImageInput
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="bannerImageUploader"
          />
          <ToggleInput
            label="Publish your Banner"
            name="isActive"
            trueTitle="Active"
            falseTitle="Draft"
            register={register}
          />
        </div>
        <SubmitButton
          isLoading={loading}
          buttonTitle="Create Banner"
          loadingButtonTitle="Creating Banner please wait..."
        />
      </form>
    </div>
  );
}
