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

        const formattedData = certificates.map((cert) => ({
            id: cert.id,
            name: cert.name,
            tokenUri: cert.tokenUri,
            mintingDate: cert.createdAt,
            institution: cert.collection.institution.name,
            type: cert.collection.type, // Helper for grouping
        }));

        const response = {
            certificates: formattedData
                .filter((c) => c.type === "Certificate")
                .map(({ type, ...rest }) => rest),
            degrees: formattedData
                .filter((c) => c.type === "Degree")
                .map(({ type, ...rest }) => rest),
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error("Error fetching certificates:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
