'use client';
import { withoutAuth } from '@/app/_common/HOC/withoutAuth';
import { HttpErrorResponse } from '@/app/_common/_types/ApiResponse';
import { Profile } from '@/app/_common/_types/Authentication';
import CustomLink from '@/app/_common/components/CustomLink';
import { ErrorHelperText } from '@/app/_common/components/ErrorHelperText';
import { PasswordTextField } from '@/app/_common/components/PasswordTextField';
import { ROUTES } from '@/app/_common/constants/routes';
import { useAuth } from '@/app/_common/contexts/AuthContext';
import { LoadingButton } from '@mui/lab';
import { Box, TextField, Typography } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

function LoginPage() {
  const { login } = useAuth();

  const formik = useFormik<{ email: Profile['email']; password: string }>({
    enableReinitialize: true,
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required('Please provide a valid email address')
        .email('Please provide a valid email address'),
      password: Yup.string()
        .required('Please enter a password')
        .min(6, 'Password should be at least 5 characters long'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      debugger;

      try {
        const { email, password } = values;

        await login(email, password);
      } catch (error: unknown) {
        toast.error(
          (error as HttpErrorResponse)?.message ||
            'Failed to login, please try again or contact an administrator'
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          rowGap={3}
        >
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            autoComplete="off"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={
              <ErrorHelperText
                touched={touched.email}
                errorMessage={errors.email}
              />
            }
          />

          <PasswordTextField
            id="password"
            label="Password"
            variant="outlined"
            autoComplete="off"
            fullWidth
            inputProps={{
              autoComplete: 'new-password',
            }}
            InputLabelProps={{
              shrink: true,
            }}
            {...getFieldProps('password')}
            error={Boolean(touched.password && errors.password)}
            helperText={
              <ErrorHelperText
                touched={touched.password}
                errorMessage={errors.password}
              />
            }
          />

          <LoadingButton
            disableElevation
            loading={isSubmitting}
            variant="contained"
            fullWidth
            type="submit"
            size="large"
          >
            Login
          </LoadingButton>

          <CustomLink
            href={ROUTES.forgotPassword}
            variant="body1"
            color="primary"
          >
            Forgot Password?
          </CustomLink>

          <Typography variant="body1" align="center" component="div">
            {`Don't have an account? `}
            <CustomLink href={ROUTES.register} variant="body1" color="primary">
              Sign up
            </CustomLink>
          </Typography>
        </Box>
      </Form>
    </FormikProvider>
  );
}

export default withoutAuth(LoginPage);
