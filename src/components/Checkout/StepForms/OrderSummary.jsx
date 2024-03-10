'use client'
 
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

export default function OrderSummary() {
  const checkoutFormData = useSelector(
    (store) => store.checkout.checkoutFormData
  );
  const cartItems = useSelector((store) => store.cart);
  const subTotal =
    cartItems
      .reduce((acc, currentItem) => {
        return acc + currentItem.salePrice * currentItem.qty;
      }, 0)
      .toFixed(2) ?? 0;

  async function submitData(){
    console.log(checkoutFormData)
  }
  return (
    <div className="my-6">
      <h2 className="text-xl font-semibold mb-4 dark:text-lime-400">
        Order Summary
      </h2>
      {cartItems.map((cartItem, i) => {
        return (
          <div key={i} className="flex items-center justify-between border-b border-slate-400 text-slate-400 pb-3 text-sm mb-4">
            <div className="flex items-center gap-3">
              <Image
                src={cartItem.imageUrl}
                width={249}
                height={249}
                alt={cartItem.title}
                className="rounded-xl w-14 h-14"
              />
              <div className="flex flex-col dark:text-slate-50 text-slate-800">
                <h2>{cartItem.title}</h2>
              </div>
            </div>
            <div className="rounded-xl border border-gray-400 flex gap-3 items-center dark:text-slate-50 text-slate-800">
              <p className="flex-grow py-2 px-4">{cartItem.qty}</p>
            </div>
            <div className="flex items-center gap-2 dark:text-slate-50 text-slate-800">
              <h4>NPR {cartItem.salePrice}</h4>
            </div>
          </div>
        );
      })}
      <div className="mt-4">
      <button 
        onClick={submitData}      
        className="inline-flex items-center px-6 py-3 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-lime-200 dark:focus:ring-lime-900 hover:bg-slate-800 dark:bg-lime-600 dark:hover:bg-lime-700"
      >
        <span>Proceed to Payment</span>
        <ChevronRight className="w-5 h-5 ml-2" />
      </button>
      </div>
    </div>
  );
}
