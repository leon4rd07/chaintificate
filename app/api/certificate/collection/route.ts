import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { address, name, description, wallet } = body;

        if (!address || !name || !description || !wallet) {
            return NextResponse.json(
                { error: "Address, name, description, and wallet are required" },
                { status: 400 }
            );
        }

        // Find the institution by wallet address
        const institution = await prisma.institution.findUnique({
            where: { wallet },
        });

        if (!institution) {
            return NextResponse.json(
                { error: "Institution not found" },
                { status: 404 }
            );
        }

        // Create the certificate collection linked to the institution
        const collection = await prisma.certificateCollection.create({
            data: {
                address,
                name,
                description,
                institutionId: institution.id,
            },
        });

        return NextResponse.json(collection, { status: 201 });
    } catch (error) {
        console.error("Error creating certificate collection:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
