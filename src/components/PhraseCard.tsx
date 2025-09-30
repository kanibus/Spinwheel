import { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Paper,
  Snackbar,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';

import { ChallengeResult } from '@/hooks/useSpinWheel';

interface PhraseCardProps {
  result: ChallengeResult | null;
  onSave: () => boolean;
}

export const PhraseCard = ({ result, onSave }: PhraseCardProps) => {
  const [snackbar, setSnackbar] = useState<string | null>(null);

  if (!result) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 4,
          background: 'rgba(255,255,255,0.05)',
          textAlign: 'center',
          borderRadius: 3,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }} gutterBottom>
          Spin the wheel to generate your first Silverside challenge!
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          Each spin blends default inspirations with your custom ideas to unlock a mini creative brief.
        </Typography>
      </Paper>
    );
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.phrase);
      setSnackbar('Copied challenge phrase to clipboard');
    } catch (error) {
      setSnackbar('Unable to copy automatically. Try selecting the text instead.');
    }
  };

  const handleSave = () => {
    const saved = onSave();
    setSnackbar(saved ? 'Added to the team challenge library' : 'This challenge is already saved.');
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, sm: 4 },
        background: 'linear-gradient(135deg, rgba(124,108,255,0.18), rgba(20,19,45,0.95))',
        borderRadius: 3,
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <Stack spacing={2.5}>
        <Box>
          <Typography variant="overline" sx={{ letterSpacing: 2 }}>
            Mode
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {result.mode === 'serious' ? 'Grounded Creative Sprint' : 'Wild Card Chaos'}
          </Typography>
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
          {result.phrase}
        </Typography>
        <Divider light sx={{ borderColor: 'rgba(255,255,255,0.12)' }} />
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {Object.entries(result.selections).map(([category, word]) => (
            <Chip key={category} label={`${category}: ${word}`} color="secondary" variant="outlined" />
          ))}
        </Stack>
        <Stack direction="row" spacing={1}>
          <Button variant="contained" color="secondary" onClick={handleSave} startIcon={<FavoriteIcon />}>
            Save to library
          </Button>
          <Tooltip title="Copy phrase to clipboard">
            <span>
              <IconButton color="inherit" onClick={handleCopy}>
                <ContentCopyIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Stack>
      </Stack>
      <Snackbar
        open={Boolean(snackbar)}
        autoHideDuration={3200}
        onClose={() => setSnackbar(null)}
        message={snackbar ?? ''}
      />
    </Paper>
  );
};
