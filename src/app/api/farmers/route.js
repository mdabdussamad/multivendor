import { NextResponse } from "next/server";

export async function POST(request) {
    // -id => auto()
    //     -title
    //     -link   
    //     -image    
    //     -toggle
    try {
        const farmerData = await request.json();        
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