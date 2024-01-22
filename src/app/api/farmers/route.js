import { NextResponse } from "next/server";

export async function POST(request) {
    
    try {
        const {
            code, 
            contactPerson, 
            contactPersonPhone, 
            email, 
            name, 
            notes, 
            phone, 
            physicalAddress, 
            terms} = await request.json();        
        const newFarmer = {
            code, 
            contactPerson, 
            contactPersonPhone, 
            email, 
            name, 
            notes, 
            phone, 
            physicalAddress, 
            terms}
        console.log(newFarmer)
        return NextResponse.json(newFarmer)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ 
            message: "Failed to create Farmer",
        error
        }, {status:500})
    }
}