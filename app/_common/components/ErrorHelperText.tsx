import { Typography } from '@mui/material';
import { FC } from 'react';

type ErrorHelperTextProps = {
  touched: boolean | undefined;
  errorMessage: string | undefined;
};

export const ErrorHelperText: FC<ErrorHelperTextProps> = ({
  touched = false,
  errorMessage = '',
}) => {
  if (!touched) {
    return <></>;
  }

  if (!errorMessage) {
    return <></>;
  }

  return (
    <Typography variant="body2" color="error" component="span">
      {errorMessage}
    </Typography>
  );
};
