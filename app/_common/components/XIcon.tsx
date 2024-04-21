import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import ICON from '/public/images/x.svg';

export function XIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      component={ICON}
      viewBox="0 0 19 18"
      titleAccess="mui-next-starter Icon"
      {...props}
    />
  );
}
