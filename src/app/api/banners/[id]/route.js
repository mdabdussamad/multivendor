import db from '@/lib/db'
import { NextResponse } from 'next/server';

export async function GET(request,{params:{id}}) {
    try {
        const banner = await db.banner.findUnique({
            where:{
                id,
            }           
        });
        return NextResponse.json(banner);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "Failed to Fetch Banner",
        error
        }, {status:500})
    }
}
export async function DELETE(request, { params: { id } }) {
    try {
        const existingBanner = await db.banner.findUnique({
            where: {
                id,
            }            
        });
        if(!existingBanner) {
            return NextResponse.json({
                data:null,
                message:"Banner Not Found",
            },
            {status:404}
          );
        }
        const deleteBanner = await db.banner.delete({
            where:{
                id,
            },    
        });
        return NextResponse.json(deleteBanner);
    } catch (error) {
        console.log(error)
        return NextResponse.json(
         {
            message: "Failed to Delete Banner",
            error,
         }, 
        { status:500 }
      );
    }
}


