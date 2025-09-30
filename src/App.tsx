import { useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Fade,
  Grid,
  FormControlLabel,
  Stack,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';

import { CategoryControls } from '@/components/CategoryControls';
import { HistoryPanel } from '@/components/HistoryPanel';
import { PhraseCard } from '@/components/PhraseCard';
import { SavedChallenges } from '@/components/SavedChallenges';
import { SpinWheel } from '@/components/SpinWheel';
import { useSpinWheel } from '@/hooks/useSpinWheel';

const SpinButton = ({ onClick, disabled }: { onClick: () => void; disabled: boolean }) => (
  <Button
    size="large"
    variant="contained"
    color="primary"
    startIcon={<CasinoIcon />}
    onClick={onClick}
    disabled={disabled}
    sx={{
      px: 4,
      py: 1.5,
      fontSize: '1.1rem',
      letterSpacing: 0.6,
      borderRadius: 999,
      textTransform: 'uppercase',
      backgroundImage: 'linear-gradient(135deg, #7c6cff, #5de2e7)',
      boxShadow: '0 18px 40px rgba(124,108,255,0.4)',
      transition: 'transform 0.25s ease, box-shadow 0.25s ease',
      animation: disabled ? 'none' : 'pulseGlow 3s ease-in-out infinite',
      '&:hover': {
        transform: 'translateY(-3px) scale(1.01)',
        boxShadow: '0 22px 48px rgba(93,226,231,0.35)',
        backgroundImage: 'linear-gradient(135deg, #8a79ff, #7cfff0)',
      },
    }}
  >
    Spin Challenge
  </Button>
);

const modeCopy: Record<'serious' | 'wild', string> = {
  serious: 'Purposeful & Brief-Ready',
  wild: 'Playful & Unfiltered',
};

const modeHelper: Record<'serious' | 'wild', string> = {
  serious: 'Dial in grounded, pitch-ready concepts.',
  wild: 'Let chaos guide the brainstorm warm-up.',
};

const App = () => {
  const store = useSpinWheel();
  const {
    spinning,
    spin,
    mode,
    setMode,
    lastResult,
    history,
    savedChallenges,
    deleteSavedChallenge,
    aiEnabled,
    aiAvailable,
    setAiEnabled,
    aiStatus,
    aiError,
  } = store;
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleSpin = async () => {
    if (isSpinning) {
      return;
    }
    setIsSpinning(true);
    const additionalTurns = 4 + Math.random() * 3;
    const finalRotation = rotation + additionalTurns * 360 + Math.random() * 360;
    setRotation(finalRotation);
    await spin();
    setIsSpinning(false);
  };

  const disabled = useMemo(
    () =>
      spinning ||
      isSpinning ||
      store.categories.every((category) => !category.active),
    [spinning, isSpinning, store.categories],
  );

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 4, md: 6 },
        position: 'relative',
        '&:before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 20% 20%, rgba(124,108,255,0.18), transparent 55%)',
          pointerEvents: 'none',
          filter: 'blur(0)',
          zIndex: -1,
        },
      }}
    >
      <Stack spacing={6}>
        <Box textAlign="center">
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              letterSpacing: -1,
              mb: 1,
            }}
          >
            Silverside Challenge Wheel
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.75, maxWidth: 720, mx: 'auto' }}>
            Spin to blend preloaded inspiration, AI-flavored twists, and your own team prompts into a bite-sized creative brief for short-form storytelling.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6} lg={5}>
            <Stack spacing={3}>
              <SpinWheel store={store} rotation={rotation} />
              <Fade in={aiStatus === 'loading' && aiEnabled} unmountOnExit>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                    color: 'secondary.light',
                    fontWeight: 500,
                  }}
                >
                  <CircularProgress size={18} color="inherit" thickness={5} />
                  Summoning ChatGPT magic...
                </Box>
              </Fade>
              <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                <ToggleButtonGroup
                  value={mode}
                  exclusive
                  onChange={(_event, value) => value && setMode(value)}
                  color="secondary"
                  size="small"
                  sx={{ background: 'rgba(255,255,255,0.06)', borderRadius: 999 }}
                >
                  <ToggleButton value="serious">Serious</ToggleButton>
                  <ToggleButton value="wild">Wild</ToggleButton>
                </ToggleButtonGroup>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  {modeCopy[mode]}
                </Typography>
              </Stack>
              <Typography variant="caption" sx={{ textAlign: 'center', opacity: 0.6 }}>
                {modeHelper[mode]}
              </Typography>
              <Tooltip
                title={
                  aiAvailable
                    ? 'Use ChatGPT to craft the full challenge sentence from the selected words.'
                    : 'Provide VITE_OPENAI_API_KEY to enable ChatGPT powered phrases.'
                }
                arrow
              >
                <Box display="flex" justifyContent="center">
                  <FormControlLabel
                    control={
                      <Switch
                        color="secondary"
                        checked={aiEnabled}
                        onChange={(event) => setAiEnabled(event.target.checked)}
                        disabled={!aiAvailable}
                      />
                    }
                    label="ChatGPT phrase builder"
                  />
                </Box>
              </Tooltip>
              <Box textAlign="center">
                <SpinButton onClick={handleSpin} disabled={disabled} />
              </Box>
              <Fade in={Boolean(aiError) && aiEnabled} unmountOnExit>
                <Alert severity="warning" sx={{ mx: 'auto', maxWidth: 420 }}>
                  {aiError}
                </Alert>
              </Fade>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6} lg={7}>
            <Stack spacing={3}>
              <PhraseCard
                result={lastResult}
                onSave={store.saveCurrentResult}
                aiStatus={aiStatus}
                aiEnabled={aiEnabled}
                aiError={aiError}
              />
              <SavedChallenges items={savedChallenges} onDelete={deleteSavedChallenge} />
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)' }} />

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <CategoryControls store={store} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HistoryPanel items={history} onClear={store.clearHistory} />
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
};

export default App;
