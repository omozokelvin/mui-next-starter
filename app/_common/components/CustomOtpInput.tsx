import { useBreakPoints } from '@/app/_common/hooks/useBreakPoints';
import { ComponentProps } from 'react';
import OtpInput from 'react-otp-input';

type OtpInputProps = ComponentProps<typeof OtpInput>;

export default function CustomOtpInput(props: OtpInputProps) {
  const { medium: mediumDownwards } = useBreakPoints('down');

  return (
    <OtpInput
      inputStyle={{
        width: mediumDownwards ? '35px' : '45px',
        height: mediumDownwards ? '35px' : '45px',
        fontSize: mediumDownwards ? '0.875rem' : '1rem',
      }}
      containerStyle={{
        columnGap: '8px',
      }}
      inputType="text"
      {...props}
    />
  );
}
