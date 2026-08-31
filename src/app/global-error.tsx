'use client';
import type { JSX } from 'react';

const GlobalError = ({ error }: { error: Error }): JSX.Element => {
  console.error(error);
  return (
    <html lang="nl">
      <body>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'system-ui, sans-serif',
            textAlign: 'center',
            padding: '2rem',
          }}
        >
          <div>
            <h1 style={{ fontSize: '3rem', margin: 0 }}>500</h1>
            <p style={{ fontSize: '1.2rem' }}>Er ging iets mis</p>
            <p>
              Probeer het later opnieuw of ga terug naar de{' '}
              <a href="/" style={{ color: 'inherit' }}>
                homepagina
              </a>
              .
            </p>
          </div>
        </div>
      </body>
    </html>
  );
};
export default GlobalError;
