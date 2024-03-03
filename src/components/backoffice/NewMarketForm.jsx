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
import SelectInput from "@/components/Forminputs/SelectInput"
import ToggleInput from "@/components/Forminputs/ToggleInput";
import { useRouter } from "next/navigation";

export default function NewMarketForm({
  categories,
  updateData = {},
}) {
  const initialImageUrl = updateData?.logoUrl ?? "";
  const id = updateData?.id ?? "";
  const [imageUrl, setImageUrl] = useState(initialImageUrl); 
  const [loading, setLoading] = useState(false);
  const {
    register, 
    reset, 
    watch, 
    handleSubmit, 
    formState:{errors},
  } = useForm({
      defaultValues : {
        isActive : true,
        ...updateData,
      }
    });
    const router = useRouter()
    function redirect(){
      router.push('/dashboard/markets');
    }  
  const isActive = watch('isActive')

  async function onSubmit(data){      
    const slug = generateSlug(data.title);
    data.slug = slug;
    data.logoUrl = imageUrl
    console.log(data);
    if(id){
      data.id = id
      // Make Put Request (Update)
      makePutRequest(
        setLoading,
        `api/markets/${id}`,
        data,
        'Market', 
        redirect,
       );
       console.log("update Request:", data);
    }else{
      // Make Post Request
      makePostRequest(
        setLoading, 
        'api/markets', 
        data, 
        'Market', 
        reset, 
        redirect
        );
      setImageUrl('');
    }
  }
  return (    
    <form onSubmit={handleSubmit(onSubmit)} 
      className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

        <TextInput 
            label="Market Title"
            name="title"
            register={register}
            errors={errors} 
            className = "w-full"            
            />        
        <SelectInput
            label = "Select Categories"
            name = "categoryIds"
            register = {register}
            errors = {errors}
            className = "w-full" 
            options={categories}
            multiple = {true}
        />  
        <ImageInput 
              label="Market Logo"
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              endpoint="marketLogoUploader"
            />     
        <TextareaInput
            label="Market Description"
            name="description"
            register={register}
            errors={errors}
          />   
          {/* <ToggleInput
            label="Market Status"
            name="isActive"
            trueTitle="Active"
            falseTitle="Draft"
            register={register}
          /> */}
      </div>
      
      <SubmitButton 
        isLoading={loading} 
        buttonTitle={id ? 'Update Market' : 'Create Market'} 
        loadingButtonTitle={`${id ? 'Updating' : 'Creating'}
        Market please wait...`
      }
      />
      </form>
  );
}
