import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { tokenUri } = body;

        if (!tokenUri) {
            return NextResponse.json(
                { error: "Token URI is required" },
                { status: 400 }
            );
        }

        const certificate = await prisma.certificate.findFirst({
            where: {
                tokenUri: tokenUri,
            },
            select: {
                id: true,
            },
        });

        if (!certificate) {
            return NextResponse.json(
                { error: "Certificate not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ id: certificate.id }, { status: 200 });
    } catch (error) {
        console.error("Error verifying certificate:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
