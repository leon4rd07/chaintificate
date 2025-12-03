import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ address: string }> }
) {
    try {
        const { address } = await params;

        if (!address) {
            return NextResponse.json(
                { error: "Address is required" },
                { status: 400 }
            );
        }

        const collection = await prisma.certificateCollection.findUnique({
            where: {
                address: address,
            },
            include: {
                certificates: {
                    include: {
                        student: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                },
                institution: true
            },
        });

        if (!collection) {
            return NextResponse.json(
                { error: "Certificate collection not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(collection, { status: 200 });
    } catch (error) {
        console.error("Error fetching certificate collection:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function POST(
    request: Request,
    { params }: { params: Promise<{ address: string }> }
) {
    try {
        const { address } = await params;
        const body = await request.json();
        const { studentWallet, certificateName, tokenId, tokenUri } = body;

        if (!address) {
            return NextResponse.json(
                { error: "Address is required" },
                { status: 400 }
            );
        }

        if (!studentWallet || !certificateName || !tokenId || !tokenUri) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const collection = await prisma.certificateCollection.findUnique({
            where: {
                address: address,
            },
        });

        if (!collection) {
            return NextResponse.json(
                { error: "Certificate collection not found" },
                { status: 404 }
            );
        }

        // Find or create student
        let student = await prisma.student.findUnique({
            where: {
                wallet: studentWallet,
            },
        });

        if (!student) {
            student = await prisma.student.create({
                data: {
                    wallet: studentWallet,
                    name: studentWallet, // Use wallet as name as requested
                },
            });
        }

        const certificate = await prisma.certificate.create({
            data: {
                name: certificateName,
                tokenId: BigInt(tokenId),
                tokenUri: tokenUri,
                studentId: student.id,
                collectionId: collection.id,
            },
        });

        // Convert BigInt to string for JSON serialization
        const serializedCertificate = {
            ...certificate,
            tokenId: certificate.tokenId.toString(),
        };

        return NextResponse.json(serializedCertificate, { status: 201 });
    } catch (error) {
        console.error("Error creating certificate:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}


