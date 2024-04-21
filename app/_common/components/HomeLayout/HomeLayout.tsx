import { Footer } from '@/app/_common/components/HomeLayout/Footer/Footer';
import { Header } from '@/app/_common/components/HomeLayout/Header/Header';
import { Box } from '@mui/material';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function HomeLayout(props: Props) {
  return (
    <>
      <Header />
      <Box>{props.children}</Box>
      <Footer />
    </>
  );
}
