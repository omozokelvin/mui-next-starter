import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import ICON from '/public/images/menu.svg';

export function MenuIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      component={ICON}
      viewBox="0 0 24 24"
      titleAccess="mui-next-starter Icon"
      {...props}
    />
  );
}
