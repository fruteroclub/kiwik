import { NextRequest, NextResponse } from 'next/server';
import { syncUserWithContract } from '@/scripts/validate-nft-registration';

// API endpoint to sync a specific user with the contract
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { walletAddress } = body;

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'walletAddress is required' },
        { status: 400 }
      );
    }

    console.log('API: Syncing user with contract:', walletAddress);

    const result = await syncUserWithContract(walletAddress);

    return NextResponse.json({
      success: true,
      synced: result.synced,
      user: result.user,
      message: result.message
    });

  } catch (error) {
    console.error('API: Sync error:', error);
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Sync failed',
        success: false 
      },
      { status: 500 }
    );
  }
}

// API endpoint to validate all users (admin only)
export async function GET(req: NextRequest) {
  try {
    // In production, add admin authentication here
    console.log('API: Running full NFT registration validation');

    // Import and run validation function
    const { default: validateNFTRegistration } = await import('@/scripts/validate-nft-registration');
    
    // Run validation (this will log results to console)
    await validateNFTRegistration();

    return NextResponse.json({
      success: true,
      message: 'Validation completed. Check server logs for details.'
    });

  } catch (error) {
    console.error('API: Validation error:', error);
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Validation failed',
        success: false 
      },
      { status: 500 }
    );
  }
}