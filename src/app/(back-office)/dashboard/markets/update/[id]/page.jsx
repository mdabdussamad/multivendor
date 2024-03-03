import FormHeader from '@/components/backoffice/FormHeader';
import NewMarketForm from '@/components/backoffice/NewMarketForm';
import { getData } from '@/lib/getData';

export default async function updateMarket( { params: {id} }) {
  const market = await getData(`markets/${id}`);
  const categoriesData = await getData('categories');
  const categories = categoriesData.map((category)=>{
    return {      
      id: category.id,
      title: category.title,
    };
  });  
  return (
    <div>
      <FormHeader title="Update Market" />
      <NewMarketForm 
        categories={categories} 
        updateData={market} 
      />         
    </div> 
  )
}
