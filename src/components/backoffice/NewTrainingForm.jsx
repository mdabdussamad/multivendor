"use client";

import React, { useState } from "react"; 
import TextInput from "@/components/Forminputs/TextInput";
import { useForm } from "react-hook-form";
import SubmitButton from "@/components/Forminputs/SubmitButton";
import TextareaInput from "@/components/Forminputs/TextareaInput";
import { generateSlug } from "@/lib/generateSlug";
import ImageInput from "@/components/Forminputs/ImageInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import SelectInput from "@/components/Forminputs/SelectInput";
import ToggleInput from "@/components/Forminputs/ToggleInput";
import dynamic from "next/dynamic";
const QuillEditor = dynamic(
  () => import("@/components/Forminputs/QuillEditor"),
  {
    ssr: false,
  }
);
import { useRouter } from "next/navigation";

export default function NewTrainingForm({categories, updateData={} }) {
  const initialContent = updateData?.content ?? "";
  const initialImageUrl = updateData?.imageUrl ?? "";
  const id = updateData?.id ?? "";
  const [imageUrl, setImageUrl] = useState(initialImageUrl);  
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
      ...updateData,
    },
  });

  // Quill Editor
  const [content, setContent] = useState(initialContent);  
  // Quill Editor End

  const router = useRouter();
  function redirect(){
    router.push('/dashboard/community');
  }  
  const isActive = watch("isActive");
  async function onSubmit(data) { 
    const slug = generateSlug(data.title);
    data.slug = slug; 
    data.imageUrl = imageUrl;
    data.content = content;
    console.log(data);
    if(id){
      data.id=id
      // Make Put Request (Update)
      makePutRequest(
        setLoading,
        `api/trainings/${id}`,
        data,
        'Training', 
        redirect,
       );
       console.log("update Request:", data);
    }else{
      // Make Post Request
      makePostRequest(
        setLoading, 
        'api/trainings', 
        data, 
        'Training', 
        reset, 
        redirect
       );
      setImageUrl('');
      setContent('');
    }
  }
  return (
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
          buttonTitle={id ? 'Update Training' : 'Create Training'} 
          loadingButtonTitle={`${id ? 'Updating' : 'Creating'}
          Training please wait...`
        }
        />
          </form>
      );
    }
    