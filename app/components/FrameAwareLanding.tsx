"use client";

import React, { useState, useEffect } from 'react';
import { useFarcasterFrame } from '@/app/hooks/useFarcasterFrame';
import { FrameHeader } from './FrameHeader';
import { FrameActions } from './FrameActions';
import { FrameFallback, LoadingFallback, ConnectionFallback } from './FrameFallback';
import { isFrameEnvironment } from '@/app/lib/minikit-config';
import {
  NavigationHeader,
  HeroSection,
  BenefitsSection,
  MarketplaceSection,
  AISection,
  HowItWorksSection,
  FAQSection,
  ProofOfVeranoSection,
  FinalCTASection,
  Footer,
} from './LandingComponents';

/**
 * Frame-aware landing page that adapts based on environment
 */
export function FrameAwareLanding() {
  const { frameInfo, frameActions } = useFarcasterFrame();
  const [isLoading, setIsLoading] = useState(true);
  const [showFrameContent, setShowFrameContent] = useState(false);
  const [forceShowLanding, setForceShowLanding] = useState(false);

  // Check environment and frame readiness
  useEffect(() => {
    const checkEnvironment = async () => {
      const isFrame = isFrameEnvironment();
      
      // Check if user wants to see Farcaster access instructions
      const urlParams = new URLSearchParams(window.location.search);
      const showFrameInfo = urlParams.get('view') === 'frame-info';
      
      setShowFrameContent(isFrame && !showFrameInfo);
      setForceShowLanding(!isFrame && !showFrameInfo);
      
      // Only simulate loading for actual frame environments with Farcaster context
      if (isFrame && !showFrameInfo && (document.referrer.includes('farcaster') || window.navigator.userAgent.includes('Farcaster'))) {
        setTimeout(() => setIsLoading(false), 1000);
      } else {
        // For regular browsers and non-Farcaster contexts, show immediately
        setIsLoading(false);
      }
    };

    checkEnvironment();
  }, []);

  // Show loading state during initialization
  if (isLoading) {
    return <LoadingFallback />;
  }

  // Show connection error if frame failed to connect
  if (showFrameContent && frameInfo.connectionStatus === 'failed') {
    return (
      <ConnectionFallback
        onRetry={frameActions.refreshFrame}
        error="Failed to connect to Farcaster frame"
      />
    );
  }

  // Frame environment - show optimized content
  if (showFrameContent) {
    return (
      <div className="min-h-screen bg-[var(--app-background)] text-[var(--app-foreground)]">
        <FrameHeader variant="minimal" />
        
        <main className="pt-20 pb-8">
          {/* Compact Hero Section for Frame */}
          <section className="px-4 py-8">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-3xl lg:text-4xl font-bold text-[var(--app-foreground)] mb-4">
                Turn Ideas Into{" "}
                <span className="text-[var(--app-accent)]">Reality</span>
              </h1>
              <p className="text-lg text-[var(--app-foreground-muted)] mb-6">
                Community-driven platform for Web3 innovation through microfunding on Base
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
                <button className="bg-[var(--app-accent)] text-white px-6 py-3 rounded-lg font-medium hover:bg-[var(--app-accent-hover)] transition-colors">
                  Start Building
                </button>
                <button className="border border-[var(--app-accent)] text-[var(--app-accent)] px-6 py-3 rounded-lg font-medium hover:bg-[var(--app-accent-light)] transition-colors">
                  Explore Projects
                </button>
              </div>
              
              <div className="flex justify-center mb-8">
                <a 
                  href="/verano" 
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:from-orange-600 hover:to-yellow-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  🌞 Proof of Verano - Bootcamp Web3
                </a>
              </div>

              <div className="flex justify-center gap-8 text-center mb-8">
                <div>
                  <div className="text-xl font-bold text-[var(--app-foreground)]">1.2K+</div>
                  <div className="text-sm text-[var(--app-foreground-muted)]">Projects</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-[var(--app-foreground)]">5.8K+</div>
                  <div className="text-sm text-[var(--app-foreground-muted)]">Creators</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-[var(--app-foreground)]">$2.1M+</div>
                  <div className="text-sm text-[var(--app-foreground-muted)]">Funded</div>
                </div>
              </div>
            </div>
          </section>

          {/* Frame Actions Section */}
          <section className="px-4 py-6">
            <div className="max-w-md mx-auto">
              <FrameActions variant="full" />
            </div>
          </section>

          {/* Quick Features for Frame */}
          <section className="px-4 py-6">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-center text-[var(--app-foreground)] mb-6">
                Why Choose kiwik?
              </h2>
              
              <div className="grid gap-4">
                <a href="/verano" className="block">
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-lg border-2 border-orange-300 hover:border-orange-400 transition-all hover:shadow-lg">
                    <div className="text-2xl">🌞</div>
                    <div>
                      <h3 className="font-semibold text-orange-800">NEW: Proof of Verano Bootcamp</h3>
                      <p className="text-sm text-orange-700">Learn Web3 & earn your NFT certificate</p>
                    </div>
                  </div>
                </a>
                
                <div className="flex items-center gap-3 p-4 bg-[var(--app-card-bg)] rounded-lg border border-[var(--app-card-border)]">
                  <div className="text-2xl">👥</div>
                  <div>
                    <h3 className="font-semibold text-[var(--app-foreground)]">Community-Driven</h3>
                    <p className="text-sm text-[var(--app-foreground-muted)]">Vibrant ecosystem of creators and supporters</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-[var(--app-card-bg)] rounded-lg border border-[var(--app-card-border)]">
                  <div className="text-2xl">💰</div>
                  <div>
                    <h3 className="font-semibold text-[var(--app-foreground)]">Microfunding Made Easy</h3>
                    <p className="text-sm text-[var(--app-foreground-muted)]">Small contributions, big impact</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-[var(--app-card-bg)] rounded-lg border border-[var(--app-card-border)]">
                  <div className="text-2xl">🔷</div>
                  <div>
                    <h3 className="font-semibold text-[var(--app-foreground)]">Built on Base</h3>
                    <p className="text-sm text-[var(--app-foreground-muted)]">Fast, secure blockchain infrastructure</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sample Projects in Frame */}
          <section className="px-4 py-6">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-center text-[var(--app-foreground)] mb-6">
                Featured Projects
              </h2>
              
              <div className="grid gap-4">
                <div className="bg-[var(--app-card-bg)] rounded-lg p-4 border border-[var(--app-card-border)]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-2xl">🏦</div>
                    <div>
                      <h3 className="font-semibold text-[var(--app-foreground)]">DeFi Dashboard</h3>
                      <p className="text-sm text-[var(--app-foreground-muted)]">by @alice</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-bold text-[var(--app-accent)]">$4,520</span>
                    <span className="text-sm text-[var(--app-foreground-muted)]">92% funded</span>
                  </div>
                  <div className="w-full bg-[var(--app-gray)] rounded-full h-2">
                    <div className="bg-[var(--app-accent)] h-2 rounded-full w-[92%]"></div>
                  </div>
                </div>

                <div className="bg-[var(--app-card-bg)] rounded-lg p-4 border border-[var(--app-card-border)]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-2xl">🎨</div>
                    <div>
                      <h3 className="font-semibold text-[var(--app-foreground)]">NFT Marketplace</h3>
                      <p className="text-sm text-[var(--app-foreground-muted)]">by @bob</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-bold text-[var(--app-accent)]">$8,150</span>
                    <span className="text-sm text-[var(--app-foreground-muted)]">67% funded</span>
                  </div>
                  <div className="w-full bg-[var(--app-gray)] rounded-full h-2">
                    <div className="bg-[var(--app-accent)] h-2 rounded-full w-[67%]"></div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-6">
                <button className="bg-[var(--app-accent)] text-white px-6 py-2 rounded-lg font-medium hover:bg-[var(--app-accent-hover)] transition-colors">
                  View All Projects
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }

  // Non-frame environment - show full landing page or Farcaster instructions
  if (forceShowLanding) {
    // Show full landing page (default for regular website)
    return (
      <div className="min-h-screen bg-[var(--app-background)] text-[var(--app-foreground)]">
        <NavigationHeader />
        
        <main>
          <HeroSection />
          <BenefitsSection />
          <ProofOfVeranoSection />
          <MarketplaceSection />
          <AISection />
          <HowItWorksSection />
          <FAQSection />
          <FinalCTASection />
        </main>
        
        <Footer />
      </div>
    );
  }

  // Show Farcaster access instructions (when ?view=frame-info)
  return <FrameFallback />;
}