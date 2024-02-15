import React from 'react'
import NewMarketForm from '@/components/backoffice/NewMarketForm'
import {getData} from "@/lib/getData"

export default async function NewMarket() {
   
  const categoriesData = await getData("categories");  
  const categories = categoriesData.map((category)=>{
    return{
      id: category.id,
      title: category.title,
    };
  });  
  return (
    <NewMarketForm categories={categories} />
  )
}
