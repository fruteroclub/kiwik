import { NextRequest, NextResponse } from 'next/server';
import { userService } from '@/lib/db';

export async function GET() {
  try {
    console.log('API: Fetching all registered users');

    // Get all users from database
    const users = await userService.getAllUsers();

    // Transform data for the dashboard
    const transformedUsers = users.map(user => ({
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      farcasterId: user.farcasterId,
      farcasterUsername: user.farcasterUsername,
      avatarUrl: user.avatarUrl,
      appWallet: user.appWallet,
      bootcampCompleted: user.bootcampCompleted,
      completionDate: user.completionDate?.toISOString(),
      commitmentScore: user.commitmentScore,
      nftTokenId: user.nftTokenId,
      powerBadge: user.powerBadge,
      followerCount: user.followerCount,
      followingCount: user.followingCount,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString()
    }));

    console.log(`API: Found ${users.length} registered users`);

    return NextResponse.json({
      success: true,
      users: transformedUsers,
      total: users.length,
      completed: users.filter(u => u.bootcampCompleted).length,
      inProgress: users.filter(u => !u.bootcampCompleted).length
    });

  } catch (error) {
    console.error('API: Error fetching users:', error);
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to fetch users',
        success: false,
        users: []
      },
      { status: 500 }
    );
  }
}

// Optional: Add filtering support
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { filter, limit, offset } = body;

    console.log('API: Fetching filtered users:', { filter, limit, offset });

    let users;
    
    switch (filter) {
      case 'completed':
        users = await userService.getUsersByBootcampStatus(true);
        break;
      case 'registered':
        users = await userService.getUsersByBootcampStatus(false);
        break;
      case 'farcaster':
        users = await userService.getUsersWithFarcaster();
        break;
      default:
        users = await userService.getAllUsers();
    }

    // Apply pagination if provided
    if (limit || offset) {
      const startIndex = offset || 0;
      const endIndex = limit ? startIndex + limit : undefined;
      users = users.slice(startIndex, endIndex);
    }

    // Transform data
    const transformedUsers = users.map(user => ({
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      farcasterId: user.farcasterId,
      farcasterUsername: user.farcasterUsername,
      avatarUrl: user.avatarUrl,
      appWallet: user.appWallet,
      bootcampCompleted: user.bootcampCompleted,
      completionDate: user.completionDate?.toISOString(),
      commitmentScore: user.commitmentScore,
      nftTokenId: user.nftTokenId,
      powerBadge: user.powerBadge,
      followerCount: user.followerCount,
      followingCount: user.followingCount,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString()
    }));

    return NextResponse.json({
      success: true,
      users: transformedUsers,
      total: transformedUsers.length,
      filter: filter || 'all'
    });

  } catch (error) {
    console.error('API: Error filtering users:', error);
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to filter users',
        success: false,
        users: []
      },
      { status: 500 }
    );
  }
}