import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import ICON from '/public/images/facebook.svg';

export function FacebookIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      component={ICON}
      viewBox="0 0 12 20"
      titleAccess="mui-next-starter Icon"
      {...props}
    />
  );
}
