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

export default function newMarket() {
  const [logoUrl, setLogoUrl] = useState(""); 
  const [loading, setLoading] = useState(false);
  const categories =[
    {
      id: 1,
      title: "Category 1"
    },
    {
      id: 2,
      title: "Category 2"
    },
    {
      id: 3,
      title: "Category 3"
    }
  ]
  const {
    register, 
    reset, 
    watch,
    handleSubmit, 
    formState:{errors}} = useForm({
      defaultValues : {
        isActive : true
      }
    });
    const router = useRouter()
    function redirect(){
      router.push('/dashboard/markets');
    }  
  const isActive = watch('isActive')

  async function onSubmit(data){
    {/* 
        -id => auto()
        -title
        -slug => auto()
        -logo
        -description 
        */}
    
    const slug = generateSlug(data.title);
    data.slug = slug;
    data.logoUrl = logoUrl
    console.log(data);
    makePostRequest(setLoading, 'api/markets', data, 'Market', reset, redirect);
    setLogoUrl('');
  }
  return (    
    <div>
      <FormHeader title="New Market" />
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
              imageUrl={logoUrl}
              setLogoUrl={setLogoUrl}
              endpoint="marketLogoUploader"
            />     
        <TextareaInput
            label="Market Description"
            name="description"
            register={register}
            errors={errors}
          />   
          <ToggleInput
            label="Market Status"
            name="isActive"
            trueTitle="Active"
            falseTitle="Draft"
            register={register}
          />
      </div>
      
      <SubmitButton 
      isLoading={loading} 
      buttonTitle='Create Market' 
      loadingButtonTitle='Creating Market please wait...' 
      />
      </form>
      
      
    </div>
  );
}