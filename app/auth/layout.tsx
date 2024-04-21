'use client';
import HomeLayout from '@/app/_common/components/HomeLayout/HomeLayout';
import { Card, Grid } from '@mui/material';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function AuthLayout(props: Props) {
  return (
    <HomeLayout>
      <Grid maxWidth={'xxl'} container>
        <Grid
          item
          xs={6}
          sx={{
            display: {
              xs: 'none',
              md: 'flex',
            },
          }}
          container
          alignItems="flex-end"
          justifyContent="center"
        />

        <Grid
          item
          xs={12}
          md={6}
          container
          py={6}
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh',
          }}
        >
          <Card
            sx={{
              width: { xs: '100%', md: 423 },
              overflow: 'auto',
              display: 'flex',
              flexDirection: 'column',
              rowGap: 3,
            }}
          >
            {props.children}
          </Card>
        </Grid>
      </Grid>
    </HomeLayout>
  );
}
