import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { Badge, IconButton } from '@mui/material';

export default function Notification() {
  return (
    <IconButton
      size="small"
      sx={{
        ml: 2,
        boxShadow: (theme) => theme.shadows[1],
        backgroundColor: (theme) => theme.palette.common.white,
        '&:hover': {
          backgroundColor: (theme) => theme.palette.common.white,
        },
      }}
    >
      <Badge color="error" variant="dot">
        <NotificationsNoneOutlinedIcon fontSize="inherit" />
      </Badge>
    </IconButton>
  );
}
