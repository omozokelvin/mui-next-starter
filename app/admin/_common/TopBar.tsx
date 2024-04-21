import { BackButton } from '@/app/_common/components/BackButton';
import { ROUTES } from '@/app/_common/constants/routes';
import { MyAccount } from '@/app/admin/_common/MyAccount';
import Notification from '@/app/admin/_common/Notification';
import { ShortCut } from '@/app/admin/_common/ShortCut';
import { Box, Stack } from '@mui/material';
import { usePathname } from 'next/navigation';

export const TopBar = () => {
  const pathname = usePathname();

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      px={4}
      py={1}
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        border: '1px solid rgba(196, 196, 196, 0.2)',
      }}
    >
      <Box>{pathname !== ROUTES.home && <BackButton />}</Box>

      <Stack
        direction="row"
        alignItems="center"
        sx={{ justifySelf: 'flex-end' }}
      >
        <ShortCut />

        <Notification />

        <MyAccount />
      </Stack>
    </Stack>
  );
};
