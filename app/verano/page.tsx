'use client';

import { useState } from 'react';
import { useProofOfVerano } from '@/lib/hooks/useProofOfVerano';
import { RegistrationForm } from './components/RegistrationForm';
import { StudentDashboard } from './components/StudentDashboard';
import { NFTDisplay } from './components/NFTDisplay';
import { AdminPanel } from './components/AdminPanel';

export default function VeranoBootcampPage() {
  const { studentInfo, isOwner, isConnected } = useProofOfVerano();
  const [activeTab, setActiveTab] = useState<'info' | 'dashboard' | 'admin'>('info');

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-orange-900">
                🌞 Proof of Verano En Cadena
              </h1>
              <p className="text-orange-600 mt-1">
                Bootcamp de Web3 certificado on-chain
              </p>
            </div>
            
            {isConnected && (
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab('info')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'info' 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                  }`}
                >
                  Info
                </button>
                {studentInfo?.signedUp && (
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeTab === 'dashboard' 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                    }`}
                  >
                    Mi Dashboard
                  </button>
                )}
                {isOwner && (
                  <button
                    onClick={() => setActiveTab('admin')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeTab === 'admin' 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                    }`}
                  >
                    Admin
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === 'info' && (
          <div className="space-y-8">
            {/* Hero Section */}
            <section className="bg-white rounded-2xl shadow-lg p-8 border border-orange-200">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold text-orange-900 mb-4">
                    ¡Aprende Web3 este verano! 
                  </h2>
                  <p className="text-gray-700 mb-6">
                    Únete a nuestro bootcamp intensivo de desarrollo Web3 y obtén tu certificación NFT on-chain al completar el programa.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🎯</span>
                      <div>
                        <h3 className="font-semibold text-orange-800">Objetivo</h3>
                        <p className="text-sm text-gray-600">
                          Dominar los fundamentos de Web3 y smart contracts
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">⏱️</span>
                      <div>
                        <h3 className="font-semibold text-orange-800">Duración</h3>
                        <p className="text-sm text-gray-600">
                          4 semanas intensivas de aprendizaje práctico
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🏆</span>
                      <div>
                        <h3 className="font-semibold text-orange-800">Certificación</h3>
                        <p className="text-sm text-gray-600">
                          NFT único e intransferible en Base blockchain
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center">
                  {!isConnected ? (
                    <div className="text-center">
                      <p className="text-gray-600 mb-4">
                        Conecta tu wallet para registrarte
                      </p>
                    </div>
                  ) : !studentInfo?.signedUp ? (
                    <RegistrationForm />
                  ) : (
                    <div className="text-center p-8 bg-green-50 rounded-xl border-2 border-green-200">
                      <span className="text-4xl mb-4 block">✅</span>
                      <p className="text-green-800 font-semibold">
                        ¡Ya estás registrado!
                      </p>
                      <button
                        onClick={() => setActiveTab('dashboard')}
                        className="mt-4 text-green-600 underline hover:text-green-700"
                      >
                        Ver mi progreso →
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Program Details */}
            <section className="bg-white rounded-2xl shadow-lg p-8 border border-orange-200">
              <h2 className="text-2xl font-bold text-orange-900 mb-6">
                Programa del Bootcamp
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                  <h3 className="font-bold text-orange-800 mb-2">Semana 1</h3>
                  <p className="text-sm text-gray-700">
                    Fundamentos de blockchain y Web3
                  </p>
                </div>
                
                <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                  <h3 className="font-bold text-orange-800 mb-2">Semana 2</h3>
                  <p className="text-sm text-gray-700">
                    Smart contracts con Solidity
                  </p>
                </div>
                
                <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                  <h3 className="font-bold text-orange-800 mb-2">Semana 3</h3>
                  <p className="text-sm text-gray-700">
                    DApps con React y ethers.js
                  </p>
                </div>
                
                <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                  <h3 className="font-bold text-orange-800 mb-2">Semana 4</h3>
                  <p className="text-sm text-gray-700">
                    Proyecto final y certificación
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'dashboard' && studentInfo && (
          <StudentDashboard />
        )}

        {activeTab === 'admin' && isOwner && (
          <AdminPanel />
        )}
      </main>
    </div>
  );
}