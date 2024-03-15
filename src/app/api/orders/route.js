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
        
        // Create orderNumber
        function generateOrderNumber(length) {
            const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let orderNumber = '';
          
            for (let i = 0; i < length; i++) {
              const randomIndex = Math.floor(Math.random() * characters.length);
              orderNumber += characters.charAt(randomIndex);
            }
          
            return orderNumber;
          }
          

        // Create Order Item
        const newOrderItems = await prisma.orderItem.createMany({
            data: orderItems.map((item) => ({
                productId: item.id,
                quantity: parseInt(item.qty),
                price: parseFloat(item.salePrice),        
                orderId: newOrder.id, 
                imageUrl: item.imageUrl,
                title: item.title,
                orderNumber: generateOrderNumber(8),              
            })),
        });
        console.log(newOrder, newOrderItems);
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
                createdAt: "desc",
            },
            include:{
                orderItems:true,
            },
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