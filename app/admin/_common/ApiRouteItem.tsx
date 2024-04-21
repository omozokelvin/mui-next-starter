import { ApiRoute } from '@/app/_common/_types/Authentication';
import {
  Checkbox,
  Chip,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

type ApiRouteItemProps = ApiRoute & {
  onClick: (item: ApiRoute) => void;
  checked: boolean;
  disabled: boolean;
};

export function ApiRouteItem(props: ApiRouteItemProps) {
  return (
    <ListItem
      sx={{
        cursor: 'pointer',
        pb: 1,
        mb: 1,
        backgroundColor: (theme) => theme.palette.background.paper,
        borderRadius: '8px',
        border: '1px solid #D9DBE1',
        '&:hover': {
          backgroundColor: (theme) => theme.palette.action.hover,
        },
      }}
      onClick={() => props.onClick({ method: props.method, path: props.path })}
    >
      <ListItemButton
        role={undefined}
        dense
        disableRipple
        disableTouchRipple
        sx={{
          backgroundColor: 'unset',
          '&:hover': {
            backgroundColor: 'unset',
          },
        }}
        disabled={props.disabled}
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            disableRipple
            checked={props.checked}
            disabled={props.disabled}
          />
        </ListItemIcon>

        <ListItemText
          primary={props.path}
          secondary={
            <Chip
              label={props.method}
              color={
                ['post', 'patch'].includes(props.method) ? 'info' : 'default'
              }
              sx={{ fontWeight: 500 }}
            />
          }
          primaryTypographyProps={{
            fontWeight: 500,
            pb: 0.5,
          }}
        />
      </ListItemButton>
    </ListItem>
  );
}
