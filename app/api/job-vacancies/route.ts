import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 8;
    const skip = (page - 1) * limit;

    try {
        const [data, total] = await Promise.all([
            prisma.jobVacancy.findMany({
                skip,
                take: limit,
                orderBy: {
                    createdAt: 'desc',
                },
            }),
            prisma.jobVacancy.count(),
        ]);

        const lastPage = Math.ceil(total / limit);

        return NextResponse.json({
            data,
            meta: {
                total,
                page,
                lastPage,
            },
        });
    } catch (error) {
        console.error('Error fetching job vacancies:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
