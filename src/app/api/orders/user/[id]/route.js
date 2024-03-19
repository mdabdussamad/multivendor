import db from '@/lib/db'
import { NextResponse } from 'next/server';

export async function GET(request, { params: { id } }) {
    try {
        const order = await db.order.findUnique({
            where: {
                userId:id,
            },
            include:{
                orderItems:true, 
            },
        });
        return NextResponse.json(order);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "Failed to Fetch Order",
            error
        }, { status: 500 })
    }
}
export async function DELETE(request, { params: { id } }) {
    try {
        const existingOrder = await db.order.findUnique({
            where: {
                id,
            }
        });
        if (!existingOrder) {
            return NextResponse.json({
                data: null,
                message: "Order Not Found",
            },
                { status: 404 }
            );
        }
        const deleteOrder = await db.order.delete({
            where: {
                id,
            },
        });
        return NextResponse.json(deleteOrder);
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {
                message: "Failed to Delete an Order",
                error,
            },
            { status: 500 }
        );
    }
}

