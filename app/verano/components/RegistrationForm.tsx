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
              ? 'bg-orange-500 text-white' 
              : 'bg-gray-200 text-gray-500'
          }`}>
            <span className="text-lg">{step.icon}</span>
          </div>
          <div className="ml-2 text-xs text-gray-600 hidden sm:block">{step.label}</div>
          {index < steps.length - 1 && (
            <div className={`w-8 h-0.5 mx-2 ${
              index < currentIndex ? 'bg-orange-500' : 'bg-gray-200'
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
      <div className="bg-green-50 border-2 border-green-300 rounded-xl p-8 text-center">
        <span className="text-6xl mb-4 block">🎉</span>
        <h3 className="text-2xl font-bold text-green-800 mb-4">
          ¡Registro exitoso!
        </h3>
        <p className="text-green-700 mb-6">
          Ya eres parte del bootcamp Proof of Verano
        </p>
        
        <div className="bg-white/70 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-green-800 mb-2">Próximos pasos:</h4>
          <div className="text-sm text-green-700 space-y-1">
            <p>✅ Únete al Discord de la comunidad</p>
            <p>✅ Revisa el calendario de sesiones</p>
            <p>✅ Prepárate para la primera clase</p>
          </div>
        </div>

        <button
          onClick={() => window.location.href = '/verano'}
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all"
        >
          Ver mi Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl p-8 border-2 border-orange-300 max-w-md mx-auto">
      <h3 className="text-xl font-bold text-orange-900 mb-6 text-center">
        Únete al Bootcamp
      </h3>
      
      <ProgressIndicator currentStep={currentStep} />
      
      <div className="space-y-6">
        {currentStep === 'info' && (
          <div className="space-y-4">
            <div className="bg-white/70 rounded-lg p-5 border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-3">Qué aprenderás:</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="text-orange-500">🔗</span>
                  <span>Fundamentos de blockchain y Web3</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-500">⚡</span>
                  <span>Smart contracts con Solidity</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-500">🎨</span>
                  <span>DApps con React y ethers.js</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-500">🏆</span>
                  <span>Certificación NFT en Base</span>
                </div>
              </div>
            </div>

            <div className="bg-white/70 rounded-lg p-4 border border-orange-200">
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <div className="font-bold text-orange-800">4 Semanas</div>
                  <div className="text-gray-600">Duración</div>
                </div>
                <div>
                  <div className="font-bold text-orange-800">100% Gratis</div>
                  <div className="text-gray-600">Sin costo</div>
                </div>
                <div>
                  <div className="font-bold text-orange-800">NFT</div>
                  <div className="text-gray-600">Certificado</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentStep('commitment')}
              className="w-full py-3 px-6 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-all"
            >
              Continuar
            </button>
          </div>
        )}

        {currentStep === 'commitment' && (
          <div className="space-y-4">
            <div className="bg-white/70 rounded-lg p-5 border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-3">Mi compromiso:</h4>
              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasCommitted}
                    onChange={(e) => setHasCommitted(e.target.checked)}
                    className="mt-1 w-4 h-4 text-orange-500 rounded border-2 border-orange-300 focus:ring-orange-500"
                  />
                  <div className="text-sm text-gray-700">
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

            <div className="bg-white/70 rounded-lg p-4 border border-orange-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email (opcional - para notificaciones)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full px-3 py-2 border border-orange-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setCurrentStep('info')}
                className="flex-1 py-3 px-6 border border-orange-500 text-orange-500 rounded-lg font-semibold hover:bg-orange-50 transition-all"
              >
                Volver
              </button>
              <button
                onClick={handleRegister}
                disabled={!hasCommitted}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                  hasCommitted
                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
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
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <span className="text-2xl animate-spin">⏳</span>
              </div>
              <h4 className="text-lg font-semibold text-orange-800 mb-2">
                Procesando registro...
              </h4>
              <p className="text-sm text-gray-600">
                Estamos registrando tu participación en la blockchain. 
                Este proceso puede tomar unos segundos.
              </p>
            </div>
            
            {signUpError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-700 text-center">
                  Error: {signUpError.message || 'No se pudo completar el registro'}
                </p>
                <button
                  onClick={() => setCurrentStep('commitment')}
                  className="w-full mt-3 py-2 px-4 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-all"
                >
                  Intentar de nuevo
                </button>
              </div>
            )}
          </div>
        )}

        <p className="text-xs text-center text-gray-600">
          El registro es gratuito y se realiza on-chain en Base
        </p>
      </div>
    </div>
  );
}