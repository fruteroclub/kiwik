'use client';

import { useState, useEffect } from 'react';
import { NeynarAPIClient } from '@neynar/nodejs-sdk';

interface FarcasterUser {
  fid: number;
  username: string;
  display_name: string;
  pfp_url: string;
  follower_count: number;
  following_count: number;
  bio?: string;
}

export default function FarcasterPage() {
  const [user, setUser] = useState<FarcasterUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState('');

  const fetchUserProfile = async (searchUsername: string) => {
    if (!searchUsername.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // Using fetch API to call our API route
      const response = await fetch(`/api/farcaster/user?username=${encodeURIComponent(searchUsername)}`);
      
      if (!response.ok) {
        throw new Error('Usuario no encontrado');
      }

      const userData = await response.json();
      setUser(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar el perfil');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUserProfile(username);
  };

  return (
    <div className="min-h-screen bg-[var(--app-background)] text-[var(--app-foreground)] p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-[var(--app-accent)]">
            Explorador de Perfiles Farcaster
          </h1>
          <p className="text-[var(--app-foreground-muted)]">
            Busca y visualiza perfiles de usuarios de Farcaster
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa el username (ej: dwr, vitalik.eth)"
              className="flex-1 px-4 py-2 bg-[var(--app-card-bg)] border border-[var(--app-card-border)] rounded-lg text-[var(--app-foreground)] placeholder-[var(--app-foreground-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
            />
            <button
              type="submit"
              disabled={loading || !username.trim()}
              className="px-6 py-2 bg-[var(--app-accent)] text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Buscando...' : 'Buscar'}
            </button>
          </div>
        </form>

        {/* Error State */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Profile Display */}
        {user && (
          <div className="bg-[var(--app-card-bg)] border border-[var(--app-card-border)] rounded-xl p-6">
            <div className="flex items-start gap-6">
              {/* Profile Picture */}
              <div className="flex-shrink-0">
                <img
                  src={user.pfp_url}
                  alt={`${user.display_name} profile picture`}
                  className="w-24 h-24 rounded-full border-2 border-[var(--app-accent)]"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/icon.png'; // Fallback to app icon
                  }}
                />
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-[var(--app-foreground)] mb-1">
                    {user.display_name}
                  </h2>
                  <p className="text-[var(--app-accent)] text-lg">
                    @{user.username}
                  </p>
                  <p className="text-sm text-[var(--app-foreground-muted)] mt-1">
                    FID: {user.fid}
                  </p>
                </div>

                {/* Bio */}
                {user.bio && (
                  <div className="mb-4">
                    <p className="text-[var(--app-foreground)] leading-relaxed">
                      {user.bio}
                    </p>
                  </div>
                )}

                {/* Stats */}
                <div className="flex gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[var(--app-accent)]">
                      {user.following_count.toLocaleString()}
                    </div>
                    <div className="text-sm text-[var(--app-foreground-muted)]">
                      Siguiendo
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[var(--app-accent)]">
                      {user.follower_count.toLocaleString()}
                    </div>
                    <div className="text-sm text-[var(--app-foreground-muted)]">
                      Seguidores
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!user && !loading && !error && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-[var(--app-foreground)] mb-2">
              Busca un perfil de Farcaster
            </h3>
            <p className="text-[var(--app-foreground-muted)]">
              Ingresa un username para ver la información del perfil
            </p>
          </div>
        )}
      </div>
    </div>
  );
}