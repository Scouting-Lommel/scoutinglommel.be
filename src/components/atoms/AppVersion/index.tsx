'use client';

import { useEffect } from 'react';

let hasLogged = false;

const AppVersion = (): null => {
  useEffect(() => {
    if (hasLogged) return;

    hasLogged = true;

    const version = process.env.NEXT_PUBLIC_APP_VERSION ?? 'unknown';
    const environment = process.env.NEXT_PUBLIC_APP_ENV ?? 'development';

    console.info(`[scoutinglommel.be] v${version} · ${environment}`);
  }, []);

  return null;
};

export default AppVersion;
