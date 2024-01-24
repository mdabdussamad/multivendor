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
import ToggleInput from "@/components/Forminputs/ToggleInput";
import QuillEditor from "@/components/Forminputs/QuillEditor";
import { useRouter } from "next/navigation";

export default function newTraining() {
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

  // Quill Editor
  const [content, setContent] = useState("");
  //Custom Tool Bar

  // Quill Editor End
  const router = useRouter()
  function redirect(){
    router.push('/dashboard/cummunity');
  }  
  const isActive = watch("isActive");

  async function onSubmit(data) {
    {
      /* 
        -id => auto()
        -title
        -expertId
        -categoryId
        -slug => auto()
        -description
        -content => richText
        -image 
        */
    }

    const slug = generateSlug(data.title);
    data.slug = slug;
    data.imageUrl = imageUrl;
    data.content = content;
    console.log(data);
    makePostRequest(setLoading, 'api/trainings', data, 'Training', reset, redirect);
    setImageUrl('');
    setContent('');
  }
  return (
    <div>
      <FormHeader title="New Training" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Training Title"
            name="title"
            register={register}
            errors={errors}
            className="w-full"
          />
          <SelectInput
            label="Select Category"
            name="categoryId"
            register={register}
            errors={errors}
            className="w-full"
            options={categories}
          />
          <TextareaInput
            label="Training Description"
            name="description"
            register={register}
            errors={errors}
          />
          <ImageInput
            label="Training Thumbnail"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="trainingImageUploader"
          />
          {/* content */}
          <QuillEditor
            label="Training Content"
            value={content}
            onChange={setContent}
          />
          {/* content end */}

          <ToggleInput
            label="Publish your Training"
            name="isActive"
            trueTitle="Active"
            falseTitle="Draft"
            register={register}
          />
        </div>

        <SubmitButton
          isLoading={loading}
          buttonTitle="Create Training"
          loadingButtonTitle="Creating Training please wait..."
        />
      </form>
    </div>
  );
}
