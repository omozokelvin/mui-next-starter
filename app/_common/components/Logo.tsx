import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import ICON from '/public/images/logo.svg';

export default function Logo(props: SvgIconProps) {
  return (
    <SvgIcon
      component={ICON}
      viewBox="0 0 203 67"
      titleAccess="mui-next-starter Logo"
      {...props}
      sx={{
        display: 'block',
        width: {
          xs: 100,
          md: 150,
        },
        height: 'auto',
        ...(props?.sx || {}),
      }}
    />
  );
}
