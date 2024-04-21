'use client';
import { withAuth } from '@/app/_common/HOC/withAuth';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

function DashboardLayout(props: Props) {
  return <>{props.children}</>;
}

export default withAuth(DashboardLayout);
