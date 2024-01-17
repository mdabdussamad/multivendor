'use client'

import React from "react";
import FormHeader from "@/components/backoffice/FormHeader";
import TextInput from '@/components/Forminputs/TextInput';
import {useForm} from 'react-hook-form';
import SubmitButton from "@/components/Forminputs/SubmitButton";
import TextareaInput from "@/components/Forminputs/TextareaInput";
import { generateSlug } from "@/lib/generateSlug";

export default function newCategory() {
  const {
    register,
    handleSubmit,
    formState:{errors}
  } = useForm();

  async function onSubmit(data){
    const slug = generateSlug(data.title);
    data.slug = slug;
    console.log(data);
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
            />
        <TextareaInput
            label="Category Description"
            name="description"
            register={register}
            errors={errors}
          />    
      </div>
      
      <SubmitButton isLoading={false} buttonTitle='Create Category' loadingButtonTitle='Creating Category please wait...' 
      />
      </form>
      
      {/* 
        -id
        -title
        -slug
        -description
        -image 
        */}
    </div>
  );
}
