'use client';
import { getRolesApi } from '@/app/_common/_apis/authentication';
import { HttpErrorResponse } from '@/app/_common/_types/ApiResponse';
import { Role } from '@/app/_common/_types/Authentication';
import { FloatingButton } from '@/app/_common/components/FloatingButton';
import { LoadableTable } from '@/app/_common/components/LoadableTable';
import { ROUTES } from '@/app/_common/constants/routes';
import {
  QueryParamEnum,
  useCustomRouter,
} from '@/app/_common/hooks/useCustomRouter';
import {
  Card,
  Grid,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function RoleList() {
  const { router, routeWithQueryParams } = useCustomRouter();

  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timeOut = setTimeout(() => {
      getRolesApi()
        .then(({ data = [] }) => {
          setRoles(data);
        })
        .catch((error) =>
          toast.error(
            (error as HttpErrorResponse)?.message || 'Failed to fetch roles'
          )
        )
        .finally(() => setLoading(false));
    }, 1000);

    return () => timeOut && clearTimeout(timeOut);
  }, []);

  return (
    <Grid container rowSpacing={3}>
      <Grid item justifyContent="flex-end" xs={12} container mt={1}>
        <FloatingButton
          variant="contained"
          onClick={() => router.push(ROUTES.rolesDetails())}
        >
          Create Role
        </FloatingButton>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <LoadableTable
            isLoading={loading}
            noData={roles.length === 0}
            header={
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
            }
          >
            <TableBody>
              {roles.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() =>
                    routeWithQueryParams(ROUTES.rolesDetails(), {
                      [QueryParamEnum.id]: row.id,
                    })
                  }
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: (theme) => theme.palette.action.hover,
                    },
                  }}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </LoadableTable>
        </Card>
      </Grid>
    </Grid>
  );
}
