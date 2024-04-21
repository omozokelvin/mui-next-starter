import CustomLink from '@/app/_common/components/CustomLink';
import NavigationLinks from '@/app/_common/components/HomeLayout/Header/NavigationLinks';
import { ROUTES } from '@/app/_common/constants/routes';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Box, Button, Container, Drawer, Stack } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { navigationLinks } from './constants';

type Props = {
  open: boolean;
  onClose: () => void;
  setShowDrawer: Dispatch<SetStateAction<boolean>>;
};

export default function MobileMenuDrawer(props: Props) {
  const { open, setShowDrawer, onClose } = props;

  return (
    <Drawer
      anchor={'top'}
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          minHeight: '100vh',
          backgroundColor: '#EEEEEE',
          paddingBlock: 3,
        },
      }}
    >
      <Container>
        <Stack
          sx={{
            width: '100%',
          }}
          alignItems={'flex-start'}
        >
          <Button
            size="small"
            color="inherit"
            endIcon={<CloseOutlinedIcon sx={{ width: 16, height: 16 }} />}
            sx={{
              display: 'flex',
              alignItems: 'center',
              alignSelf: 'flex-end',
              mb: 3,
            }}
            onClick={onClose}
          >
            Close
          </Button>

          <Stack spacing={4} sx={{ width: '100%', paddingInline: 1 }}>
            <NavigationLinks
              links={navigationLinks}
              setShowDrawer={setShowDrawer}
            />

            <Box display="flex" justifyContent="space-between" columnGap={2}>
              <CustomLink href={ROUTES.login}>
                <Button variant="contained" fullWidth>
                  Sign In
                </Button>
              </CustomLink>

              <CustomLink href={ROUTES.register}>
                <Button variant="outlined" fullWidth>
                  Get Started
                </Button>
              </CustomLink>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Drawer>
  );
}
