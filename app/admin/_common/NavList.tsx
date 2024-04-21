import { ROUTES } from '@/app/_common/constants/routes';
import { useAuth } from '@/app/_common/contexts/AuthContext';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import { useMemo } from 'react';
import NavItem, { NavListItem } from './NavItem';

const listItemSx = { width: '16px', margin: 'unset' };

type Props = { open: boolean };

export default function NavList(props: Props) {
  const { isSuperAdmin } = useAuth();
  const { open } = props;

  const listItems: NavListItem[] = useMemo(() => {
    const routes = [
      {
        name: 'Dashboard',
        link: ROUTES.admin,
        icon: <DashboardOutlinedIcon sx={listItemSx} />,
      },
      {
        name: 'Users',
        link: ROUTES.users(),
        icon: <PeopleOutlinedIcon sx={listItemSx} />,
      },
    ];

    if (isSuperAdmin) {
      routes.push({
        name: 'Roles',
        link: ROUTES.roles(),
        icon: <SecurityOutlinedIcon sx={listItemSx} />,
      });
    }

    return routes;
  }, [isSuperAdmin]);

  return (
    <List
      sx={{
        fontSize: '0.875rem',
      }}
    >
      <Grid container direction="column" justifyContent="space-between">
        <Grid item>
          {listItems.map((item, index) => (
            <NavItem open={open} key={index} item={item} />
          ))}
        </Grid>
      </Grid>
    </List>
  );
}
