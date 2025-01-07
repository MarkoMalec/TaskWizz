import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '~/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the required fields
    if (!body.notifyWhoId || !body.message || !body.type) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, message, and type are required' },
        { status: 400 }
      );
    }

    // Validate notification type
    const validTypes = ['success', 'error', 'info', 'warning'];
    if (!validTypes.includes(body.type)) {
      return NextResponse.json(
        { error: 'Invalid notification type. Must be one of: success, error, info, warning' },
        { status: 400 }
      );
    }

    // Create the notification
    const notification = await prisma.notification.create({
      data: {
        userId: body.notifyWhoId,
        message: body.message,
        type: body.type,
        read: false,
        relatedEntityId: body.relatedEntityId || null,
        relatedEntityType: body.relatedEntityType || null,
      },
    });

    return NextResponse.json(notification);
  } catch (error) {
    console.error('Error creating notification:', error);
    return NextResponse.json(
      { error: 'Failed to create notification' },
      { status: 500 }
    );
  }
}