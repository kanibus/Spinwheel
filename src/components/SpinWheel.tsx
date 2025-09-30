import { useEffect, useMemo } from 'react';
import { Box, Typography } from '@mui/material';

import { SpinWheelStore } from '@/hooks/useSpinWheel';

const SEGMENT_COLORS = [
  '#7C6CFF',
  '#FFB347',
  '#5DE2E7',
  '#FF5D8F',
  '#8DFF8B',
  '#F9F871',
  '#F368E0',
];

interface SpinWheelProps {
  store: Pick<SpinWheelStore, 'categories' | 'spinning'>;
  rotation: number;
}

export const SpinWheel = ({ store, rotation }: SpinWheelProps) => {
  const { categories } = store;

  const segments = useMemo(
    () =>
      categories.map((category, index) => ({
        label: category.label,
        selection: category.selection,
        color: SEGMENT_COLORS[index % SEGMENT_COLORS.length],
        active: category.active,
      })),
    [categories],
  );

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--wheel-rotation', `${rotation}deg`);
  }, [rotation]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: { xs: 260, sm: 320, md: 360 },
        height: { xs: 260, sm: 320, md: 360 },
        mx: 'auto',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: () =>
            `conic-gradient(${segments
              .map((segment) => segment.color)
              .join(', ')})`,
          transition: 'transform 1.4s cubic-bezier(0.23, 1, 0.32, 1)',
          transformOrigin: 'center',
          transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
          boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
          border: '8px solid rgba(255,255,255,0.07)',
        }}
      >
        {segments.map((segment, index) => {
          const angle = (360 / segments.length) * index + 360 / segments.length / 2;
          return (
            <Box
              key={segment.label}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                transformOrigin: 'center',
                textAlign: 'center',
                width: '50%',
                pointerEvents: 'none',
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  textTransform: 'uppercase',
                  letterSpacing: 1.2,
                  fontSize: { xs: '0.65rem', sm: '0.75rem' },
                  opacity: segment.active ? 0.95 : 0.4,
                }}
              >
                {segment.label}
              </Typography>
              {segment.selection && (
                <Typography
                  variant="body2"
                  sx={{
                    mt: 1,
                    fontWeight: 600,
                    maxWidth: 120,
                    mx: 'auto',
                    opacity: segment.active ? 1 : 0.35,
                  }}
                >
                  {segment.selection}
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '36%',
          height: '36%',
          borderRadius: '50%',
          background: 'rgba(13, 12, 29, 0.9)',
          border: '2px solid rgba(255,255,255,0.18)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: 0.5,
          px: 2,
        }}
      >
        <Typography variant="caption" sx={{ letterSpacing: 2, opacity: 0.7 }}>
          SILVERSIDE
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          Challenge Wheel
        </Typography>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: -12,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '18px solid transparent',
          borderRight: '18px solid transparent',
          borderBottom: '28px solid #FFE066',
          filter: 'drop-shadow(0px 2px 6px rgba(0,0,0,0.45))',
          zIndex: 2,
        }}
      />
    </Box>
  );
};
