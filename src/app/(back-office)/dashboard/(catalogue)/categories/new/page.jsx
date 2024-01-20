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

export default function newCategory() {
  const [imageUrl, setImageUrl] = useState("")
  const markets = [
    {
      id:1,
      title:"Sproutes Farmers Market"
    },
    {
      id:2,
      title:"Cabbage Farmers Market"
    },
    {
      id:3,
      title:"Carrot Farmers Market"
    },
    {
      id:4,
      title:"Brocolli Farmers Market"
    }
  ]
  const [loading, setLoading] = useState(false)
  const {register, reset, handleSubmit, formState:{errors}} = useForm();

  async function onSubmit(data){
    {/* 
        -id => auto()
        -title
        -slug => auto()
        -description
        -image 
        */}
    
    const slug = generateSlug(data.title);
    data.slug = slug;
    data.imageUrl = imageUrl
    console.log(data);
    makePostRequest(setLoading, 'api/categories', data, 'Category', reset);
    setImageUrl('');
  }
  return (    
    <div>
      <FormHeader title="New category" />
      <form onSubmit={handleSubmit(onSubmit)} 
      className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput label="Category Title"
            name="title"
            register={register}
            errors={errors}
            className = "w-full"
            />
        <SelectInput
            label = "Select Market"
            name = "marketIds"
            register = {register}
            errors = {errors}
            className = "w-full"
            options={markets}
            multiple = {false}
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
      </div>
      
      <SubmitButton 
      isLoading={loading} 
      buttonTitle='Create Category' 
      loadingButtonTitle='Creating Category please wait...' 
      />
      </form>
      
      
    </div>
  );
}
