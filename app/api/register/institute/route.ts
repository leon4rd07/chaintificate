import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, wallet, description, contact } = body;

        if (!name || !wallet || !description || !contact) {
            return NextResponse.json(
                { error: "Name, wallet, description, and contact are required" },
                { status: 400 }
            );
        }

        const institution = await prisma.institution.create({
            data: {
                name,
                wallet,
                description,
                contact,
            },
        });

        return NextResponse.json(institution, { status: 201 });
    } catch (error) {
        console.error("Error creating institution:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
