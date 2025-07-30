'use client';

import { useState } from 'react';

export function FarcasterAuthButton() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    typeof window !== 'undefined' && !!localStorage.getItem('farcaster_signer_uuid')
  );

  const handleAuth = () => {
    // In a real implementation, you would:
    // 1. Redirect to Neynar's OAuth flow
    // 2. Get the signer UUID from the callback
    // 3. Store it securely
    
    // For demo purposes, we'll show an alert
    alert(
      'Para publicar casts necesitas:\n' +
      '1. Crear una cuenta en neynar.com\n' +
      '2. Obtener un Signer UUID\n' +
      '3. Implementar el flujo OAuth de Neynar\n\n' +
      'Consulta: https://docs.neynar.com/docs/how-to-let-users-connect-farcaster-accounts-with-write-access-for-free'
    );
  };

  if (isAuthenticated) {
    return (
      <div className="text-sm text-green-500">
        ✅ Autenticado con Farcaster
      </div>
    );
  }

  return (
    <button
      onClick={handleAuth}
      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
    >
      🔐 Conectar Farcaster
    </button>
  );
}