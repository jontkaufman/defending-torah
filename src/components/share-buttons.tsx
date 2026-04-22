'use client';

import { useState, useEffect } from 'react';

interface ShareButtonsProps {
  url: string;
  title: string;
  className?: string;
}

type Platform = 'facebook' | 'twitter' | 'email' | 'copy';

const icons = {
  facebook: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  twitter: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  email: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  ),
  copy: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
    </svg>
  ),
  check: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
    </svg>
  ),
};

function getShareUrl(platform: Platform, url: string, title: string): string | null {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  switch (platform) {
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    case 'twitter':
      return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
    case 'email':
      return `mailto:?subject=${encodedTitle}&body=${encodedUrl}`;
    case 'copy':
      return null; // Handled by clipboard API
    default:
      return null;
  }
}

export function ShareButtons({ url, title, className = '' }: ShareButtonsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = (platform: Platform) => {
    const shareUrl = getShareUrl(platform, url, title);
    if (shareUrl) {
      const win = window.open(shareUrl, '_blank', 'width=600,height=400');
      if (win) win.opener = null; // Prevent access to parent window (tabnabbing protection)
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setShowCopied(true);
      setCopyError(false);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      setCopyError(true);
      setTimeout(() => setCopyError(false), 2000);
    }
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex flex-col gap-3 transition-opacity duration-300 max-md:bottom-4 max-md:right-4 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } ${className}`}
      aria-hidden={!isVisible}
    >
      <button
        onClick={() => handleShare('facebook')}
        aria-label="Share on Facebook"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-lg transition-all hover:scale-105 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:ring-offset-2 max-md:h-11 max-md:w-11"
      >
        {icons.facebook}
      </button>

      <button
        onClick={() => handleShare('twitter')}
        aria-label="Share on Twitter"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white shadow-lg transition-all hover:scale-105 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 max-md:h-11 max-md:w-11"
      >
        {icons.twitter}
      </button>

      <button
        onClick={() => handleShare('email')}
        aria-label="Share via Email"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#666666] text-white shadow-lg transition-all hover:scale-105 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#666666] focus:ring-offset-2 max-md:h-11 max-md:w-11"
      >
        {icons.email}
      </button>

      <button
        onClick={handleCopy}
        aria-label={showCopied ? 'Link copied!' : copyError ? 'Failed to copy' : 'Copy link'}
        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#10B981] text-white shadow-lg transition-all hover:scale-105 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:ring-offset-2 max-md:h-11 max-md:w-11"
      >
        {showCopied ? icons.check : icons.copy}
        {copyError ? (
          <span className="absolute -top-10 right-0 whitespace-nowrap rounded bg-red-600 px-2 py-1 text-xs text-white">
            Failed to copy
          </span>
        ) : showCopied && (
          <span className="absolute -top-10 right-0 whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white">
            Copied!
          </span>
        )}
      </button>
    </div>
  );
}
