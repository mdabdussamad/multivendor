import { NextResponse } from "next/server";
import db from "@/lib/db"

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

export async function POST(request) {

    try {
        const {
            checkoutFormData,
            orderItems
        } = await request.json();

        const { 
            city,
            country,
            district,
            email,
            firstName,
            lastName,
            paymentMethod,
            phone,
            shippingCost,
            streetAddress,
            userId } = checkoutFormData;
        const newOrder = await db.order.create({
            data: {
                city,
                country,
                district,
                email,
                firstName,
                lastName,
                paymentMethod,
                phone,
                shippingCost: parseFloat(shippingCost),
                streetAddress,
                userId,
            }
        });

        // Create Order Item
        const newOrderItems = await Prisma.orderItem.createMany({
            data: orderItems.map((item) => ({
                productId: item.id,
                quantity: parseInt(item.qty),
                price: parseFloat(item.salePrice),        
                orderId: newOrder.id,               
            })),
        });
        console.log(newOrderItems);
        return NextResponse.json(newOrder);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "Failed to create Order",
            error
        }, { status: 500 })
    }
}

export async function GET(request) {
    try {
        const orders = await db.order.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });
        return NextResponse.json(orders);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "Failed to Fetch Orders",
            error,
        },
            { status: 500 }
        );
    }
}