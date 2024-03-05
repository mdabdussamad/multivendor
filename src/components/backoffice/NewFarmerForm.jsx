'use client'

import React, { useState } from "react";
import TextInput from '@/components/Forminputs/TextInput';
import {useForm} from 'react-hook-form';
import SubmitButton from "@/components/Forminputs/SubmitButton";
import TextareaInput from "@/components/Forminputs/TextareaInput";
import ImageInput from "@/components/Forminputs/ImageInput"
import {makePostRequest, makePutRequest} from '@/lib/apiRequest'
import ToggleInput from "@/components/Forminputs/ToggleInput";
import { useRouter } from "next/navigation";
import ArrayItemsInput from "@/components/Forminputs/ArrayItemsInput"
import generateUserCode from "@/lib/generateUserCode"

export default function NewFarmerForm({user}) {
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState(""); 
  const [products, setProducts] = useState([]);

  const {
    register, 
    reset, 
    watch,
    handleSubmit, 
    formState:{errors},
} = useForm({
      defaultValues : {
        isActive : true,
        ...user,
      },
    });
    const router = useRouter()
    function redirect(){
      router.push('/login');
    }  
  const isActive = watch('isActive');
  async function onSubmit(data){   
    
    const code = generateUserCode("LFF", data.name);
    data.code = code; 
    data.userId = user.id;
    data.products = products; 
    data.profileImageUrl = imageUrl;  
    console.log(data);
    makePostRequest(
      setLoading, 
      'api/farmers', 
      data, 
      'Farmer', 
      reset, 
      redirect
      );    
  }
  return (    
    <form onSubmit={handleSubmit(onSubmit)} 
      className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">
      
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
         
        <TextInput 
            label="Farmer's Full Name"
            name="name"
            register={register} 
            errors={errors} 
            className = "w-full"            
            />        
        <TextInput 
            label="Farmer's Phone"
            name="phone"
            type="tel"
            register={register}
            errors={errors} 
            className = "w-full"            
            />        
        <TextInput
            label = "Farmer's Email Address"
            name = "email"
            register = {register}
            errors = {errors}
            className = "w-full"             
        />                  
        <TextInput
            label = "Farmer's Physical Address"
            name = "physicalAddress"
            register = {register}
            errors = {errors}
            className = "w-full"             
        />        
        <TextInput
            label = "Farmer's Contact Person"
            name = "contactPerson"
            register = {register}
            errors = {errors}
            className = "w-full"             
        />        
        <TextInput
            label = "Farmer's Contact Person Phone"
            name = "ContactPersonPhone"
            type = "tel"
            register = {register}
            errors = {errors}
            className = "w-full"             
        />                           
        <TextareaInput
            label="Farmer's Payment Terms"
            name="terms"
            register={register}
            errors={errors}
          />  
          <TextareaInput
            label = "Notes"
            name = "notes"
            register = {register}
            errors = {errors}
            isRequired = {false}                        
        />          
      </div>      
      <SubmitButton 
      isLoading={loading} 
      buttonTitle='Create Farmer' 
      loadingButtonTitle='Creating Farmer please wait...' 
      />
      </form>
  );
}
