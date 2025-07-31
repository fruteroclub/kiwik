'use client';

import { useState } from 'react';
import { useProofOfVerano } from '@/lib/hooks/useProofOfVerano';
import { RegistrationForm } from './verano/components/RegistrationForm';
import { StudentDashboard } from './verano/components/StudentDashboard';
import { AdminPanel } from './verano/components/AdminPanel';
import { AddFrameButton } from './components/AddFrameButton';
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import {
  Name,
  Identity,
  Address,
  Avatar,
  EthBalance,
} from "@coinbase/onchainkit/identity";

export default function VeranoBootcampPage() {
  const { studentInfo, isOwner, isConnected } = useProofOfVerano();
  const [activeTab, setActiveTab] = useState<'info' | 'dashboard' | 'admin'>('info');

  return (
    <div className="min-h-screen bg-[var(--app-background)] text-[var(--app-foreground)]">
      {/* Header */}
      <header className="bg-[var(--app-card-bg)] backdrop-blur-md border-b border-[var(--app-card-border)] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-[var(--app-foreground)]">
                🌞 Proof of Verano En Cadena
              </h1>
              <p className="text-[var(--app-foreground-muted)] mt-1 text-sm sm:text-base">
                Bootcamp de Web3 certificado on-chain
              </p>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Add Frame Button */}
              <AddFrameButton variant="compact" />
              
              {/* Wallet Component */}
              <Wallet className="z-10">
                <ConnectWallet className="px-3 py-2 text-sm sm:px-4 sm:py-2 sm:text-base">
                  <Name className="text-inherit" />
                </ConnectWallet>
                <WalletDropdown>
                  <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                    <Avatar />
                    <Name />
                    <Address />
                    <EthBalance />
                  </Identity>
                  <WalletDropdownDisconnect />
                </WalletDropdown>
              </Wallet>
            </div>
          </div>

          {/* Navigation Tabs - Only show when connected */}
          {isConnected && (
            <div className="flex gap-1 sm:gap-2 mt-4 overflow-x-auto pb-1">
              <button
                onClick={() => setActiveTab('info')}
                className={`px-4 py-3 min-w-[44px] min-h-[44px] rounded-lg font-medium transition-colors text-sm whitespace-nowrap ${
                  activeTab === 'info' 
                    ? 'bg-[var(--app-accent)] text-white' 
                    : 'bg-[var(--app-card-bg)] text-[var(--app-foreground-muted)] hover:bg-[var(--app-accent-light)] hover:text-[var(--app-foreground)]'
                }`}
              >
                📋 Info
              </button>
              {studentInfo?.signedUp && (
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-4 py-3 min-w-[44px] min-h-[44px] rounded-lg font-medium transition-colors text-sm whitespace-nowrap ${
                    activeTab === 'dashboard' 
                      ? 'bg-[var(--app-accent)] text-white' 
                      : 'bg-[var(--app-card-bg)] text-[var(--app-foreground-muted)] hover:bg-[var(--app-accent-light)] hover:text-[var(--app-foreground)]'
                  }`}
                >
                  📊 Dashboard
                </button>
              )}
              {Boolean(isOwner) && (
                <button
                  onClick={() => setActiveTab('admin')}
                  className={`px-4 py-3 min-w-[44px] min-h-[44px] rounded-lg font-medium transition-colors text-sm whitespace-nowrap ${
                    activeTab === 'admin' 
                      ? 'bg-[var(--app-accent)] text-white' 
                      : 'bg-[var(--app-card-bg)] text-[var(--app-foreground-muted)] hover:bg-[var(--app-accent-light)] hover:text-[var(--app-foreground)]'
                  }`}
                >
                  ⚙️ Admin
                </button>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'info' && (
          <div className="space-y-8">
            {/* Add Frame Benefits Banner */}
            <AddFrameButton variant="full" showBenefits={true} />
            
            {/* Hero Section */}
            <section className="bg-[var(--app-card-bg)] backdrop-blur-md rounded-2xl shadow-lg p-6 sm:p-8 border border-[var(--app-card-border)]">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[var(--app-foreground)] mb-4">
                    ¡Aprende Web3 este verano! 
                  </h2>
                  <p className="text-[var(--app-foreground-muted)] mb-6 leading-relaxed">
                    Únete a nuestro bootcamp intensivo de desarrollo Web3 y obtén tu certificación NFT on-chain al completar el programa.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🎯</span>
                      <div>
                        <h3 className="font-semibold text-[var(--app-foreground)]">Objetivo</h3>
                        <p className="text-sm text-[var(--app-foreground-muted)]">
                          Dominar los fundamentos de Web3 y smart contracts
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">⏱️</span>
                      <div>
                        <h3 className="font-semibold text-[var(--app-foreground)]">Duración</h3>
                        <p className="text-sm text-[var(--app-foreground-muted)]">
                          4 semanas intensivas de aprendizaje práctico
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🏆</span>
                      <div>
                        <h3 className="font-semibold text-[var(--app-foreground)]">Certificación</h3>
                        <p className="text-sm text-[var(--app-foreground-muted)]">
                          NFT único e intransferible en Base blockchain
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center">
                  {!isConnected ? (
                    <div className="text-center p-6 bg-[var(--app-accent-light)] rounded-xl border border-[var(--app-card-border)]">
                      <span className="text-4xl mb-4 block">🔗</span>
                      <p className="text-[var(--app-foreground-muted)] mb-4">
                        Conecta tu wallet para registrarte
                      </p>
                      <p className="text-xs text-[var(--app-foreground-muted)]">
                        Usa el botón &quot;Connect Wallet&quot; en la esquina superior derecha
                      </p>
                    </div>
                  ) : !studentInfo?.signedUp ? (
                    <RegistrationForm />
                  ) : (
                    <div className="text-center p-8 bg-[var(--app-accent-light)] rounded-xl border-2 border-[var(--app-accent)]">
                      <span className="text-4xl mb-4 block">✅</span>
                      <p className="text-[var(--app-accent)] font-semibold mb-4">
                        ¡Ya estás registrado!
                      </p>
                      <button
                        onClick={() => setActiveTab('dashboard')}
                        className="bg-[var(--app-accent)] text-white px-4 py-2 rounded-lg hover:bg-[var(--app-accent-hover)] transition-colors"
                      >
                        Ver mi progreso →
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Program Details */}
            <section className="bg-[var(--app-card-bg)] backdrop-blur-md rounded-2xl shadow-lg p-6 sm:p-8 border border-[var(--app-card-border)]">
              <h2 className="text-2xl font-bold text-[var(--app-foreground)] mb-6">
                Programa del Bootcamp
              </h2>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="bg-[var(--app-accent-light)] rounded-xl p-4 sm:p-6 border border-[var(--app-card-border)]">
                  <h3 className="font-bold text-[var(--app-foreground)] mb-2">Semana 1</h3>
                  <p className="text-sm text-[var(--app-foreground-muted)]">
                    Fundamentos de blockchain y Web3
                  </p>
                </div>
                
                <div className="bg-[var(--app-accent-light)] rounded-xl p-4 sm:p-6 border border-[var(--app-card-border)]">
                  <h3 className="font-bold text-[var(--app-foreground)] mb-2">Semana 2</h3>
                  <p className="text-sm text-[var(--app-foreground-muted)]">
                    Smart contracts con Solidity
                  </p>
                </div>
                
                <div className="bg-[var(--app-accent-light)] rounded-xl p-4 sm:p-6 border border-[var(--app-card-border)]">
                  <h3 className="font-bold text-[var(--app-foreground)] mb-2">Semana 3</h3>
                  <p className="text-sm text-[var(--app-foreground-muted)]">
                    DApps con React y ethers.js
                  </p>
                </div>
                
                <div className="bg-[var(--app-accent-light)] rounded-xl p-4 sm:p-6 border border-[var(--app-card-border)]">
                  <h3 className="font-bold text-[var(--app-foreground)] mb-2">Semana 4</h3>
                  <p className="text-sm text-[var(--app-foreground-muted)]">
                    Proyecto final y certificación
                  </p>
                </div>
              </div>
            </section>

            {/* Community Stats */}
            <section className="bg-[var(--app-card-bg)] backdrop-blur-md rounded-2xl shadow-lg p-6 sm:p-8 border border-[var(--app-card-border)]">
              <h2 className="text-2xl font-bold text-[var(--app-foreground)] mb-6 text-center">
                Únete a la Comunidad
              </h2>
              
              <div className="grid grid-cols-3 gap-4 sm:gap-8 text-center">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-[var(--app-accent)]">25+</div>
                  <div className="text-sm text-[var(--app-foreground-muted)]">Estudiantes</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-[var(--app-accent)]">4 Sem</div>
                  <div className="text-sm text-[var(--app-foreground-muted)]">Duración</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-[var(--app-accent)]">NFT</div>
                  <div className="text-sm text-[var(--app-foreground-muted)]">Certificado</div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'dashboard' && studentInfo && (
          <StudentDashboard />
        )}

        {activeTab === 'admin' && Boolean(isOwner) && (
          <AdminPanel />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--app-card-border)] bg-[var(--app-card-bg)] backdrop-blur-md mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-[var(--app-foreground)] mb-2">
              🌞 Proof of Verano En Cadena
            </h3>
            <p className="text-sm text-[var(--app-foreground-muted)] mb-4">
              Aprende Web3, obtén tu certificación NFT, construye el futuro
            </p>
            <div className="flex justify-center items-center gap-4 text-xs text-[var(--app-foreground-muted)]">
              <span>Built on Base</span>
              <span>•</span>
              <span>Powered by kiwik</span>
              <span>•</span>
              <span>Open Source</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}