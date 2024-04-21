import Zoom from '@mui/material/Zoom';

import LightTooltip from '@/app/_common/components/LightToolTip';
import { ROUTES } from '@/app/_common/constants/routes';
import styled from '@emotion/styled';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon, { ListItemIconProps } from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Theme } from '@mui/material/styles';
import { usePathname, useRouter } from 'next/navigation';
import { FC, ReactNode, useCallback } from 'react';

export interface NavListItem {
  name: string;
  link: string;
  icon: ReactNode;
}

interface ItemIconProp extends ListItemIconProps {
  isActiveLink?: boolean;
  logout?: boolean;
}

const ItemIcon = styled(ListItemIcon, {
  shouldForwardProp: (prop) => prop !== 'isActiveLink' && prop !== 'logout',
})<ItemIconProp>(({ theme, isActiveLink, logout = false }) => {
  return {
    minWidth: '1.5rem',
    minHeight: '1.5rem',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    boxShadow: (theme as Theme).shadows[0],
    background: (theme as Theme).palette.common.white,
    ...(isActiveLink &&
      !logout && {
        background: (theme as Theme).palette.primary.main,
        color: (theme as Theme).palette.common.white,
      }),
    ...(logout &&
      !isActiveLink && { color: (theme as Theme).palette.error.main }),
  };
});

interface NavItemProps {
  item: NavListItem;
  open: boolean;
}

const NavItem: FC<NavItemProps> = (props) => {
  const { open, item } = props;

  const router = useRouter();
  const pathname = usePathname();

  const onListItemClick = (link: string) => {
    router.push(link);
  };

  const isActiveLink = useCallback(
    (link: string) => {
      if (!link) {
        return pathname === ROUTES.home;
      }

      return pathname === link;
    },
    [pathname]
  );

  return (
    <ListItemButton
      onClick={onListItemClick.bind(null, item.link)}
      sx={{
        minHeight: 40,
        justifyContent: open ? 'initial' : 'center',
        borderRadius: 1,
        ...(open && { mx: 1.5, px: 1 }),
        my: 1,
        ...(isActiveLink(item.link) &&
          open && {
            background: (theme) => theme.palette.common.white,
            boxShadow: 'rgb(0 0 0 / 5%) 0rem 1.25rem 1.6875rem 0rem',
            transition: 'box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          }),
        '&:hover': {
          ...(isActiveLink(item.link) && open
            ? { background: '#ffffff' }
            : { background: 'unset' }),
        },
      }}
    >
      {open ? (
        <ItemIcon
          isActiveLink={isActiveLink(item.link)}
          sx={{ mr: open ? 1 : 'auto' }}
        >
          {item.icon}
        </ItemIcon>
      ) : (
        <LightTooltip
          title={item.name}
          placement="right"
          TransitionComponent={Zoom}
          arrow
          sx={{ color: 'black' }}
        >
          <ItemIcon
            isActiveLink={isActiveLink(item.link)}
            sx={{ mr: open ? 1 : 'auto' }}
          >
            {item.icon}
          </ItemIcon>
        </LightTooltip>
      )}

      <ListItemText
        disableTypography
        primary={item.name}
        sx={{
          fontSize: '0.875rem',
          opacity: open ? 1 : 0,
          ...(open && { flex: 'initial', pr: 1 }),
        }}
      />
    </ListItemButton>
  );
};

export default NavItem;
