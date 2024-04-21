import LightTooltip from '@/app/_common/components/LightToolTip';
import AddIcon from '@mui/icons-material/Add';
import {
  ClickAwayListener,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useMemo, useState } from 'react';

export const ShortCut = () => {
  const [open, setOpen] = useState(false);

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const shortCuts = useMemo(() => {
    return [
      { title: 'Customers', onClick: () => {} },
      { title: 'Teams', onClick: () => {} },
      { title: 'Products', onClick: () => {} },
    ];
  }, []);

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <div>
        <LightTooltip
          open={open}
          onClose={handleTooltipClose}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          placement="bottom-end"
          arrow
          title={
            <List sx={{ width: '232px' }}>
              {shortCuts.map((item, index) => (
                <ListItem
                  key={index}
                  onClick={item.onClick}
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  <ListItemText
                    primary={item.title}
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      color: (theme) => theme.palette.text.secondary,
                    }}
                  />
                </ListItem>
              ))}
            </List>
          }
        >
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
            onClick={handleTooltipOpen}
          >
            <AddIcon fontSize="inherit" />
          </IconButton>
        </LightTooltip>
      </div>
    </ClickAwayListener>
  );
};
