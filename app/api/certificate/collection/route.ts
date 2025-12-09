import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { address, name, type, description, wallet } = body;

        if (!address || !name || !description || !wallet) {
            return NextResponse.json(
                { error: "Address, name, description, and wallet are required" },
                { status: 400 }
            );
        }

        // Find the institution by wallet address
        const institution = await prisma.institution.findUnique({
            where: { wallet: wallet.toLowerCase() },
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
                type,
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

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const wallet = searchParams.get("wallet")?.toLowerCase();
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const type = searchParams.get("type");

        if (!wallet) {
            return NextResponse.json(
                { error: "Wallet address is required" },
                { status: 400 }
            );
        }

        const institution = await prisma.institution.findUnique({
            where: { wallet: wallet.toLowerCase() },
        });

        if (!institution) {
            return NextResponse.json(
                { error: "Institution not found" },
                { status: 404 }
            );
        }

        const skip = (page - 1) * limit;

        const [collections, total] = await prisma.$transaction([
            prisma.certificateCollection.findMany({
                where: {
                    institutionId: institution.id,
                    ...(type && type !== 'All' ? { type: type as any } : {}),
                },
                select: {
                    name: true,
                    address: true,
                    description: true,
                    createdAt: true,
                    _count: {
                        select: {
                            certificates: true,
                        },
                    },
                },
                skip,
                take: limit,
                orderBy: {
                    createdAt: 'desc',
                },
            }),
            prisma.certificateCollection.count({
                where: {
                    institutionId: institution.id,
                    ...(type && type !== 'All' ? { type: type as any } : {}),
                },
            }),
        ]);

        return NextResponse.json({
            data: collections,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            }
        }, { status: 200 });
    } catch (error) {
        console.error("Error fetching certificate collections:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
