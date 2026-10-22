'use client';

import { useEffect } from 'react';

let hasLogged = false;

const AppVersion = (): null => {
  useEffect(() => {
    if (hasLogged) return;

    hasLogged = true;

    const version = process.env.NEXT_PUBLIC_APP_VERSION ?? 'unknown';
    const commit = process.env.NEXT_PUBLIC_APP_COMMIT ?? 'dev';
    const environment = process.env.NEXT_PUBLIC_APP_ENV ?? 'development';

    console.info(`[scoutinglommel.be] v${version} · ${commit} · ${environment}`);
  }, []);

  return null;
};

export default AppVersion;
