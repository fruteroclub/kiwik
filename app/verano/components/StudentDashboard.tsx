'use client';

import { useProofOfVerano } from '@/lib/hooks/useProofOfVerano';
import { NFTDisplay } from './NFTDisplay';

export function StudentDashboard() {
  const { studentInfo, awardNFT, isLoading } = useProofOfVerano();

  if (!studentInfo) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <p className="text-gray-600">Cargando información del estudiante...</p>
      </div>
    );
  }

  const progressPercentage = studentInfo.completed 
    ? 100 
    : Math.min(95, Number(studentInfo.commitmentScore) * 10);

  return (
    <div className="space-y-6">
      {/* Status Card */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-orange-200">
        <h2 className="text-2xl font-bold text-orange-900 mb-6">
          Mi Progreso en el Bootcamp
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Progress Section */}
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Progreso General
                </span>
                <span className="text-sm font-bold text-orange-600">
                  {progressPercentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-orange-400 to-yellow-400 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📋</span>
                  <span className="font-medium text-gray-800">Estado</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  studentInfo.completed 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {studentInfo.completed ? 'Completado' : 'En Progreso'}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⭐</span>
                  <span className="font-medium text-gray-800">Score de Compromiso</span>
                </div>
                <span className="text-2xl font-bold text-orange-600">
                  {studentInfo.commitmentScore.toString()}/10
                </span>
              </div>
            </div>
          </div>

          {/* Deliverables Section */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">
              Entregables ({studentInfo.deliverables.length})
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {studentInfo.deliverables.length > 0 ? (
                studentInfo.deliverables.map((deliverable, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200"
                  >
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span className="text-sm text-gray-700 flex-1">
                      {deliverable}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm italic">
                  Aún no hay entregables registrados
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* NFT Section */}
      {studentInfo.completed && (
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl shadow-lg p-8 border border-orange-200">
          <h3 className="text-xl font-bold text-orange-900 mb-6 text-center">
            🏆 ¡Felicitaciones! Has completado el bootcamp
          </h3>
          
          <div className="max-w-md mx-auto">
            <NFTDisplay 
              studentAddress={studentInfo.signedUp ? '0x...' : undefined}
            />
            
            {!isLoading && (
              <div className="mt-6 text-center">
                <p className="text-gray-600 text-sm">
                  Tu NFT certificado está listo para ser reclamado
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Motivation Message */}
      {!studentInfo.completed && (
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-start gap-4">
            <span className="text-3xl">💪</span>
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">
                ¡Sigue así!
              </h4>
              <p className="text-blue-700 text-sm">
                Estás en el camino correcto. Continúa participando activamente 
                y completando tus entregables para obtener tu certificación NFT.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}