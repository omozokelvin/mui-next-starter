import CustomLink from '@/app/_common/components/CustomLink';
import { Box, Typography } from '@mui/material';

type Props = {
  title: string;
  links: { text: string; link: string }[];
};

export function FooterLinks(props: Props) {
  const { title, links } = props;

  return (
    <>
      <Typography variant="body2" color="#2E2F35">
        {title}
      </Typography>

      <Box display="flex" flexDirection="column" rowGap={2}>
        {links.map((item) => (
          <CustomLink
            key={title + item.text + item.link}
            variant="body1"
            href={item.link}
            sx={{ display: 'block', color: '#2E2F35' }}
          >
            {item.text}
          </CustomLink>
        ))}
      </Box>
    </>
  );
}
