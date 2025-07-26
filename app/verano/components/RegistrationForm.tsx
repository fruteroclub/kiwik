'use client';

import { useState } from 'react';
import { useProofOfVerano } from '@/lib/hooks/useProofOfVerano';

type RegistrationStep = 'info' | 'commitment' | 'register' | 'success';

interface ProgressIndicatorProps {
  currentStep: RegistrationStep;
}

function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  const steps = [
    { id: 'info', label: 'Info', icon: '📋' },
    { id: 'commitment', label: 'Compromiso', icon: '🤝' },
    { id: 'register', label: 'Registro', icon: '📝' },
  ];

  const stepOrder = ['info', 'commitment', 'register'];
  const currentIndex = stepOrder.indexOf(currentStep);

  return (
    <div className="flex items-center justify-center mb-6">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-semibold transition-all ${
            index <= currentIndex 
              ? 'bg-[var(--app-accent)] text-white' 
              : 'bg-[var(--app-gray)] text-[var(--app-foreground-muted)]'
          }`}>
            <span className="text-lg">{step.icon}</span>
          </div>
          <div className="ml-2 text-xs text-[var(--app-foreground-muted)] hidden sm:block">{step.label}</div>
          {index < steps.length - 1 && (
            <div className={`w-8 h-0.5 mx-2 ${
              index < currentIndex ? 'bg-[var(--app-accent)]' : 'bg-[var(--app-gray)]'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
}

export function RegistrationForm() {
  const { signUp, signUpError, isSignUpSuccess } = useProofOfVerano();
  const [currentStep, setCurrentStep] = useState<RegistrationStep>('info');
  const [email, setEmail] = useState('');
  const [hasCommitted, setHasCommitted] = useState(false);

  const handleRegister = async () => {
    setCurrentStep('register');
    try {
      await signUp();
      setCurrentStep('success');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  if (isSignUpSuccess || currentStep === 'success') {
    return (
      <div className="bg-[var(--app-success-bg)] border-2 border-[var(--app-success-border)] rounded-xl p-8 text-center">
        <span className="text-6xl mb-4 block">🎉</span>
        <h3 className="text-2xl font-bold text-[var(--app-success)] mb-4">
          ¡Registro exitoso!
        </h3>
        <p className="text-[var(--app-success-muted)] mb-6">
          Ya eres parte del bootcamp Proof of Verano
        </p>
        
        <div className="bg-[var(--app-card-bg)] rounded-lg p-4 mb-6 border border-[var(--app-card-border)]">
          <h4 className="font-semibold text-[var(--app-success)] mb-2">Próximos pasos:</h4>
          <div className="text-sm text-[var(--app-success-muted)] space-y-1">
            <p>✅ Únete al Discord de la comunidad</p>
            <p>✅ Revisa el calendario de sesiones</p>
            <p>✅ Prepárate para la primera clase</p>
          </div>
        </div>

        <button
          onClick={() => window.location.href = '/verano'}
          className="bg-[var(--app-success)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[var(--app-success-hover)] transition-all"
        >
          Ver mi Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl p-8 border-2 border-[var(--app-accent)] max-w-md mx-auto">
      <h3 className="text-xl font-bold text-[var(--app-foreground)] mb-6 text-center">
        Únete al Bootcamp
      </h3>
      
      <ProgressIndicator currentStep={currentStep} />
      
      <div className="space-y-6">
        {currentStep === 'info' && (
          <div className="space-y-4">
            <div className="bg-[var(--app-card-bg)] rounded-lg p-5 border border-[var(--app-card-border)]">
              <h4 className="font-semibold text-[var(--app-foreground)] mb-3">Qué aprenderás:</h4>
              <div className="space-y-2 text-sm text-[var(--app-foreground-muted)]">
                <div className="flex items-center gap-2">
                  <span className="text-[var(--app-accent)]">🔗</span>
                  <span>Fundamentos de blockchain y Web3</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[var(--app-accent)]">⚡</span>
                  <span>Smart contracts con Solidity</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[var(--app-accent)]">🎨</span>
                  <span>DApps con React y ethers.js</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[var(--app-accent)]">🏆</span>
                  <span>Certificación NFT en Base</span>
                </div>
              </div>
            </div>

            <div className="bg-[var(--app-card-bg)] rounded-lg p-4 border border-[var(--app-card-border)]">
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <div className="font-bold text-[var(--app-accent)]">4 Semanas</div>
                  <div className="text-[var(--app-foreground-muted)]">Duración</div>
                </div>
                <div>
                  <div className="font-bold text-[var(--app-accent)]">100% Gratis</div>
                  <div className="text-[var(--app-foreground-muted)]">Sin costo</div>
                </div>
                <div>
                  <div className="font-bold text-[var(--app-accent)]">NFT</div>
                  <div className="text-[var(--app-foreground-muted)]">Certificado</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentStep('commitment')}
              className="w-full py-3 px-6 bg-[var(--app-accent)] text-white rounded-lg font-semibold hover:bg-[var(--app-accent-hover)] transition-all"
            >
              Continuar
            </button>
          </div>
        )}

        {currentStep === 'commitment' && (
          <div className="space-y-4">
            <div className="bg-[var(--app-card-bg)] rounded-lg p-5 border border-[var(--app-card-border)]">
              <h4 className="font-semibold text-[var(--app-foreground)] mb-3">Mi compromiso:</h4>
              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasCommitted}
                    onChange={(e) => setHasCommitted(e.target.checked)}
                    className="mt-1 w-4 h-4 text-[var(--app-accent)] rounded border-2 border-[var(--app-card-border)] focus:ring-[var(--app-accent)]"
                  />
                  <div className="text-sm text-[var(--app-foreground-muted)]">
                    <strong>Acepto comprometerme a:</strong>
                    <ul className="mt-2 space-y-1 ml-4">
                      <li>• Participar activamente en las 4 semanas del bootcamp</li>
                      <li>• Completar todos los ejercicios y proyectos asignados</li>
                      <li>• Colaborar con mis compañeros y mantener un ambiente positivo</li>
                      <li>• Dedicar al menos 10 horas semanales al programa</li>
                    </ul>
                  </div>
                </label>
              </div>
            </div>

            <div className="bg-[var(--app-card-bg)] rounded-lg p-4 border border-[var(--app-card-border)]">
              <label className="block text-sm font-medium text-[var(--app-foreground)] mb-2">
                Email (opcional - para notificaciones)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full px-3 py-2 border border-[var(--app-card-border)] rounded-md text-sm bg-[var(--app-background)] text-[var(--app-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)] focus:border-[var(--app-accent)]"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setCurrentStep('info')}
                className="flex-1 py-3 px-6 border border-[var(--app-accent)] text-[var(--app-accent)] rounded-lg font-semibold hover:bg-[var(--app-accent-light)] transition-all"
              >
                Volver
              </button>
              <button
                onClick={handleRegister}
                disabled={!hasCommitted}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                  hasCommitted
                    ? 'bg-[var(--app-accent)] text-white hover:bg-[var(--app-accent-hover)]'
                    : 'bg-[var(--app-gray)] text-[var(--app-foreground-muted)] cursor-not-allowed'
                }`}
              >
                Registrarme
              </button>
            </div>
          </div>
        )}

        {currentStep === 'register' && (
          <div className="space-y-4">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--app-accent-light)] rounded-full mb-4">
                <span className="text-2xl animate-spin">⏳</span>
              </div>
              <h4 className="text-lg font-semibold text-[var(--app-accent)] mb-2">
                Procesando registro...
              </h4>
              <p className="text-sm text-[var(--app-foreground-muted)]">
                Estamos registrando tu participación en la blockchain. 
                Este proceso puede tomar unos segundos.
              </p>
            </div>
            
            {signUpError && (
              <div className="bg-[var(--app-error-bg)] border border-[var(--app-error-border)] rounded-lg p-4">
                <p className="text-sm text-[var(--app-error)] text-center">
                  Error: {signUpError.message || 'No se pudo completar el registro'}
                </p>
                <button
                  onClick={() => setCurrentStep('commitment')}
                  className="w-full mt-3 py-2 px-4 text-sm bg-[var(--app-error)] text-white rounded-md hover:bg-[var(--app-error-hover)] transition-all"
                >
                  Intentar de nuevo
                </button>
              </div>
            )}
          </div>
        )}

        <p className="text-xs text-center text-[var(--app-foreground-muted)]">
          El registro es gratuito y se realiza on-chain en Base
        </p>
      </div>
    </div>
  );
}