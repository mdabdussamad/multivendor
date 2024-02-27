import db from '@/lib/db'
import { NextResponse } from 'next/server';

export async function GET(request,{params:{id}}) {
    try {
        const product = await db.product.findUnique({
            where:{
                id,
            }           
        });
        return NextResponse.json(product);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "Failed to Fetch Product",
        error
        }, {status:500})
    }
}
export async function DELETE(request, { params: { id } }) {
    try {
        const existingProduct = await db.product.findUnique({
            where: {
                id,
            }            
        });
        if(!existingProduct) {
            return NextResponse.json({
                data:null,
                message:"Product Not Found",
            },
            {status:404}
          );
        }
        const deleteProduct = await db.product.delete({
            where:{
                id,
            },    
        });
        return NextResponse.json(deleteProduct);
    } catch (error) {
        console.log(error)
        return NextResponse.json(
         {
            message: "Failed to Delete Product",
            error,
         }, 
        { status:500 }
      );
    }
}


