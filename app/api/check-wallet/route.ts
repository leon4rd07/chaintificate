import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const wallet = searchParams.get("wallet")?.toLowerCase();

    if (!wallet) {
        return NextResponse.json({ error: "Wallet is required" }, { status: 400 });
    }

    try {
        const student = await prisma.student.findUnique({
            where: { wallet },
        });

        if (student) {
            return NextResponse.json({ exists: true, role: "student" });
        }

        const institution = await prisma.institution.findUnique({
            where: { wallet },
        });

        if (institution) {
            return NextResponse.json({ exists: true, role: "institute" });
        }

        return NextResponse.json({ exists: false });
    } catch (error) {
        console.error("Error checking wallet:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
