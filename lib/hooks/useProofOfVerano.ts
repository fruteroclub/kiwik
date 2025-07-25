import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { ProofOfVeranoABI } from '../contracts/ProofOfVeranoABI';
import { useState, useEffect } from 'react';
import { Address } from 'viem';

// Deployed on Base Sepolia
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_PROOF_OF_VERANO_ADDRESS as Address || '0xc50dc3d7a967393a4ebf7944b0c6c819d10aa250';

export interface StudentInfo {
  signedUp: boolean;
  completed: boolean;
  commitmentScore: bigint;
  deliverables: string[];
}

export function useProofOfVerano() {
  const { address, isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(false);

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
    signedUp: (studentInfoRaw as any)[0] as boolean,
    completed: (studentInfoRaw as any)[1] as boolean,
    commitmentScore: (studentInfoRaw as any)[2] as bigint,
    deliverables: (studentInfoRaw as any)[3] as string[]
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

  const isOwner = owner && address && owner.toLowerCase() === address.toLowerCase();

  // Update loading state
  useEffect(() => {
    if (isSignUpSuccess || isCompleteSuccess || isAwardSuccess) {
      setIsLoading(false);
      refetchStudentInfo();
    }
  }, [isSignUpSuccess, isCompleteSuccess, isAwardSuccess, refetchStudentInfo]);

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