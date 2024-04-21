'use client';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
} from '@mui/material';

import CustomLink from '@/app/_common/components/CustomLink';
import Logo from '@/app/_common/components/Logo';
import { MenuIcon } from '@/app/_common/components/MenuIcon';
import { ROUTES } from '@/app/_common/constants/routes';
import { useBreakPoints } from '@/app/_common/hooks/useBreakPoints';
import { useState } from 'react';
import MobileMenuDrawer from './MobileMenuDrawer';
import NavigationLinks from './NavigationLinks';
import { navigationLinks } from './constants';

export function Header() {
  const { medium: mediumDownwards } = useBreakPoints('down');

  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <>
      <MobileMenuDrawer
        open={showDrawer && mediumDownwards}
        onClose={() => setShowDrawer(false)}
        setShowDrawer={setShowDrawer}
      />

      <AppBar
        position="sticky"
        sx={{
          backgroundColor: 'white',
          boxShadow: 'none',
          p: 0,
        }}
      >
        <Container>
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              '&.MuiToolbar-root': {
                paddingInline: 0,
              },
            }}
          >
            <CustomLink
              href={ROUTES.home}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <Logo />
            </CustomLink>

            <IconButton
              disableFocusRipple
              disableRipple
              sx={{
                p: 2,
                py: 0,
                pr: 0,
                display: { xs: 'block', md: 'none' },
              }}
              onClick={() => setShowDrawer(true)}
            >
              <MenuIcon />
            </IconButton>

            <Box
              display={{ xs: 'none', md: 'flex' }}
              columnGap={3}
              alignItems="inherit"
            >
              <NavigationLinks
                links={navigationLinks}
                setShowDrawer={setShowDrawer}
              />
            </Box>

            <Box
              display={{ xs: 'none', md: 'flex' }}
              columnGap={1}
              alignItems="inherit"
            >
              <CustomLink href={ROUTES.login}>
                <Button variant="contained">SIGN IN</Button>
              </CustomLink>

              <CustomLink href={ROUTES.register}>
                <Button variant="outlined" color="primary">
                  GET STARTED
                </Button>
              </CustomLink>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
