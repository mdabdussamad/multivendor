import Link from 'next/link';
import Hero from '@/components/frontend/Hero';
import MarketList from '@/components/frontend/MarketList';
import CategoryList from '@/components/frontend/CategoryList';
import CommunityTrainings from '@/components/frontend/CommunityTrainings' 
import { getData } from '@/lib/getData';

export default async function Home() {
  const categories = await getData('categories')
  return (
    <div className='min-h-screen'>
      <Hero />
      <MarketList />
      
      {
        categories.map((category,i)=>{
          return(
            <div key={i} className="py-8">
              <CategoryList category={category} />
            </div>
          );
        })
      }
      
      <CommunityTrainings />
      <h2 className='text-4xl'>Welcome to Multi Vender Ecommerce</h2>
      <Link 
      className='my-4 underline' 
      href="/register-farmer"
      >
        Become a farmer Vendor/Supplier
        </Link>
    </div>
  )
}
