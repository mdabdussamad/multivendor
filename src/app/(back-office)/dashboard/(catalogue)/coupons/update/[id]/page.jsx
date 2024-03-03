import FormHeader from '@/components/backoffice/FormHeader'
import CouponForm from '@/components/backoffice/Forms/CouponForm'
import { getData } from '@/lib/getData'

export default async function updateCoupons({params:{id} }) {
  const coupon = await getData(`coupons/${id}`); 
  return (
    <div>
        <FormHeader title='Update Coupon' />
        <CouponForm updateData={coupon} />
    </div>
  )
}
