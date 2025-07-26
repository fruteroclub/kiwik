'use client';

import { useProofOfVerano } from '@/lib/hooks/useProofOfVerano';
import { NFTDisplay } from './NFTDisplay';

export function StudentDashboard() {
  const { studentInfo, isLoading } = useProofOfVerano();

  if (!studentInfo) {
    return (
      <div className="bg-[var(--app-card-bg)] rounded-xl shadow-lg p-8 text-center border border-[var(--app-card-border)]">
        <p className="text-[var(--app-foreground-muted)]">Cargando información del estudiante...</p>
      </div>
    );
  }

  const progressPercentage = studentInfo.completed 
    ? 100 
    : Math.min(95, Number(studentInfo.commitmentScore) * 10);

  return (
    <div className="space-y-6">
      {/* Status Card */}
      <div className="bg-[var(--app-card-bg)] rounded-xl shadow-lg p-8 border border-[var(--app-card-border)]">
        <h2 className="text-2xl font-bold text-[var(--app-foreground)] mb-6">
          Mi Progreso en el Bootcamp
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Progress Section */}
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-[var(--app-foreground-muted)]">
                  Progreso General
                </span>
                <span className="text-sm font-bold text-[var(--app-accent)]">
                  {progressPercentage}%
                </span>
              </div>
              <div className="w-full bg-[var(--app-gray)] rounded-full h-3">
                <div
                  className="bg-[var(--app-accent)] h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-[var(--app-accent-light)] rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📋</span>
                  <span className="font-medium text-[var(--app-foreground)]">Estado</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  studentInfo.completed 
                    ? 'bg-[var(--app-success-bg)] text-[var(--app-success)]' 
                    : 'bg-[var(--app-accent-light)] text-[var(--app-accent)]'
                }`}>
                  {studentInfo.completed ? 'Completado' : 'En Progreso'}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-[var(--app-accent-light)] rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⭐</span>
                  <span className="font-medium text-[var(--app-foreground)]">Score de Compromiso</span>
                </div>
                <span className="text-2xl font-bold text-[var(--app-accent)]">
                  {studentInfo.commitmentScore.toString()}/10
                </span>
              </div>
            </div>
          </div>

          {/* Deliverables Section */}
          <div>
            <h3 className="font-semibold text-[var(--app-foreground)] mb-4">
              Entregables ({studentInfo.deliverables.length})
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {studentInfo.deliverables.length > 0 ? (
                studentInfo.deliverables.map((deliverable, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-[var(--app-success-bg)] rounded-lg border border-[var(--app-success-border)]"
                  >
                    <span className="text-[var(--app-success)] mt-0.5">✓</span>
                    <span className="text-sm text-[var(--app-foreground-muted)] flex-1">
                      {deliverable}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-[var(--app-foreground-muted)] text-sm italic">
                  Aún no hay entregables registrados
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* NFT Section */}
      {studentInfo.completed && (
        <div className="bg-[var(--app-success-bg)] rounded-xl shadow-lg p-8 border border-[var(--app-success-border)]">
          <h3 className="text-xl font-bold text-[var(--app-success)] mb-6 text-center">
            🏆 ¡Felicitaciones! Has completado el bootcamp
          </h3>
          
          <div className="max-w-md mx-auto">
            <NFTDisplay 
              studentAddress={studentInfo.signedUp ? '0x...' : undefined}
            />
            
            {!isLoading && (
              <div className="mt-6 text-center">
                <p className="text-[var(--app-success-muted)] text-sm">
                  Tu NFT certificado está listo para ser reclamado
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Motivation Message */}
      {!studentInfo.completed && (
        <div className="bg-[var(--app-accent-light)] rounded-xl p-6 border border-[var(--app-card-border)]">
          <div className="flex items-start gap-4">
            <span className="text-3xl">💪</span>
            <div>
              <h4 className="font-semibold text-[var(--app-accent)] mb-1">
                ¡Sigue así!
              </h4>
              <p className="text-[var(--app-accent)] text-sm">
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