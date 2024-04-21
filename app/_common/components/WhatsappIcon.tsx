import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import ICON from '/public/images/whatsapp.svg';

export function WhatsappIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      component={ICON}
      viewBox="0 0 20 20"
      titleAccess="mui-next-starter Icon"
      {...props}
    />
  );
}
