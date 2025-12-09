import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        const certificate = await prisma.certificate.findUnique({
            where: {
                id: id,
            },
            include: {
                student: true,
                collection: {
                    include: {
                        institution: true,
                    },
                },
            },
        });

        if (!certificate) {
            return NextResponse.json(
                { error: "Certificate not found" },
                { status: 404 }
            );
        }

        // Handle BigInt serialization
        const serializedCertificate = {
            ...certificate,
            tokenId: certificate.tokenId.toString(),
        };

        return NextResponse.json(serializedCertificate);
    } catch (error) {
        console.error("Error fetching certificate:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
