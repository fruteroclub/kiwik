'use client';

import { useState, useEffect } from 'react';
import { Address } from 'viem';

interface RegisteredStudent {
  id: string;
  username?: string;
  displayName?: string;
  farcasterId?: string;
  farcasterUsername?: string;
  avatarUrl?: string;
  appWallet?: string;
  bootcampCompleted: boolean;
  completionDate?: string;
  commitmentScore?: number;
  nftTokenId?: string;
  powerBadge: boolean;
  followerCount?: number;
  followingCount?: number;
  createdAt: string;
  updatedAt: string;
}

export default function BootcampDashboard() {
  const [students, setStudents] = useState<RegisteredStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'completed' | 'registered'>('all');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/users/list');
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setStudents(data.users || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar estudiantes');
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(student => {
    switch (filter) {
      case 'completed':
        return student.bootcampCompleted;
      case 'registered':
        return !student.bootcampCompleted;
      default:
        return true;
    }
  });

  const completedCount = students.filter(s => s.bootcampCompleted).length;
  const registeredCount = students.length - completedCount;

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--app-background)] p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--app-accent)] mx-auto"></div>
            <p className="mt-4 text-[var(--app-foreground-muted)]">Cargando estudiantes...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--app-background)] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[var(--app-foreground)] mb-2">
            Dashboard Bootcamp
          </h1>
          <p className="text-[var(--app-foreground-muted)]">
            Estudiantes registrados en Proof of Verano
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[var(--app-card-bg)] rounded-xl p-6 border border-[var(--app-card-border)]">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-[var(--app-accent)] bg-opacity-10">
                <svg className="w-6 h-6 text-[var(--app-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-[var(--app-foreground-muted)]">Total Registrados</p>
                <p className="text-2xl font-bold text-[var(--app-foreground)]">{students.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-[var(--app-card-bg)] rounded-xl p-6 border border-[var(--app-card-border)]">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-500 bg-opacity-10">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-[var(--app-foreground-muted)]">Bootcamp Completado</p>
                <p className="text-2xl font-bold text-green-500">{completedCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-[var(--app-card-bg)] rounded-xl p-6 border border-[var(--app-card-border)]">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-500 bg-opacity-10">
                <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-[var(--app-foreground-muted)]">En Progreso</p>
                <p className="text-2xl font-bold text-yellow-500">{registeredCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-[var(--app-accent)] text-white'
                  : 'bg-[var(--app-card-bg)] text-[var(--app-foreground)] border border-[var(--app-card-border)] hover:bg-[var(--app-accent)] hover:text-white'
              }`}
            >
              Todos ({students.length})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'completed'
                  ? 'bg-green-500 text-white'
                  : 'bg-[var(--app-card-bg)] text-[var(--app-foreground)] border border-[var(--app-card-border)] hover:bg-green-500 hover:text-white'
              }`}
            >
              Completados ({completedCount})
            </button>
            <button
              onClick={() => setFilter('registered')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'registered'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-[var(--app-card-bg)] text-[var(--app-foreground)] border border-[var(--app-card-border)] hover:bg-yellow-500 hover:text-white'
              }`}
            >
              En Progreso ({registeredCount})
            </button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
                <button
                  onClick={fetchStudents}
                  className="mt-2 text-sm text-red-600 hover:text-red-500 underline"
                >
                  Intentar de nuevo
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Students Grid */}
        {filteredStudents.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-[var(--app-foreground-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-[var(--app-foreground)]">No hay estudiantes</h3>
            <p className="mt-1 text-sm text-[var(--app-foreground-muted)]">
              {filter === 'all' ? 'Aún no hay estudiantes registrados.' : `No hay estudiantes en la categoría "${filter}".`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className="bg-[var(--app-card-bg)] rounded-xl p-6 border border-[var(--app-card-border)] hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {student.avatarUrl ? (
                      <img
                        className="h-12 w-12 rounded-full object-cover"
                        src={student.avatarUrl}
                        alt={student.displayName || student.username || 'Avatar'}
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-[var(--app-accent)] bg-opacity-10 flex items-center justify-center">
                        <svg className="h-6 w-6 text-[var(--app-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm font-medium text-[var(--app-foreground)] truncate">
                        {student.displayName || student.username || 'Usuario Anónimo'}
                      </h3>
                      {student.powerBadge && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                          ⚡
                        </span>
                      )}
                    </div>
                    
                    {student.farcasterUsername && (
                      <p className="text-sm text-[var(--app-foreground-muted)]">@{student.farcasterUsername}</p>
                    )}
                    
                    {student.appWallet && (
                      <p className="text-xs text-[var(--app-foreground-muted)] font-mono mt-1">
                        {student.appWallet.slice(0, 6)}...{student.appWallet.slice(-4)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--app-foreground-muted)]">Estado:</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      student.bootcampCompleted
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {student.bootcampCompleted ? '✅ Completado' : '🔄 En Progreso'}
                    </span>
                  </div>

                  {student.commitmentScore !== null && student.commitmentScore !== undefined && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[var(--app-foreground-muted)]">Score:</span>
                      <span className="text-sm font-medium text-[var(--app-foreground)]">
                        {student.commitmentScore}/10
                      </span>
                    </div>
                  )}

                  {student.followerCount !== null && student.followerCount !== undefined && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[var(--app-foreground-muted)]">Seguidores:</span>
                      <span className="text-sm font-medium text-[var(--app-foreground)]">
                        {student.followerCount.toLocaleString()}
                      </span>
                    </div>
                  )}

                  {student.completionDate && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[var(--app-foreground-muted)]">Completado:</span>
                      <span className="text-sm font-medium text-[var(--app-foreground)]">
                        {new Date(student.completionDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}

                  {student.nftTokenId && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[var(--app-foreground-muted)]">NFT:</span>
                      <span className="text-xs font-mono text-[var(--app-accent)]">
                        {student.nftTokenId.slice(0, 8)}...
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-[var(--app-card-border)]">
                  <p className="text-xs text-[var(--app-foreground-muted)]">
                    Registrado: {new Date(student.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}