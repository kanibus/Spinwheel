import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { ChallengeResult } from '@/hooks/useSpinWheel';

interface SavedChallengesProps {
  items: ChallengeResult[];
  onDelete: (id: string) => void;
}

export const SavedChallenges = ({ items, onDelete }: SavedChallengesProps) => {
  const handleCopy = async (phrase: string) => {
    try {
      await navigator.clipboard.writeText(phrase);
    } catch (error) {
      console.error(error);
    }
  };

  if (!items.length) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 3,
          background: 'rgba(255,255,255,0.03)',
          borderRadius: 2,
          border: '1px dashed rgba(255,255,255,0.15)',
          textAlign: 'center',
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Saved challenge library
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          Pin your favorite spins here to reference later or share with the team.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        background: 'rgba(255,255,255,0.04)',
        borderRadius: 2,
        border: '1px solid rgba(255,255,255,0.08)',
        maxHeight: 360,
        overflow: 'auto',
      }}
    >
      <Stack spacing={2}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Saved challenge library
        </Typography>
        <List dense disablePadding>
          {items.map((item) => (
            <ListItem key={item.id} alignItems="flex-start" sx={{ mb: 1 }}>
              <ListItemText
                primary={
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {item.phrase}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.6 }}>
                      {new Date(item.createdAt).toLocaleString()}
                    </Typography>
                  </Box>
                }
              />
              <ListItemSecondaryAction>
                <Tooltip title="Copy phrase">
                  <IconButton edge="end" onClick={() => handleCopy(item.phrase)}>
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Remove from library">
                  <IconButton edge="end" onClick={() => onDelete(item.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Stack>
    </Paper>
  );
};
