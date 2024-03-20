import db from '@/lib/db'
import { NextResponse } from 'next/server';

export async function GET(request,{params:{slug}}) {
    try {
        const product = await db.product.findUnique({
            where:{
                slug,
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

export async function PUT(request,{params: { id } }) {
    try {
        const {barcode, categoryId, description, farmerId, imageUrl, isActive, isWholesale, productCode, productPrice, salePrice, sku, slug, tags, title, unit, wholeSalePrice, wholesaleQty, productStock, qty} = await request.json();          
        const existingProduct = await db.product.findUnique({
            where: {
                id,
            },
        });
        if (!existingProduct){
            return NextResponse.json({
                data: null,
                message: "Product not Found"
            }, 
            {status:404}
            );
        }
        const updatedProduct = await db.product.update({
            where: {id},
            data: {barcode,
                categoryId,
                description,
                userId: farmerId,
                imageUrl,
                isActive,
                isWholesale,
                productCode,
                productPrice: parseFloat(productPrice),
                salePrice: parseFloat(salePrice),
                sku,
                slug,
                tags,
                title,
                unit,
                wholeSalePrice: parseFloat(wholeSalePrice),
                wholesaleQty: parseInt(wholesaleQty),
                productStock: parseInt(productStock),
                qty: parseInt(qty),},
        });
        return NextResponse.json(updatedProduct);
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Failed to update Product",
        error
        }, {status:500})
    }
}

