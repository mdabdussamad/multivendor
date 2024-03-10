'use client'
import React from 'react'
import PersonalDetailsForm from '@/components/Checkout/StepForms/PersonalDetailsForm';
import ShippingDetailsForm from '@/components/Checkout/StepForms/ShippingDetailsForm';
import PaymentMethodForm from '@/components/Checkout/StepForms/PaymentMethodForm';
import OrderSummary from '@/components/Checkout/StepForms/OrderSummary';
import { useSelector } from 'react-redux';

export default function StepForm() {
    const currentStep = useSelector((store)=>store.checkout.currentStep);
    function renderFormByStep(step){
        if (step===1){
            return <PersonalDetailsForm />;
        }else if (step===2){
            return <ShippingDetailsForm />;
        }else if (step===3){
            return <PaymentMethodForm />;
        }else if (step===4){
            return <OrderSummary />;
        }
    }   
    return <div>{renderFormByStep(currentStep)}</div> 
}
