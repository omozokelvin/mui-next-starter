import MuiDrawer from '@mui/material/Drawer';

import { CSSObject, styled, Theme } from '@mui/material/styles';

import Logo from '@/app/_common/components/Logo';
import { settingsActions } from '@/app/_common/redux/slices/settingsSlice';
import { dispatch, RootState, useSelector } from '@/app/_common/redux/store';
import { DRAWER_WIDTH } from '@/app/admin/_common/constants';
import DashboardNavList from '@/app/admin/_common/DashboardNavList';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, IconButton } from '@mui/material';

const openedMixin = (theme: Theme): CSSObject => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: theme.palette.background.default,
  '::-webkit-scrollbar': {
    width: '4px',
  },
  '::-webkit-scrollbar-thumb': {
    background: theme.palette.grey[400],
    // borderRadius: '100px',
  },
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor: theme.palette.background.default,
  '::-webkit-scrollbar': {
    width: '4px',
  },
  '::-webkit-scrollbar-thumb': {
    background: theme.palette.grey[400],
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const SideDrawer = () => {
  const { miniNav } = useSelector((state: RootState) => state.settingsSlice);
  const open = !miniNav;

  const toggleDrawer = () => {
    dispatch(settingsActions.toggleMiniNav());
  };

  return (
    // make drawer overlay

    <Drawer
      variant={'permanent'}
      open={open}
      // sx={{ border: '1px solid red', overflowY: 'auto' }}
      // anchor={'left'}
      // ModalProps={{
      //   keepMounted: false,
      // }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={open ? 2.5 : 2}
        py={2}
      >
        {open && <Logo />}

        <IconButton
          onClick={toggleDrawer}
          sx={{
            backgroundColor: (theme) => theme.palette.primary.main,
            color: (theme) => theme.palette.common.white,
            alignSelf: 'center',
            fontSize: '0.7rem',
            width: '25px',
            height: '25px',
            '&:hover': {
              backgroundColor: (theme) => theme.palette.primary.main,
            },
          }}
        >
          {open ? (
            <ChevronLeftIcon sx={{ width: '18px' }} />
          ) : (
            <ChevronRightIcon sx={{ width: '18px' }} />
          )}
        </IconButton>
      </Box>

      <DashboardNavList open={open} />
    </Drawer>
  );
};

export default SideDrawer;
