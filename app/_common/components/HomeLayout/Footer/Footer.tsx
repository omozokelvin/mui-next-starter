'use client';
import Logo from '@/app/_common/components/Logo';
import { ROUTES } from '@/app/_common/constants/routes';
import { Box, Container, Grid, Typography } from '@mui/material';
import { FooterLinks } from './FooterLinks';
import SocialMedia from './SocialMedia';

export function Footer() {
  return (
    <Box
      sx={{
        mt: 'auto',
        py: 6,
        backgroundColor: '#F7F1FB',
      }}
    >
      <Container>
        <Grid container columnSpacing={4} rowSpacing={6}>
          <Grid item xs={12} lg={6} container flexDirection="column" rowGap={3}>
            <Logo />
            <Typography variant="body1" color="purple.900">
              Phasellus mattis felis quis enim viverratys accumsan. Nullam porta
              risus felis, vitaeuik dapibus arcu viverra eu.
            </Typography>

            <SocialMedia
              sx={{
                display: {
                  xs: 'none',
                  md: 'flex',
                },
              }}
            />
          </Grid>

          <Grid item xs={6} lg={3} container flexDirection="column" rowGap={3}>
            <FooterLinks
              title="Company"
              links={[
                {
                  text: 'About us',
                  link: ROUTES.home,
                },
                {
                  text: 'Partner',
                  link: ROUTES.home,
                },
                {
                  text: 'Career',
                  link: ROUTES.home,
                },
                {
                  text: 'Contact us',
                  link: ROUTES.home,
                },
                {
                  text: 'Privacy Policy',
                  link: ROUTES.home,
                },
              ]}
            />
          </Grid>

          <Grid item xs={6} lg={3} container flexDirection="column" rowGap={3}>
            <Typography>HOW IT WORKS?</Typography>
            <Typography>
              Phasellus mattis felis quis enim viverratys accumsan. Nullam porta
              risus felis, vitaeuik dapibus arcu viverra eu. Phasellus mattis
              felis quis enim Nullam porta risus vitaeuik dapibus Phasellus
              mattis felis quis enim
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            container
            flexDirection="column"
            rowGap={3}
            sx={{
              display: {
                xs: 'block',
                md: 'none',
              },
            }}
          >
            <SocialMedia />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
