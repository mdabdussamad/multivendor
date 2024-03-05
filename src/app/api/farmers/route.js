import { NextResponse } from "next/server";
import db from "@/lib/db"

export async function POST(request) {
    try {        
      /* code,
         contactPerson,
         ContactPersonPhone,
         email,                    
         name,
         notes,
         phone,
         physicalAddress,
         phone,
         physicalAddress,  
         terms,
         isActive,
         profileImageUrl,
         products,
         landSize,
         mainCrop,
         userId */
        //  Update the Verification in the user
        const farmerData = await request.json();
        // Check if the user already exists in the db         
        const existingUser = await db.user.findUnique({
            where: {
                id: farmerData.userId,
            },
        });
        if (!existingUser) {            
            return NextResponse.json(
                {
                    data: null,
                    message: "No User Found",
                },
                { status: 404 }
            );
        }
        // Update emailVerified
        const updateUser = await db.user.update({
            where: {
                id: farmerData.userId,
            },
            data: {
                emailVerified: true,
            },
        });
        const newFarmerProfile = await db.farmerProfile.create({
            data: {
                code: farmerData.code,               
                contactPerson: farmerData.contactPerson,
                ContactPersonPhone: farmerData.ContactPersonPhone,
                email: farmerData.email,                    
                name: farmerData.name,
                notes: farmerData.notes,
                phone: farmerData.phone,
                physicalAddress: farmerData.physicalAddress,
                phone: farmerData.phone,
                physicalAddress: farmerData.physicalAddress,  
                terms: farmerData.terms,
                isActive: farmerData.isActive,
                profileImageUrl: farmerData.profileImageUrl,
                products: farmerData.products,
                landSize: parseFloat(farmerData.landSize),
                mainCrop: farmerData.mainCrop,
                userId: farmerData.userId,
            },
        });
        console.log(newFarmerProfile);
        return NextResponse.json(newFarmerProfile)
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {
                message: "Failed to create Farmer",
                error,
            },
            { status: 500 }
        );
    };
}

export async function GET(request) {
    try {
        const farmers = await db.user.findMany({
            orderBy: {
                createdAt: "desc",
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
        }, { status: 500 })
    }
}