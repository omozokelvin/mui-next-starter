'use client';
import {
  createRoleApi,
  getApiRoutes,
  getRoleApi,
  updateRoleApi,
} from '@/app/_common/_apis/authentication';
import { HttpErrorResponse } from '@/app/_common/_types/ApiResponse';
import { ApiRoute, RolePayload } from '@/app/_common/_types/Authentication';
import { useAuth } from '@/app/_common/contexts/AuthContext';
import {
  QueryParamEnum,
  useCustomRouter,
} from '@/app/_common/hooks/useCustomRouter';
import { ApiRouteItem } from '@/app/admin/_common/ApiRouteItem';
import { LoadingButton } from '@mui/lab';
import {
  Autocomplete,
  Box,
  Card,
  Chip,
  Grid,
  List,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

type FreeSoloCreateOptionProps = {
  options: string[];
  value: string;
  onChange: (event: SyntheticEvent, value: string | null) => void;
  error: TextFieldProps['error'];
  helperText: TextFieldProps['helperText'];
  disabled: boolean;
};

function FreeSoloCreateOption(props: FreeSoloCreateOptionProps) {
  return (
    <Autocomplete
      value={props.value}
      onChange={props.onChange}
      filterOptions={(options, params) => {
        const { inputValue } = params;

        if (params.inputValue !== '' && !options.includes(inputValue)) {
          options.push(`Add "${inputValue}"`);
        }

        return options;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={props.options}
      getOptionLabel={(option) => {
        return '';
      }}
      renderOption={(props, option) => <li {...props}>{option}</li>}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          label="Operations"
          error={props.error}
          helperText={props.helperText}
          disabled={props.disabled}
        />
      )}
    />
  );
}

type Permissions = Partial<Record<keyof RolePayload, boolean>>;

export default function RoleFormPage() {
  const { isSuperAdmin } = useAuth();
  const { getQueryParam, setQueryParam } = useCustomRouter();

  const id = getQueryParam(QueryParamEnum.id);

  // const [role, setRole] = useState<Role|null>(null)
  const [loading, setLoading] = useState(false);
  const [apiRoutes, setApiRoutes] = useState<ApiRoute[]>([]);

  const formik = useFormik<RolePayload>({
    enableReinitialize: true,
    initialValues: {
      name: '',
      description: '',
      operations: [],
      apiRoutes: [],
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Role name is required'),
      description: Yup.string().required('Role description is required'),
      operations: Yup.array().required('Role operations are required'),
      apiRoutes: Yup.array()
        .required('Role API routes are required')
        .of(
          Yup.object().shape({
            path: Yup.string().required('API route path is required'),
            method: Yup.string().required('API route method is required'),
          })
        ),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      try {
        const { data } = await (id
          ? updateRoleApi(id, values)
          : createRoleApi(values));

        toast.success('Role saved successfully!');

        if (data?.id && data?.id !== id) {
          setQueryParam(QueryParamEnum.id, data.id);
        }
      } catch (error: unknown) {
        toast.error((error as Error).message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const {
    handleSubmit,
    getFieldProps,
    touched,
    errors,
    isSubmitting,
    setFieldValue,
    values,
    setValues,
  } = formik;

  const permissions = useMemo<Permissions>(() => {
    if (!isSuperAdmin || loading || isSubmitting) {
      return {};
    }

    return {
      name: true,
      description: true,
      operations: true,
      apiRoutes: true,
    };
  }, [isSubmitting, isSuperAdmin, loading]);

  const availableApiRoutes = useMemo(() => {
    return apiRoutes.filter(
      (apiRoute) =>
        !values.apiRoutes.some(
          (route) =>
            route.path === apiRoute.path && route.method === apiRoute.method
        )
    );
  }, [apiRoutes, values.apiRoutes]);

  const operations = useMemo(() => {
    return Array.isArray(values.operations) ? values.operations : [];
  }, [values.operations]);

  useEffect(() => {
    setLoading(true);

    getApiRoutes()
      .then(({ data = [] }) => {
        setApiRoutes(data);
      })
      .catch((error) => toast.error('Failed to fetch routes'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!id) {
      return;
    }

    getRoleApi(id)
      .then(({ data }) => {
        debugger;
        setValues({
          name: data.name,
          description: data.description,
          operations: data.operations,
          apiRoutes: data.apiRoutes,
        });
      })
      .catch((error) =>
        toast.error(
          (error as HttpErrorResponse)?.message || 'Failed to fetch role'
        )
      );
  }, [id, setValues]);

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Typography
          fontWeight={500}
          component="div"
          gutterBottom
          sx={{
            typography: {
              xs: 'h6',
              md: 'h5',
            },
            mb: 4,
          }}
        >
          Role and permissions
        </Typography>

        <LoadingButton
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ mb: 4 }}
        >
          Save
        </LoadingButton>

        <Grid container rowSpacing={8}>
          <Grid item xs={12} lg={6}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: 2,
              }}
            >
              <TextField
                id="name"
                label={'Name'}
                variant="outlined"
                autoComplete="off"
                disabled={!permissions?.name}
                fullWidth
                {...getFieldProps('name')}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
              />

              <TextField
                id="description"
                label={'Description'}
                variant="outlined"
                autoComplete="off"
                disabled={!permissions?.description}
                fullWidth
                multiline
                rows={2}
                {...getFieldProps('description')}
                error={Boolean(touched.description && errors.description)}
                helperText={touched.description && errors.description}
              />

              <FreeSoloCreateOption
                options={operations}
                value={''}
                onChange={(_, newValue) => {
                  const modifiedValue =
                    newValue
                      ?.trim()
                      ?.replaceAll('Add "', '')
                      .replaceAll('"', '') || '';

                  if (!modifiedValue) {
                    return;
                  }

                  const exists = operations.some(
                    (operation) =>
                      operation.toLowerCase() === modifiedValue.toLowerCase()
                  );

                  if (exists) {
                    return;
                  }

                  setFieldValue('operations', [...operations, modifiedValue]);
                }}
                error={Boolean(touched.operations && errors.operations)}
                helperText={touched.operations && errors.operations}
                disabled={!permissions?.operations}
              />

              <Box display="flex" gap={2} flexWrap="wrap">
                {operations.map((operation, index) => (
                  <Chip
                    key={operation + index}
                    label={operation}
                    onDelete={() => {
                      setFieldValue(
                        'operations',
                        operations.filter((value) => value !== operation)
                      );
                    }}
                  />
                ))}
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography
                component="div"
                gutterBottom
                sx={{
                  typography: {
                    xs: 'subtitle1',
                    md: 'h6',
                  },
                }}
              >
                Available API routes ({availableApiRoutes.length})
              </Typography>

              <List
                sx={{ display: 'flex', flexDirection: 'column', rowGap: 1 }}
              >
                {availableApiRoutes.map((apiRoute) => (
                  <ApiRouteItem
                    key={apiRoute.path + apiRoute.method + 'available'}
                    {...apiRoute}
                    onClick={(item) => {
                      if (!permissions?.apiRoutes) {
                        return;
                      }

                      setFieldValue('apiRoutes', [...values.apiRoutes, item]);
                    }}
                    checked={false}
                    disabled={!permissions?.apiRoutes}
                  />
                ))}
              </List>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography
                component="div"
                gutterBottom
                sx={{
                  typography: {
                    xs: 'subtitle1',
                    md: 'h6',
                    fontWeight: 600,
                  },
                }}
              >
                Assigned API routes ({values.apiRoutes.length})
              </Typography>

              <List
                sx={{ display: 'flex', flexDirection: 'column', rowGap: 1 }}
              >
                {values.apiRoutes.map((apiRoute) => (
                  <ApiRouteItem
                    key={apiRoute.path + apiRoute.method + 'assigned'}
                    {...apiRoute}
                    onClick={(item) => {
                      if (!permissions?.apiRoutes) {
                        return;
                      }

                      setFieldValue(
                        'apiRoutes',
                        values.apiRoutes.filter(
                          (route) => route.path !== item.path
                        )
                      );
                    }}
                    checked={true}
                    disabled={!permissions?.apiRoutes}
                  />
                ))}
              </List>
            </Grid>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
