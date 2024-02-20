import Link from 'next/link'
import Hero from '@/components/frontend/Hero'
export default function Home() {
  return (
    <div className='min-h-screen'>
      <Hero />
      <h2 className='text-4xl'>Welcome to Multi Vender Ecommerce</h2>

      <Link className='my-4 underline' href="/register-farmer">Become a farmer Vendor/Supplier</Link>
    </div>
  )
}
