import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import { ChallengeResult } from '@/hooks/useSpinWheel';

interface HistoryPanelProps {
  items: ChallengeResult[];
  onClear: () => void;
}

export const HistoryPanel = ({ items, onClear }: HistoryPanelProps) => {
  if (!items.length) {
    return null;
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        background: 'rgba(255,255,255,0.03)',
        borderRadius: 2,
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <Stack spacing={2}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Recent spins
          </Typography>
          <Button size="small" color="secondary" onClick={onClear}>
            Clear history
          </Button>
        </Box>
        <List dense>
          {items.map((item) => (
            <ListItem key={item.id} sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <ListItemText
                primary={
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {item.phrase}
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" sx={{ opacity: 0.6 }}>
                    {new Date(item.createdAt).toLocaleTimeString()}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Stack>
    </Paper>
  );
};
