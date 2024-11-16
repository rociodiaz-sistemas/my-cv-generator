import { AutoFixHigh } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";

export const EnhanceButton = () => (
  <Stack direction="column">
    <Typography variant="body2">Enhance</Typography>
    <IconButton>
      <AutoFixHigh fontSize="large" />
    </IconButton>
  </Stack>
);
