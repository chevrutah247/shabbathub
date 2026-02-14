import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'ShabbatHub — Крупнейший архив материалов к Шаббату';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '20px',
              background: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
            }}
          >
            📚
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '64px', fontWeight: 'bold', color: 'white', display: 'flex' }}>
              Shabbat<span style={{ color: '#fbbf24' }}>Hub</span>
            </div>
          </div>
        </div>
        <div
          style={{
            fontSize: '28px',
            color: 'rgba(255,255,255,0.85)',
            maxWidth: '700px',
            textAlign: 'center',
            lineHeight: 1.4,
          }}
        >
          Крупнейший архив материалов к Шаббату
        </div>
        <div
          style={{
            display: 'flex',
            gap: '40px',
            marginTop: '40px',
          }}
        >
          {[
            ['4000+', 'материалов'],
            ['40+', 'публикаций'],
            ['3', 'языка'],
          ].map(([num, label]) => (
            <div
              key={label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '16px 32px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '16px',
              }}
            >
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#fbbf24' }}>{num}</div>
              <div style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
