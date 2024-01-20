import { NextResponse } from "next/server";

export async function POST(request) {
    // -id => auto()
    //     -title
    //     -slug => auto()
    //     -description
    //     -image/images[]
    //     -sku
    //     -barcode
    //     -productPrice
    //     -salePrice
    //     -category
    //     -farmer
    //     -tags[]
    try {
        const productData = await request.json();        
        console.log(newProduct)
        return NextResponse.json(newProduct)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ 
            message: "Failed to create Product",
        error
        }, {status:500})
    }
}