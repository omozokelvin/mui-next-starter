'use client';
import { withAuth } from '@/app/_common/HOC/withAuth';
import { useBreakPoints } from '@/app/_common/hooks/useBreakPoints';
import { settingsActions } from '@/app/_common/redux/slices/settingsSlice';
import { RootState, dispatch } from '@/app/_common/redux/store';
import MobileBottomBar from '@/app/admin/_common/MobileBottomBar';
import SideDrawer from '@/app/admin/_common/SideDrawer';
import { TopBar } from '@/app/admin/_common/TopBar';
import { Box, CssBaseline, Stack } from '@mui/material';
import { ReactNode, useState } from 'react';
import { useSelector } from 'react-redux';

type Props = {
  children: ReactNode;
};
function AdminLayout(props: Props) {
  const { medium: mediumDownwards } = useBreakPoints('down');
  const [hideDrawer, setHideDrawer] = useState(mediumDownwards);

  const { miniNav } = useSelector((state: RootState) => state.settingsSlice);

  const toggleDrawer = () => {
    if (!miniNav) {
      return;
    }

    dispatch(settingsActions.toggleMiniNav());
  };

  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: (theme) => theme.palette.background.default,
        overflowX: 'auto',
      }}
    >
      <CssBaseline />

      {(!mediumDownwards || !hideDrawer) && <SideDrawer />}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Stack
            sx={{
              minWidth: '100%',
              minHeight: '100vh',
              // backgroundColor: (theme) => theme.palette.background.paper,
            }}
          >
            <TopBar />

            <Box pt={4} p={3}>
              {props.children}
            </Box>
          </Stack>
        </Stack>
      </Box>

      {mediumDownwards && (
        <MobileBottomBar
          onOpenSidebar={() => {
            setHideDrawer((hidden) => !hidden);
            toggleDrawer();
          }}
        />
      )}
    </Box>
  );
}

export default withAuth(AdminLayout);
