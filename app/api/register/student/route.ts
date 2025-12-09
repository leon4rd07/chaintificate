import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, wallet } = body;

        if (!name || !wallet) {
            return NextResponse.json(
                { error: "Name and wallet are required" },
                { status: 400 }
            );
        }

        const normalizedWallet = wallet.toLowerCase();

        const existingStudent = await prisma.student.findUnique({
            where: { wallet: normalizedWallet },
        });

        if (existingStudent) {
            return NextResponse.json(
                { error: "Wallet already registered as student" },
                { status: 400 }
            );
        }

        const student = await prisma.student.create({
            data: {
                name,
                wallet: normalizedWallet,
            },
        });

        return NextResponse.json(student, { status: 201 });
    } catch (error) {
        console.error("Error creating student:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
