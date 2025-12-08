import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        const certificates = await prisma.certificate.findMany({
            where: {
                student: {
                    OR: [{ id: id }, { wallet: id.toLowerCase() }],
                },
            },
            include: {
                collection: {
                    include: {
                        institution: true,
                    },
                },
            },
        });

        // Handle BigInt serialization
        const serializedCertificates = certificates.map((cert) => ({
            ...cert,
            tokenId: cert.tokenId.toString(),
        }));

        return NextResponse.json(serializedCertificates);
    } catch (error) {
        console.error("Error fetching certificates:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
