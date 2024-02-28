'use client'

import React, { useState } from "react";
import FormHeader from "@/components/backoffice/FormHeader";
import TextInput from '@/components/Forminputs/TextInput';
import {useForm} from 'react-hook-form';
import SubmitButton from "@/components/Forminputs/SubmitButton";
import TextareaInput from "@/components/Forminputs/TextareaInput";
import { generateSlug } from "@/lib/generateSlug";
import ImageInput from "@/components/Forminputs/ImageInput"
import {makePostRequest, makePutRequest} from '@/lib/apiRequest'
import ToggleInput from "@/components/Forminputs/ToggleInput";
import { useRouter } from "next/navigation";

export default function NewCategoryForm({updateData={} }) {
  const initialImageUrl = updateData?.imageUrl ?? ""; 
  const id = updateData?.id ??"";
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  // const markets = [];
  const [loading, setLoading] = useState(false);
  const {
    register, 
    reset, 
    watch,
    handleSubmit, 
    formState:{errors}
} = useForm({
      defaultValues : {
        isActive : true,
        ...updateData,
      },
    });
    const router = useRouter()
    function redirect(){
      router.push('/dashboard/categories');
    }  
  const isActive = watch('isActive')

  async function onSubmit(data){    
    const slug = generateSlug(data.title);
    data.slug = slug;
    data.imageUrl = imageUrl
    console.log(data);
    if(id){
        data.id = id
        // Make Put Request (Update)
        makePutRequest(
          setLoading,
          `api/categories/${id}`,
          data,
          'Category', 
          redirect,
         );
        console.log('Update Request:', data);
    }else{
        // Make Post Request (Create)
        makePostRequest(
            setLoading, 
            "api/categories", 
            data, 
            'Category', 
            reset, 
            redirect
          ); 
          setImageUrl('');
    }
  }
  return (    
    <form 
    onSubmit={handleSubmit(onSubmit)} 
    className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
      <TextInput 
          label="Category Title"
          name="title"
          register={register}
          errors={errors} 
          className="w-full"         
          />            
      <TextareaInput
          label="Category Description"
          name="description"
          register={register}
          errors={errors}
        />   
        <ImageInput 
          label="Category Image"
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          endpoint="categoryImageUploader"
        /> 
        <ToggleInput
          label="Publish your Category"
          name="isActive"
          trueTitle="Active"
          falseTitle="Draft"
          register={register}
        />
    </div>
    
    <SubmitButton 
      isLoading={loading} 
      buttonTitle={id ? 'Update Category' : 'Create Category'} 
      loadingButtonTitle={`${id ? 'Updating' : 'Creating'}
      Category please wait...`
    }
    />
    </form>
  );
}
