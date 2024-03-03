import React from 'react'
import FormHeader from '@/components/backoffice/FormHeader';
import NewProductForm from "@/components/backoffice/NewProductForm";
import {getData} from "@/lib/getData"

export default async function newProduct() {
  // Categories and Farmers
  const categoriesData = await getData("categories");
  const usersData = await getData("users");
  const farmersData = usersData.filter((user)=>user.role==="FARMER")
  const farmers = farmersData.map((farmer)=>{
    return {
      id: farmer.id,
      titlle: farmer.name,
    };
  });
  const categories = categoriesData.map((category)=>{
    return{
      id: category.id,
      title: category.title
    };
  });  
  return (
    <div>
      <FormHeader title="New Product" />
      <NewProductForm 
        categories={categories} 
        farmers={farmers}
      />
    </div>
  )
}
