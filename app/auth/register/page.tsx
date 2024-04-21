'use client';
import { withoutAuth } from '@/app/_common/HOC/withoutAuth';
import { sendOtpApi, verifyOtpApi } from '@/app/_common/_apis/authentication';
import { HttpErrorResponse } from '@/app/_common/_types/ApiResponse';
import { CreateProfile } from '@/app/_common/_types/Authentication';
import { OtpChannelEnum } from '@/app/_common/_types/OtpChannelEnum';
import CustomLink from '@/app/_common/components/CustomLink';
import { ErrorHelperText } from '@/app/_common/components/ErrorHelperText';
import { OtpDialog } from '@/app/_common/components/OtpDialog';
import { PasswordTextField } from '@/app/_common/components/PasswordTextField';
import { validMobileNumber } from '@/app/_common/constants/mobile';
import { ROUTES } from '@/app/_common/constants/routes';
import { useAuth } from '@/app/_common/contexts/AuthContext';
import {
  QueryParamEnum,
  useCustomRouter,
} from '@/app/_common/hooks/useCustomRouter';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const DEFAULT_OTP_COUNTER = 120;

type Formik = CreateProfile;

function RegistrationPage() {
  const { signup } = useAuth();
  const { getQueryParam, setQueryParam } = useCustomRouter();
  const showModal = getQueryParam(QueryParamEnum.showModal) === 'true';

  const [otpCounter, setOtpCounter] = useState(DEFAULT_OTP_COUNTER);
  const [isSubmitting, setSubmitting] = useState(false);

  const sendOtp = async (values: Formik) => {
    setSubmitting(true);

    try {
      const response = await sendOtpApi({
        type: 'registration',
        email: values.email,
        mobileNumber: values.mobileNumber,
        ...(!!values?.referralCode?.trim() && {
          referralCode: values.referralCode,
        }),
      });

      toast.success(response.message || 'OTP sent');

      !showModal && setQueryParam(QueryParamEnum.showModal, true);

      setOtpCounter(DEFAULT_OTP_COUNTER);
    } catch (error: unknown) {
      toast.error(
        (error as HttpErrorResponse)?.message ||
          'Failed to send OTP, please try again or contact an help desk',
        {
          position: 'bottom-left',
        }
      );
    } finally {
      setSubmitting(false);
    }
  };

  const verifyOtp = async (values: Formik, code: string) => {
    try {
      setSubmitting(true);

      await verifyOtpApi({
        type: 'registration',
        email: values.email,
        code,
      });

      toast.success('OTP verified successfully, creating your account');

      await signup(values);
    } catch (error) {
      toast.error(
        (error as HttpErrorResponse)?.message ||
          'Failed to verify OTP, please try again or contact an help desk',
        {
          position: 'bottom-left',
        }
      );
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik<Formik>({
    enableReinitialize: true,
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      mobileNumber: '',
      password: '',
      referralCode: '',
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required('First enter your first name'),
      lastName: Yup.string().required('Please enter your last name'),
      email: Yup.string()
        .required('Please provide a valid email address')
        .email('Please provide a valid email address'),
      mobileNumber: Yup.string()
        .required('Mobile number is required')
        .test(
          'isValidMobileNumber',
          'Please provided a valid mobile number',
          (value) => validMobileNumber(value)
        ),
      password: Yup.string()
        .required('Please enter a password')
        .min(6, 'Password should be at-least 6 characters long'),

      referralCode: Yup.string().nullable(),
    }),
    onSubmit: async (values) => {
      await sendOtp(values);
    },
  });

  const { errors, touched, handleSubmit, getFieldProps, values } = formik;

  console.log({ values, errors });

  useEffect(() => {
    if (otpCounter === 0) {
      return;
    }

    const timerID = setInterval(
      () => setOtpCounter((currentCount) => currentCount - 1),
      1000
    );

    return () => {
      clearInterval(timerID);
    };
  }, [otpCounter]);
  return (
    <>
      <OtpDialog
        open={showModal}
        channel={OtpChannelEnum.EMAIL}
        sendingOtp={isSubmitting}
        otpCounter={otpCounter}
        onClose={() => setQueryParam(QueryParamEnum.showModal, undefined)}
        onResendOtp={async () => {
          await sendOtp(values);
        }}
        onVerify={async (code) => {
          await verifyOtp(values, code);
        }}
      />

      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            rowGap={2}
          >
            <FormControl fullWidth>
              <FormLabel required>First name</FormLabel>
              <TextField
                id="firstName"
                variant="outlined"
                autoComplete="off"
                {...getFieldProps('firstName')}
                error={Boolean(touched.firstName && errors.firstName)}
                helperText={
                  <ErrorHelperText
                    touched={touched.firstName}
                    errorMessage={errors.firstName}
                  />
                }
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel required>Last name</FormLabel>
              <TextField
                id="lastName"
                variant="outlined"
                autoComplete="off"
                {...getFieldProps('lastName')}
                error={Boolean(touched.lastName && errors.lastName)}
                helperText={
                  <ErrorHelperText
                    touched={touched.lastName}
                    errorMessage={errors.lastName}
                  />
                }
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel required>Email</FormLabel>
              <TextField
                id="email"
                variant="outlined"
                autoComplete="off"
                type="email"
                {...getFieldProps('email')}
                error={Boolean(touched.email && errors.email)}
                helperText={
                  <ErrorHelperText
                    touched={touched.email}
                    errorMessage={errors.email}
                  />
                }
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel required>Mobile number</FormLabel>
              <TextField
                id="mobileNumber"
                variant="outlined"
                autoComplete="off"
                {...getFieldProps('mobileNumber')}
                error={Boolean(touched.mobileNumber && errors.mobileNumber)}
                helperText={
                  <ErrorHelperText
                    touched={touched.mobileNumber}
                    errorMessage={errors.mobileNumber}
                  />
                }
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel required>Password</FormLabel>
              <PasswordTextField
                id="password"
                variant="outlined"
                autoComplete="off"
                {...getFieldProps('password')}
                error={Boolean(touched.password && errors.password)}
                helperText={
                  <ErrorHelperText
                    touched={touched.password}
                    errorMessage={errors.password}
                  />
                }
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel required>Referral code</FormLabel>
              <TextField
                id="referralCode"
                variant="outlined"
                autoComplete="off"
                {...getFieldProps('referralCode')}
                error={Boolean(touched.referralCode && errors.referralCode)}
                helperText={
                  <ErrorHelperText
                    touched={touched.referralCode}
                    errorMessage={errors.referralCode}
                  />
                }
              />
            </FormControl>

            <LoadingButton
              disableElevation
              loading={isSubmitting}
              variant="contained"
              fullWidth
              type="submit"
              size="large"
            >
              Create Account
            </LoadingButton>

            <Typography variant="body1" align="center" component="div">
              Already have an account?{' '}
              <CustomLink href={ROUTES.login} variant="body1" color="primary">
                Sign in
              </CustomLink>
            </Typography>
          </Box>
        </Form>
      </FormikProvider>
    </>
  );
}

export default withoutAuth(RegistrationPage);
