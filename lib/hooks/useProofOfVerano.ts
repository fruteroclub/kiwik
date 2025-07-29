import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { ProofOfVeranoABI } from '../contracts/ProofOfVeranoABI';
import { useState, useEffect } from 'react';
import { Address } from 'viem';
import { useFarcasterFrame } from '@/app/hooks/useFarcasterFrame';

// Deployed on Base Sepolia
const CONTRACT_ADDRESS = (process.env.NEXT_PUBLIC_PROOF_OF_VERANO_ADDRESS || '0xc50dc3d7a967393a4ebf7944b0c6c819d10aa250').trim() as Address;

export interface StudentInfo {
  signedUp: boolean;
  completed: boolean;
  commitmentScore: bigint;
  deliverables: string[];
}

export function useProofOfVerano() {
  const { address, isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const { frameInfo } = useFarcasterFrame();

  // Read student info
  const { data: studentInfoRaw, refetch: refetchStudentInfo } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ProofOfVeranoABI,
    functionName: 'getStudentInfo',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && isConnected,
    }
  });

  // Parse student info
  const studentInfo: StudentInfo | null = studentInfoRaw ? {
    signedUp: (studentInfoRaw as unknown[])[0] as boolean,
    completed: (studentInfoRaw as unknown[])[1] as boolean,
    commitmentScore: (studentInfoRaw as unknown[])[2] as bigint,
    deliverables: (studentInfoRaw as unknown[])[3] as string[]
  } : null;

  // Sign up function
  const { 
    writeContract: signUpWrite, 
    data: signUpHash,
    isPending: isSignUpPending,
    error: signUpError 
  } = useWriteContract();

  const { isLoading: isSignUpConfirming, isSuccess: isSignUpSuccess } = useWaitForTransactionReceipt({
    hash: signUpHash,
  });

  const signUp = async () => {
    if (!address) {
      throw new Error('Wallet not connected');
    }

    setIsLoading(true);
    try {
      await signUpWrite({
        address: CONTRACT_ADDRESS,
        abi: ProofOfVeranoABI,
        functionName: 'signUp',
        args: [address],
      });
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  // Complete bootcamp (admin only)
  const { 
    writeContract: completeBootcampWrite,
    data: completeHash,
    isPending: isCompletePending,
    error: completeError
  } = useWriteContract();

  const { isLoading: isCompleteConfirming, isSuccess: isCompleteSuccess } = useWaitForTransactionReceipt({
    hash: completeHash,
  });

  const completeBootcamp = async (
    student: Address, 
    commitmentScore: number, 
    deliverables: string[]
  ) => {
    setIsLoading(true);
    try {
      await completeBootcampWrite({
        address: CONTRACT_ADDRESS,
        abi: ProofOfVeranoABI,
        functionName: 'completeBootcamp',
        args: [student, BigInt(commitmentScore), deliverables],
      });
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  // Award NFT (admin only)
  const { 
    writeContract: awardNFTWrite,
    data: awardHash,
    isPending: isAwardPending,
    error: awardError
  } = useWriteContract();

  const { isLoading: isAwardConfirming, isSuccess: isAwardSuccess } = useWaitForTransactionReceipt({
    hash: awardHash,
  });

  const awardNFT = async (graduate: Address, tokenURI: string) => {
    setIsLoading(true);
    try {
      await awardNFTWrite({
        address: CONTRACT_ADDRESS,
        abi: ProofOfVeranoABI,
        functionName: 'awardNFT',
        args: [graduate, tokenURI],
      });
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  // Check owner
  const { data: owner } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ProofOfVeranoABI,
    functionName: 'owner',
  });

  const isOwner = owner && address && (owner as string).toLowerCase() === address.toLowerCase();

  // Update loading state
  useEffect(() => {
    if (isSignUpSuccess || isCompleteSuccess || isAwardSuccess) {
      setIsLoading(false);
      refetchStudentInfo();
    }
  }, [isSignUpSuccess, isCompleteSuccess, isAwardSuccess, refetchStudentInfo]);

  // Handle NFT award success - Register user in database via API
  useEffect(() => {
    const handleNFTAwardSuccess = async () => {
      if (isAwardSuccess && awardHash && address) {
        console.log('NFT award successful, triggering user registration via API');
        
        try {
          const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              walletAddress: address,
              tokenId: awardHash, // Using transaction hash as temporary token ID
              farcasterContext: frameInfo.context
            })
          });

          if (!response.ok) {
            throw new Error(`Registration failed: ${response.status}`);
          }

          const result = await response.json();
          console.log('User registration completed successfully:', result.user?.id);
        } catch (error) {
          console.error('Failed to register user after NFT award:', error);
          // Don't block the UI - registration happens in background
        }
      }
    };

    handleNFTAwardSuccess();
  }, [isAwardSuccess, awardHash, address, frameInfo.context]);

  return {
    // State
    studentInfo,
    isOwner,
    isConnected,
    contractAddress: CONTRACT_ADDRESS,
    
    // Loading states
    isLoading: isLoading || isSignUpPending || isSignUpConfirming || 
               isCompletePending || isCompleteConfirming || 
               isAwardPending || isAwardConfirming,
    
    // Functions
    signUp,
    completeBootcamp,
    awardNFT,
    refetchStudentInfo,
    
    // Errors
    signUpError,
    completeError,
    awardError,
    
    // Success states
    isSignUpSuccess,
    isCompleteSuccess,
    isAwardSuccess,
  };
}