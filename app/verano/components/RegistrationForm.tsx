'use client';

import { useState } from 'react';
import { useProofOfVerano } from '@/lib/hooks/useProofOfVerano';

export function RegistrationForm() {
  const { signUp, isLoading, signUpError, isSignUpSuccess } = useProofOfVerano();
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegister = async () => {
    setIsRegistering(true);
    try {
      await signUp();
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsRegistering(false);
    }
  };

  if (isSignUpSuccess) {
    return (
      <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6 text-center">
        <span className="text-4xl mb-4 block">🎉</span>
        <h3 className="text-xl font-bold text-green-800 mb-2">
          ¡Registro exitoso!
        </h3>
        <p className="text-green-700">
          Ya eres parte del bootcamp Proof of Verano
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl p-8 border-2 border-orange-300">
      <h3 className="text-xl font-bold text-orange-900 mb-4 text-center">
        Únete al Bootcamp
      </h3>
      
      <div className="space-y-4">
        <div className="bg-white/50 rounded-lg p-4 border border-orange-200">
          <p className="text-sm text-gray-700">
            Al registrarte, te comprometes a:
          </p>
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            <li>• Participar activamente en las sesiones</li>
            <li>• Completar los ejercicios asignados</li>
            <li>• Colaborar con tus compañeros</li>
          </ul>
        </div>

        {signUpError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-700">
              Error: {signUpError.message || 'No se pudo completar el registro'}
            </p>
          </div>
        )}

        <button
          onClick={handleRegister}
          disabled={isLoading || isRegistering}
          className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
            isLoading || isRegistering
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-orange-500 text-white hover:bg-orange-600 hover:shadow-lg'
          }`}
        >
          {isLoading || isRegistering ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin">⏳</span>
              Registrando...
            </span>
          ) : (
            'Registrarme Ahora'
          )}
        </button>

        <p className="text-xs text-center text-gray-600">
          El registro es gratuito y se realiza on-chain
        </p>
      </div>
    </div>
  );
}