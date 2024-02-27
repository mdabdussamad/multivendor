import db from '@/lib/db'
import { NextResponse } from 'next/server';

export async function GET(request,{params:{id}}) {
    try {
        const farmer = await db.farmer.findUnique({
            where:{
                id,
            }           
        });
        return NextResponse.json(farmer);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "Failed to Fetch Farmer",
        error
        }, {status:500})
    }
}
export async function DELETE(request, { params: { id } }) {
    try {
        const existingFarmer = await db.farmer.findUnique({
            where: {
                id,
            }            
        });
        if(!existingFarmer) {
            return NextResponse.json({
                data:null,
                message:"Farmer Not Found",
            },
            {status:404}
          );
        }
        const deleteFarmer = await db.farmer.delete({
            where:{
                id,
            },    
        });
        return NextResponse.json(deleteFarmer);
    } catch (error) {
        console.log(error)
        return NextResponse.json(
         {
            message: "Failed to Delete Farmer",
            error,
         }, 
        { status:500 }
      );
    }
}


