import CustomLink from '@/app/_common/components/CustomLink';
import { FacebookIcon } from '@/app/_common/components/FacebookIcon';
import { InstagramIcon } from '@/app/_common/components/InstagramIcon';
import { LinkedinIcon } from '@/app/_common/components/LinkedinIcon';
import { WhatsappIcon } from '@/app/_common/components/WhatsappIcon';
import { XIcon } from '@/app/_common/components/XIcon';
import { Box, BoxProps, Typography } from '@mui/material';

const links = [
  {
    href: 'https://x.com/mui-next-starter',
    icon: <XIcon sx={{ fontSize: '1.25rem' }} />,
  },
  {
    href: 'https://facebook.com/mui-next-starter',
    icon: <FacebookIcon sx={{ fontSize: '1.25rem' }} />,
  },
  {
    href: 'https://instagram.com/mui-next-starter',
    icon: <InstagramIcon sx={{ fontSize: '1.25rem' }} />,
  },
  {
    href: 'https://linkedin.com/mui-next-starter',
    icon: <LinkedinIcon sx={{ fontSize: '1.25rem' }} />,
  },
  {
    href: 'https://whatsapp.com',
    icon: <WhatsappIcon sx={{ fontSize: '1.25rem' }} />,
  },
];

type Props = {
  sx?: BoxProps['sx'];
};

export default function SocialMedia(props: Props) {
  const { sx = {} } = props;
  return (
    <Box display="flex" flexDirection="column" rowGap={3} sx={{ ...sx }}>
      <Box display="flex" flexDirection="row" gap={2.5} flexWrap="wrap">
        {links.map((link, index) => (
          <CustomLink
            key={index}
            href={link.href}
            sx={{
              display: 'flex',
              width: 30,
              height: 30,
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
              borderRadius: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              // padding: 2,
            }}
          >
            {link.icon}
          </CustomLink>
        ))}
      </Box>

      <Typography variant="body1" color="purple.900">
        &copy; {new Date().getFullYear()} mui-next-starter. All Rights Reserved
      </Typography>
    </Box>
  );
}
