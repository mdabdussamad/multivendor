import { NextResponse } from "next/server";

export async function POST(request) {
    // -id => auto()
    //     -title
    //     -link   
    //     -image    
    //     -toggle
    try {
        const bannerData = await request.json();        
        console.log(newBanner)
        return NextResponse.json(newBanner)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ 
            message: "Failed to create Banner",
        error
        }, {status:500})
    }
}