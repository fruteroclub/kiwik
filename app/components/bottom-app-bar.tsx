'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAccount } from 'wagmi';

export function BottomAppBar() {
  const pathname = usePathname();
  const { isConnected, address } = useAccount();

  const navItems = [
    {
      href: '/',
      label: 'Inicio',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      href: '/bootcamp',
      label: 'Dashboard',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      href: '/verano',
      label: 'Verano',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      href: '/farcaster',
      label: 'Farcaster',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      href: '#wallet',
      label: isConnected ? 'Wallet' : 'Conectar',
      icon: isConnected ? (
        <div className="relative">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
      ) : (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[var(--app-card-bg)] border-t border-[var(--app-card-border)] md:hidden z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const isWallet = item.href === '#wallet';
          
          if (isWallet) {
            return (
              <button
                key={item.href}
                onClick={() => {
                  // This will trigger the wallet connection modal
                  // The actual wallet connection logic should be handled by the OnchainKit provider
                  const walletButton = document.querySelector('[data-testid="connect-wallet"]') as HTMLButtonElement;
                  if (walletButton) {
                    walletButton.click();
                  }
                }}
                className="flex flex-col items-center justify-center flex-1 h-full px-2 py-2 text-xs"
              >
                <div className={`${isConnected ? 'text-green-500' : 'text-[var(--app-foreground-muted)]'}`}>
                  {item.icon}
                </div>
                <span className={`mt-1 ${isConnected ? 'text-green-500' : 'text-[var(--app-foreground-muted)]'}`}>
                  {isConnected ? `${address?.slice(0, 4)}...` : item.label}
                </span>
              </button>
            );
          }
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full px-2 py-2 text-xs transition-colors ${
                isActive
                  ? 'text-[var(--app-accent)]'
                  : 'text-[var(--app-foreground-muted)] hover:text-[var(--app-foreground)]'
              }`}
            >
              <div>{item.icon}</div>
              <span className="mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}