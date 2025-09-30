import { useMemo, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

import { CategoryId } from '@/data/wordBanks';
import { SpinWheelStore } from '@/hooks/useSpinWheel';
import { generateIdeaSeeds } from '@/utils/suggestions';

interface CategoryControlsProps {
  store: Pick<
    SpinWheelStore,
    'categories' | 'toggleCategory' | 'addCustomWord' | 'removeCustomWord' | 'resetCustomWords'
  >;
}

export const CategoryControls = ({ store }: CategoryControlsProps) => {
  const { categories, toggleCategory, addCustomWord, removeCustomWord, resetCustomWords } = store;
  const [drafts, setDrafts] = useState<Record<CategoryId, string>>(() => ({} as Record<CategoryId, string>));
  const [suggestions, setSuggestions] = useState<Record<CategoryId, string[]>>(
    () => ({} as Record<CategoryId, string[]>),
  );

  const handleDraftChange = (id: CategoryId, value: string) => {
    setDrafts((prev) => ({ ...prev, [id]: value }));
  };

  const handleAdd = (id: CategoryId) => {
    const value = drafts[id];
    if (!value?.trim()) {
      return;
    }
    addCustomWord(id, value);
    setDrafts((prev) => ({ ...prev, [id]: '' }));
  };

  const handleAiSuggest = (id: CategoryId) => {
    const generated = generateIdeaSeeds(id);
    setSuggestions((prev) => ({ ...prev, [id]: generated }));
  };

  const activeCount = useMemo(() => categories.filter((category) => category.active).length, [categories]);

  return (
    <Stack spacing={2}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600, letterSpacing: 0.6 }}>
        Categories ({activeCount} active)
      </Typography>
      {categories.map((category) => (
        <Accordion
          key={category.id}
          disableGutters
          sx={{
            backgroundColor: 'rgba(255,255,255,0.04)',
            borderRadius: 2,
            overflow: 'hidden',
            '&:before': { display: 'none' },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'secondary.main' }} />}>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ width: '100%' }}>
              <Switch
                edge="start"
                checked={category.active}
                onChange={() => toggleCategory(category.id)}
                inputProps={{ 'aria-label': `Toggle ${category.label}` }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {category.label}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  {category.description}
                </Typography>
              </Box>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={1.5}>
              <Typography variant="caption" sx={{ opacity: 0.6 }}>
                Default picks: {category.defaultWords.join(', ')}
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                <TextField
                  size="small"
                  fullWidth
                  label={`Custom ${category.label}`}
                  placeholder={category.placeholder}
                  value={drafts[category.id] ?? ''}
                  onChange={(event) => handleDraftChange(category.id, event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      handleAdd(category.id);
                    }
                  }}
                />
                <Button variant="contained" onClick={() => handleAdd(category.id)}>
                  Add
                </Button>
                <Tooltip title="Generate AI-flavored ideas">
                  <span>
                    <IconButton color="secondary" onClick={() => handleAiSuggest(category.id)}>
                      <AutoAwesomeIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </Stack>
              {suggestions[category.id]?.length ? (
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {suggestions[category.id].map((suggestion) => (
                    <Chip
                      key={suggestion}
                      label={suggestion}
                      color="secondary"
                      variant="outlined"
                      onClick={() => addCustomWord(category.id, suggestion)}
                      sx={{ cursor: 'pointer' }}
                    />
                  ))}
                </Stack>
              ) : null}
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {category.customWords.map((word) => (
                  <Chip
                    key={word}
                    label={word}
                    onDelete={() => removeCustomWord(category.id, word)}
                    color="secondary"
                    variant="outlined"
                  />
                ))}
              </Stack>
              {category.customWords.length > 0 && (
                <Button
                  variant="text"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                  onClick={() => resetCustomWords(category.id)}
                  sx={{ alignSelf: 'flex-start' }}
                >
                  Clear custom ideas
                </Button>
              )}
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}
    </Stack>
  );
};
