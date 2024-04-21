import { Button, ButtonProps } from '@mui/material';

export function FloatingButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      sx={{
        position: 'sticky',
        ...props.sx,
      }}
    />
  );
}
