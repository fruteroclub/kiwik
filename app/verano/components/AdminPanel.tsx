'use client';

import { useState } from 'react';
import { useProofOfVerano } from '@/lib/hooks/useProofOfVerano';
import { Address } from 'viem';

interface StudentEntry {
  address: string;
  commitmentScore: number;
  deliverables: string[];
}

export function AdminPanel() {
  const { completeBootcamp, awardNFT, isLoading } = useProofOfVerano();
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
      await awardNFT(
        selectedStudent.address as Address,
        tokenURI
      );
      alert('NFT otorgado exitosamente');
    } catch (error) {
      console.error('Error awarding NFT:', error);
      alert('Error al otorgar NFT');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-8 border border-orange-200">
        <h2 className="text-2xl font-bold text-orange-900 mb-6">
          Panel de Administración
        </h2>

        {/* Student Selection */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dirección del Estudiante
            </label>
            <input
              type="text"
              value={selectedStudent.address}
              onChange={(e) => setSelectedStudent({ ...selectedStudent, address: e.target.value })}
              placeholder="0x..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Commitment Score */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Deliverables */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Agregar
                </button>
              </div>

              <div className="space-y-2 max-h-40 overflow-y-auto">
                {selectedStudent.deliverables.map((deliverable, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-orange-50 rounded-lg"
                  >
                    <span className="text-sm text-gray-700">{deliverable}</span>
                    <button
                      onClick={() => handleRemoveDeliverable(index)}
                      className="text-red-500 hover:text-red-700"
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
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            {isLoading ? 'Procesando...' : 'Marcar como Completado'}
          </button>
        </div>
      </div>

      {/* Award NFT Section */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-orange-200">
        <h3 className="text-xl font-bold text-orange-900 mb-6">
          Otorgar NFT de Certificación
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URI del Token (metadata)
            </label>
            <input
              type="text"
              value={tokenURI}
              onChange={(e) => setTokenURI(e.target.value)}
              placeholder="ipfs://... o https://..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <p className="mt-1 text-xs text-gray-500">
              URL de la metadata del NFT (imagen, descripción, atributos)
            </p>
          </div>

          <button
            onClick={handleAwardNFT}
            disabled={isLoading || !selectedStudent.address}
            className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
              isLoading || !selectedStudent.address
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-purple-500 text-white hover:bg-purple-600'
            }`}
          >
            {isLoading ? 'Procesando...' : 'Otorgar NFT'}
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-2">
          Instrucciones para Admin
        </h4>
        <ol className="space-y-2 text-sm text-blue-700">
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