'use client';
import { LinkProps, Link as MuiLink } from '@mui/material';
import NextLink from 'next/link';
import { ReactNode } from 'react';

type Props = {
  href: string;
  children: ReactNode;
} & Omit<LinkProps, 'children'>;

export default function CustomLink(props: Props) {
  const { href, children, ...rest } = props;
  const { sx, ...other } = rest;

  return (
    <NextLink
      href={href}
      style={{
        textDecoration: 'none',
      }}
    >
      <MuiLink
        component="span"
        {...other}
        sx={{
          textDecoration: 'none',
          ...sx,
        }}
      >
        {children}
      </MuiLink>
    </NextLink>
  );
}
