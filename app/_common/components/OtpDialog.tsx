import { OtpChannelEnum } from '@/app/_common/_types/OtpChannelEnum';
import CustomOtpInput from '@/app/_common/components/CustomOtpInput';
import ResponsiveDialog from '@/app/_common/components/ResponsiveDialog';
import { useBreakPoints } from '@/app/_common/hooks/useBreakPoints';
import { LoadingButton } from '@mui/lab';
import { Grid, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';

type Props = {
  open: boolean;
  channel: OtpChannelEnum;
  onClose: () => void;
  numInputs?: number;
  sendingOtp?: boolean;
  onResendOtp?: () => void;
  otpCounter?: number;
  onVerify?: (otp: string) => void;
};

export const OtpDialog: FC<Props> = (props) => {
  const {
    open,
    channel,
    onClose,
    numInputs = 6,
    sendingOtp = false,
    onResendOtp,
    otpCounter = 0,
    onVerify,
  } = props;

  const { medium: mediumDownwards } = useBreakPoints('down');

  const [otp, setOtp] = useState('');

  useEffect(() => {
    setOtp('');
  }, [open]);

  return (
    <ResponsiveDialog open={open} onClose={onClose}>
      <Grid container p={4}>
        <Grid item xs={12} container justifyContent="center" mb={4}>
          <Typography
            variant={mediumDownwards ? 'body2' : 'body1'}
            align="center"
          >
            An{' '}
            <Typography color="primary.main" component="span" fontWeight={600}>
              OTP
            </Typography>{' '}
            has been sent to your{' '}
            {channel === OtpChannelEnum.EMAIL ? 'email' : 'mobile number'},
            please enter the code in the below box to complete your verification
          </Typography>
        </Grid>

        <Grid item xs={12} container justifyContent="center" mb={4}>
          <CustomOtpInput
            value={otp}
            onChange={(otp: string) => setOtp(otp)}
            numInputs={numInputs}
            renderInput={(props) => <input {...props} />}
          />
        </Grid>

        <Grid item xs={12} container justifyContent="center">
          <LoadingButton
            disabled={otp.length !== numInputs || sendingOtp}
            variant="contained"
            loading={sendingOtp}
            size={mediumDownwards ? 'medium' : 'large'}
            sx={{
              width: `calc(${
                mediumDownwards ? '45px' : '45px'
              } * ${numInputs} + 8px * (${numInputs} - 1))`,
            }}
            onClick={onVerify?.bind(null, otp)}
          >
            VERIFY
          </LoadingButton>
        </Grid>

        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
        >
          {otpCounter === 0 && (
            <Typography variant="body2" align="center" color="text.secondary">
              {`Don't have a code?`}{' '}
            </Typography>
          )}

          <LoadingButton
            loading={sendingOtp}
            variant="text"
            disabled={otpCounter > 0 || sendingOtp}
            onClick={onResendOtp}
          >
            resend code
          </LoadingButton>
          {otpCounter !== 0 && (
            <Typography variant="caption" color="text.secondary">
              in {otpCounter} {otpCounter <= 1 ? 'second' : 'seconds'}
            </Typography>
          )}
        </Grid>
      </Grid>
    </ResponsiveDialog>
  );
};
