import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(req: NextRequest): Promise<NextResponse> {
    const searchParams = new URL(req.url).searchParams;
    const searchInput = searchParams.get('searchInput') || '';

    const tasks = await prisma.task.findMany({
        where: {
            OR: [
                { name: { contains: searchInput } },
                { priority: { contains: searchInput } },
                { status: { contains: searchInput } },
                { address: { contains: searchInput } },
                { city: { contains: searchInput } },
                { TaskNote: { some: { content: { contains: searchInput } } } }
            ]
        },
        orderBy: { dateCreated: 'desc' },
        take: 5,
        select: {
            id: true,
            name: true,
            priority: true,
            status: true,
            deadline: true,
            address: true,
            city: true,
            TaskNote: true,
        },
    });

    return NextResponse.json(tasks);
}