import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request) {
    {
        /*
        -id => auto()
        -title
        -link
        -imageUrl        
    */
    }

    try {
        const {title, link, imageUrl} = await request.json();        
        const newBanner = {title, link, imageUrl};
        console.log(newBanner);
        return NextResponse.json(newBanner)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ 
            error: "Failed to create Banner",        
        }, 
        {status:500}
     );
    }
}

export async function GET(request) {
    try {
        const banners = await db.banner.findMany({
            orderBy:{
                createdAt:"desc"
            }
        });
        return NextResponse.json(banners);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "Failed to Fetch Banner",
        error
        }, {status:500})
    }
}