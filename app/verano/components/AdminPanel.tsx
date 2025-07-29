'use client';

import { useState, useEffect } from 'react';
import { useProofOfVerano } from '@/lib/hooks/useProofOfVerano';
import { Address } from 'viem';
import { useFarcasterFrame } from '@/app/hooks/useFarcasterFrame';

interface StudentEntry {
  address: string;
  commitmentScore: number;
  deliverables: string[];
}

export function AdminPanel() {
  const { completeBootcamp, awardNFT, isLoading, isAwardSuccess } = useProofOfVerano();
  const { frameInfo } = useFarcasterFrame();
  const [lastAwardedStudent, setLastAwardedStudent] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<StudentEntry>({
    address: '',
    commitmentScore: 0,
    deliverables: []
  });
  const [newDeliverable, setNewDeliverable] = useState('');
  const [tokenURI, setTokenURI] = useState('');

  const handleAddDeliverable = () => {
    if (newDeliverable.trim()) {
      setSelectedStudent({
        ...selectedStudent,
        deliverables: [...selectedStudent.deliverables, newDeliverable.trim()]
      });
      setNewDeliverable('');
    }
  };

  const handleRemoveDeliverable = (index: number) => {
    setSelectedStudent({
      ...selectedStudent,
      deliverables: selectedStudent.deliverables.filter((_, i) => i !== index)
    });
  };

  const handleCompleteBootcamp = async () => {
    if (!selectedStudent.address) {
      alert('Por favor ingresa una dirección de estudiante');
      return;
    }

    try {
      await completeBootcamp(
        selectedStudent.address as Address,
        selectedStudent.commitmentScore,
        selectedStudent.deliverables
      );
      alert('Bootcamp marcado como completado exitosamente');
    } catch (error) {
      console.error('Error completing bootcamp:', error);
      alert('Error al completar el bootcamp');
    }
  };

  const handleAwardNFT = async () => {
    if (!selectedStudent.address || !tokenURI) {
      alert('Por favor completa todos los campos');
      return;
    }

    try {
      // Store the student address before awarding
      setLastAwardedStudent(selectedStudent.address);
      
      await awardNFT(
        selectedStudent.address as Address,
        tokenURI
      );
      
      // The registration will be triggered automatically by the hook
      alert('NFT otorgado exitosamente. El usuario será registrado en la base de datos.');
    } catch (error) {
      console.error('Error awarding NFT:', error);
      alert('Error al otorgar NFT');
      setLastAwardedStudent(null);
    }
  };

  // Effect to handle user registration after NFT award via API
  useEffect(() => {
    const registerAwardedUser = async () => {
      if (isAwardSuccess && lastAwardedStudent) {
        console.log('Admin Panel: Triggering user registration for:', lastAwardedStudent);
        
        try {
          const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              walletAddress: lastAwardedStudent,
              tokenId: 'admin_award_' + Date.now(), // Generate unique token ID
              commitmentScore: selectedStudent.commitmentScore,
              farcasterContext: frameInfo.context
            })
          });

          if (!response.ok) {
            throw new Error(`Registration failed: ${response.status}`);
          }

          const result = await response.json();
          console.log('Admin Panel: User registration successful:', result.user?.id);
          
          // Reset after successful registration
          setLastAwardedStudent(null);
        } catch (error) {
          console.error('Admin Panel: Failed to register user:', error);
        }
      }
    };

    registerAwardedUser();
  }, [isAwardSuccess, lastAwardedStudent, selectedStudent.commitmentScore, frameInfo.context]);

  return (
    <div className="space-y-6">
      <div className="bg-[var(--app-card-bg)] rounded-xl shadow-lg p-8 border border-[var(--app-card-border)]">
        <h2 className="text-2xl font-bold text-[var(--app-foreground)] mb-6">
          Panel de Administración
        </h2>

        {/* Student Selection */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[var(--app-foreground-muted)] mb-2">
              Dirección del Estudiante
            </label>
            <input
              type="text"
              value={selectedStudent.address}
              onChange={(e) => setSelectedStudent({ ...selectedStudent, address: e.target.value })}
              placeholder="0x..."
              className="w-full px-4 py-2 border border-[var(--app-card-border)] rounded-lg focus:ring-2 focus:ring-[var(--app-accent)] focus:border-transparent bg-[var(--app-background)] text-[var(--app-foreground)]"
            />
          </div>

          {/* Commitment Score */}
          <div>
            <label className="block text-sm font-medium text-[var(--app-foreground-muted)] mb-2">
              Score de Compromiso (0-10)
            </label>
            <input
              type="number"
              min="0"
              max="10"
              value={selectedStudent.commitmentScore}
              onChange={(e) => setSelectedStudent({ 
                ...selectedStudent, 
                commitmentScore: Math.min(10, Math.max(0, parseInt(e.target.value) || 0))
              })}
              className="w-full px-4 py-2 border border-[var(--app-card-border)] rounded-lg focus:ring-2 focus:ring-[var(--app-accent)] focus:border-transparent bg-[var(--app-background)] text-[var(--app-foreground)]"
            />
          </div>

          {/* Deliverables */}
          <div>
            <label className="block text-sm font-medium text-[var(--app-foreground-muted)] mb-2">
              Entregables
            </label>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newDeliverable}
                  onChange={(e) => setNewDeliverable(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddDeliverable()}
                  placeholder="Agregar entregable..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <button
                  onClick={handleAddDeliverable}
                  className="px-4 py-2 bg-[var(--app-accent)] text-white rounded-lg hover:bg-[var(--app-accent-hover)] transition-colors"
                >
                  Agregar
                </button>
              </div>

              <div className="space-y-2 max-h-40 overflow-y-auto">
                {selectedStudent.deliverables.map((deliverable, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-[var(--app-accent-light)] rounded-lg"
                  >
                    <span className="text-sm text-[var(--app-foreground-muted)]">{deliverable}</span>
                    <button
                      onClick={() => handleRemoveDeliverable(index)}
                      className="text-[var(--app-error)] hover:text-[var(--app-error-hover)]"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Complete Bootcamp Button */}
          <button
            onClick={handleCompleteBootcamp}
            disabled={isLoading}
            className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
              isLoading
                ? 'bg-[var(--app-gray)] text-[var(--app-foreground-muted)] cursor-not-allowed'
                : 'bg-[var(--app-success)] text-white hover:bg-[var(--app-success-hover)]'
            }`}
          >
            {isLoading ? 'Procesando...' : 'Marcar como Completado'}
          </button>
        </div>
      </div>

      {/* Award NFT Section */}
      <div className="bg-[var(--app-card-bg)] rounded-xl shadow-lg p-8 border border-[var(--app-card-border)]">
        <h3 className="text-xl font-bold text-[var(--app-foreground)] mb-6">
          Otorgar NFT de Certificación
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--app-foreground-muted)] mb-2">
              URI del Token (metadata)
            </label>
            <input
              type="text"
              value={tokenURI}
              onChange={(e) => setTokenURI(e.target.value)}
              placeholder="ipfs://... o https://..."
              className="w-full px-4 py-2 border border-[var(--app-card-border)] rounded-lg focus:ring-2 focus:ring-[var(--app-accent)] focus:border-transparent bg-[var(--app-background)] text-[var(--app-foreground)]"
            />
            <p className="mt-1 text-xs text-[var(--app-foreground-muted)]">
              URL de la metadata del NFT (imagen, descripción, atributos)
            </p>
          </div>

          <button
            onClick={handleAwardNFT}
            disabled={isLoading || !selectedStudent.address}
            className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
              isLoading || !selectedStudent.address
                ? 'bg-[var(--app-gray)] text-[var(--app-foreground-muted)] cursor-not-allowed'
                : 'bg-[var(--app-accent)] text-white hover:bg-[var(--app-accent-hover)]'
            }`}
          >
            {isLoading ? 'Procesando...' : 'Otorgar NFT'}
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-[var(--app-accent-light)] rounded-xl p-6 border border-[var(--app-card-border)]">
        <h4 className="font-semibold text-[var(--app-accent)] mb-2">
          Instrucciones para Admin
        </h4>
        <ol className="space-y-2 text-sm text-[var(--app-accent)]">
          <li>1. Ingresa la dirección del estudiante</li>
          <li>2. Asigna un score de compromiso (0-10)</li>
          <li>3. Agrega los entregables completados</li>
          <li>4. Marca el bootcamp como completado</li>
          <li>5. Opcionalmente, otorga el NFT con la URI de metadata</li>
        </ol>
      </div>
    </div>
  );
}