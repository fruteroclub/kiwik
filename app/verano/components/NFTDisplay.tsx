'use client';

import { useState } from 'react';
import { useProofOfVerano } from '@/lib/hooks/useProofOfVerano';

interface NFTDisplayProps {
  tokenId?: bigint;
  tokenURI?: string;
  studentAddress?: string;
}

export function NFTDisplay({ tokenId, tokenURI, studentAddress }: NFTDisplayProps) {
  const [imageError, setImageError] = useState(false);
  
  // For MVP, we'll use a placeholder NFT design
  const placeholderNFT = (
    <div className="relative w-full aspect-square bg-gradient-to-br from-orange-400 via-yellow-400 to-orange-500 rounded-2xl shadow-2xl overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full translate-x-24 translate-y-24" />
      </div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center p-8 text-white">
        <div className="text-6xl mb-4">🌞</div>
        <h3 className="text-2xl font-bold mb-2">Proof of Verano</h3>
        <p className="text-lg mb-6">En Cadena 2024</p>
        
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 w-full">
          <p className="text-sm text-center mb-1">Certificado de Completación</p>
          <p className="text-xs text-center opacity-80">
            Bootcamp Web3 • Base Network
          </p>
        </div>
        
        {tokenId && (
          <div className="mt-4 text-xs opacity-80">
            Token ID: #{tokenId.toString()}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* NFT Display */}
      <div className="relative group">
        {tokenURI && !imageError ? (
          <img
            src={tokenURI}
            alt="Proof of Verano NFT"
            className="w-full aspect-square rounded-2xl shadow-2xl"
            onError={() => setImageError(true)}
          />
        ) : (
          placeholderNFT
        )}
        
        {/* Hover Effect */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-2xl" />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          className="flex-1 py-2 px-4 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
          onClick={() => {
            // TODO: Implement claim NFT functionality
            alert('Claim NFT functionality coming soon!');
          }}
        >
          Reclamar NFT
        </button>
        
        <button
          className="py-2 px-4 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          onClick={() => {
            // TODO: Implement share functionality
            alert('Share functionality coming soon!');
          }}
        >
          <span className="text-lg">🔗</span>
        </button>
      </div>

      {/* Metadata */}
      {studentAddress && (
        <div className="bg-gray-50 rounded-lg p-4 text-sm">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Propietario:</span>
              <span className="font-mono text-xs">
                {studentAddress.slice(0, 6)}...{studentAddress.slice(-4)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Red:</span>
              <span className="font-medium">Base</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Estándar:</span>
              <span className="font-medium">ERC-721</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}