import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import ICON from '/public/images/instagram.svg';

export function InstagramIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      component={ICON}
      viewBox="0 0 18 18"
      titleAccess="mui-next-starter Icon"
      {...props}
    />
  );
}
