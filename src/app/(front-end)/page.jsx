import Link from 'next/link';
import Hero from '@/components/frontend/Hero';
import MarketList from '@/components/frontend/MarketList';
import CategoryList from '@/components/frontend/CategoryList';
import CommunityTrainings from '@/components/frontend/CommunityTrainings' 

export default function Home() {
  return (
    <div className='min-h-screen'>
      <Hero />
      <MarketList />
      <div className="py-8">
      <CategoryList />
      </div>
      <div className="py-8">
      <CategoryList />
      </div>
      <div className="py-8">
      <CategoryList />
      </div>   
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
