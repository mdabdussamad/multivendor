import { NextResponse } from "next/server";
import db from "@/lib/db"

export async function POST(request) {
    
    try {                     
        const {
                code,
                contactPerson,
                ContactPersonPhone,
                email,                    
                name,
                notes,
                phone,
                physicalAddress,
                terms,
            } = await request.json();
            const newFarmer ={code,
                contactPerson,
                ContactPersonPhone,
                email,                            
                name,
                notes,
                phone,
                physicalAddress,
                terms,}       
        console.log(newFarmer)
        return NextResponse.json(newFarmer)
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { 
            message: "Failed to create Farmer",
            error,        
        }, 
        {status:500}
        );
    };
}

export async function GET(request) {
    try {
        const farmers = await db.user.findMany({
            orderBy:{
                createdAt:"desc",
            },
            where: {
                role: 'FARMER',
            },
            include: {
                farmerProfile: true,
            },
        });
        return NextResponse.json(farmers);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "Failed to Fetch FARMERs",
        error
        }, {status:500})
    }
}