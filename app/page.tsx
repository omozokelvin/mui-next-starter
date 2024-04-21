'use client';

import HomeLayout from '@/app/_common/components/HomeLayout/HomeLayout';
import { Typography } from '@mui/material';

export default function HomePage() {
  return (
    <HomeLayout>
      <main>
        <Typography variant="h1">Home Page</Typography>
      </main>
    </HomeLayout>
  );
}
