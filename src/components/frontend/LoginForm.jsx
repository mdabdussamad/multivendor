"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast"; 
import SubmitButton from "../Forminputs/SubmitButton";
import TextInput from "../Forminputs/TextInput";

export default function LoginForm() {
  const router = useRouter(); // Redirecting on the client side
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [emailErr, setEmailErr] = useState("");
  async function onSubmit(data) {
    try {
      console.log(data);
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });      
      const responseData = await response.json();
      if (response.ok) {
        console.log(responseData)
        setLoading(false);
        toast.success("User Created Successfully");
        reset();
        // if role=user => home
        // if role=farmer => onboarding
        // const userRole = responseData.data.role
        if(role==="USER"){
          router.push("/");
        }else{
          router.push(`/onboarding/${responseData.data.id}`);
        }
      } else {
        setLoading(false);
        if (response.status === 409) {
          setEmailErr("User with this Email already exists");
          toast.error("User with this Email already exists");
        } else {
          // Handle other errors
          console.error("Server Error:", responseData.error);
          toast.error("Oops Something Went wrong");
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Network Error:", error);
      toast.error("Something Went wrong, Please Try Again");
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">       
      <TextInput 
        label="Email Address"
        name="email"
        register={register}
        errors={errors}
        type="email"
        className="sm:col-span-2 mb-3"              
      />      
      {emailErr && 
        <small className="text-red-600 -mt-2 mb-2">
            {emailErr}
        </small>}    
      <TextInput 
        label="Password"
        name="password"
        register={register}
        errors={errors}
        type="password" 
        className="sm:col-span-2 mb-3"     
      />
      <SubmitButton
        isLoading={loading}
        buttonTitle="Login"
        loadingButtonTitle="Signing you in Please wait..."
      />      
      <p className="text-sm font-light text-gray-500 dark:text-gray-400 py-4">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-lime-600 hover:underline dark:text-lime-500"
        >
          Register
        </Link>
      </p>
    </form>
  );
}