'use client';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { useState } from 'react';

export function PasswordTextField({
  InputProps = {},
  ...props
}: TextFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      type={showPassword ? 'text' : 'password'}
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {showPassword ? (
              <IconButton
                aria-label="hide password"
                onClick={() => setShowPassword(false)}
              >
                <VisibilityOffOutlinedIcon />
              </IconButton>
            ) : (
              <IconButton
                aria-label="show password"
                onClick={() => setShowPassword(true)}
              >
                <VisibilityOutlinedIcon />
              </IconButton>
            )}
          </InputAdornment>
        ),
        ...InputProps,
      }}
      {...props}
    />
  );
}
