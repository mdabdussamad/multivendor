import FormHeader from '@/components/backoffice/FormHeader';
import NewCategoryForm from '@/components/backoffice/Forms/NewCategoryForm';

export default function newCategory() {
  
  return (    
    <div>
      <FormHeader title="New category" />
      <NewCategoryForm />         
    </div> 
  );
}
