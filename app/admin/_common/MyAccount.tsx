import {
  Avatar,
  ClickAwayListener,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useState } from 'react';

import LightTooltip from '@/app/_common/components/LightToolTip';
import { useAuth } from '@/app/_common/contexts/AuthContext';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useRouter } from 'next/navigation';

export const MyAccount = () => {
  const router = useRouter();
  const { logout, profile } = useAuth();

  const [openAccountMenu, setOpenAccountMenu] = useState(false);

  // const [showDialog, setShowDialog] = useState(false);

  const handleTooltipOpen = () => {
    setOpenAccountMenu(true);
  };

  const handleTooltipClose = () => {
    setOpenAccountMenu(false);
  };

  return (
    <>
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <div>
          <LightTooltip
            open={openAccountMenu}
            onClose={handleTooltipClose}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            placement="bottom-end"
            arrow
            title={
              <List>
                <ListItem
                  secondaryAction={
                    <ArrowForwardIosOutlinedIcon
                      sx={{
                        color: (theme) => theme.palette.text.secondary,
                        fontSize: '0.875rem',
                      }}
                    />
                  }
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  <ListItemText
                    primary="My Account"
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      color: (theme) => theme.palette.text.secondary,
                      pr: 10,
                    }}
                    onClick={() => router.push('/dashboard/account')}
                  />
                </ListItem>

                <ListItem
                  secondaryAction={
                    <LogoutOutlinedIcon
                      sx={{
                        color: (theme) => theme.palette.error.main,
                        fontSize: '0.875rem',
                      }}
                    />
                  }
                  sx={{
                    cursor: 'pointer',
                  }}
                  onClick={() => logout()}
                >
                  <ListItemText
                    primary="Logout"
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      color: (theme) => theme.palette.error.main,
                      pr: 10,
                    }}
                  />
                </ListItem>
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
              <Avatar
                alt={profile?.fullName}
                sx={{
                  width: 30,
                  height: 30,
                  backgroundColor: 'inherit',
                  color: (theme) => theme.palette.text.secondary,
                }}
              />
            </IconButton>
          </LightTooltip>
        </div>
      </ClickAwayListener>
    </>
  );
};
