'use client';

import { useSearchParams } from 'next/navigation';
import { getProviders, signIn } from 'next-auth/react';
import { Suspense, useEffect, useRef, useState, type JSX } from 'react';
import letMeInGif from '@/assets/img/let-me-in.gif';
import BlockContainer from '@/components/atoms/BlockContainer';
import Button from '@/components/atoms/Button';
import Loader from '@/components/atoms/Loader';
import Hero from '@/components/organisms/Hero';

interface Provider {
  id: string;
  name: string;
}

const EASTER_EGG_SUBTITLE = 'Let me in, let me iiiiinnn!';

const SignInContent = (): JSX.Element => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl');

  const [providers, setProviders] = useState<Record<string, Provider> | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    fetchProviders();
  }, []);

  const [showGif, setShowGif] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const gifUrl = typeof letMeInGif === 'string' ? letMeInGif : letMeInGif.src;
  const isInsideRef = useRef(false);

  useEffect(() => {
    // Check whether a given (x, y) point (mouse or touch) falls within the
    // subtitle's text bounds — not its full block-level box.
    const isOverText = (x: number, y: number): boolean => {
      const subtitle = document.querySelector<HTMLElement>('.hero__subtitle--alt');
      if (!subtitle || !subtitle.firstChild) return false;

      const range = document.createRange();
      range.selectNodeContents(subtitle);
      const textRect = range.getBoundingClientRect();

      return x >= textRect.left && x <= textRect.right && y >= textRect.top && y <= textRect.bottom;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isOverText(e.clientX, e.clientY)) {
        isInsideRef.current = true;
        setShowGif(true);
        setCursorPos({ x: e.clientX, y: e.clientY });
      } else if (isInsideRef.current) {
        isInsideRef.current = false;
        setShowGif(false);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch || !isOverText(touch.clientX, touch.clientY)) return;
      isInsideRef.current = true;
      setShowGif(true);
      setCursorPos({ x: touch.clientX, y: touch.clientY });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isInsideRef.current) return;
      const touch = e.touches[0];
      if (!touch) return;
      setCursorPos({ x: touch.clientX, y: touch.clientY });
    };

    const handleTouchEnd = () => {
      if (!isInsideRef.current) return;
      isInsideRef.current = false;
      setShowGif(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const popover = showGif && (
    <div
      style={{
        position: 'fixed',
        left: cursorPos.x + 16,
        top: cursorPos.y + 16,
        zIndex: 9999,
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      <img src={gifUrl} alt="" style={{ width: 200, height: 'auto', borderRadius: 8 }} />
    </div>
  );

  if (!providers) {
    return (
      <div className="sl-layout">
        <BlockContainer slug="signin-hero">
          <Hero title="Inloggen" subtitle={EASTER_EGG_SUBTITLE} variant="simple" />
        </BlockContainer>

        <BlockContainer slug="signin-loading">
          <Loader size="sm" modLabelVisible />
        </BlockContainer>

        {popover}
      </div>
    );
  }

  return (
    <div className="sl-layout">
      <BlockContainer slug="signin-hero">
        <Hero title="Inloggen" subtitle={EASTER_EGG_SUBTITLE} variant="simple" />
      </BlockContainer>

      <BlockContainer slug="signin-providers">
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <Button
              label={`Log in met ${provider.name}`}
              onClick={() => signIn(provider.id, { callbackUrl: callbackUrl || '/dashboard' })}
            />
          </div>
        ))}
      </BlockContainer>

      {popover}
    </div>
  );
};

const SignInPage = (): JSX.Element => (
  <Suspense>
    <SignInContent />
  </Suspense>
);

export default SignInPage;
