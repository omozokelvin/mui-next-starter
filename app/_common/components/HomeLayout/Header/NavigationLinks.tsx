import CustomLink from '@/app/_common/components/CustomLink';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import { Box, Popover, SxProps } from '@mui/material';
import { usePathname } from 'next/navigation';
import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

export type NavigationLinksProps = {
  text: string;
  link: string;
  subLinks?: NavigationLinksProps[];
};

type Props = {
  links?: NavigationLinksProps[];
  setShowDrawer: Dispatch<SetStateAction<boolean>>;
  sx?: SxProps;
};

export default function NavigationLinks(prop: Props) {
  const { links, setShowDrawer, sx = {} } = prop;

  const [anchorEl, setAnchorEl] = useState<
    HTMLAnchorElement | HTMLSpanElement | null
  >(null);
  const [currentLink, setCurrentLink] =
    useState<NavigationLinksProps['text']>('');

  const pathname = usePathname();

  const isOpened = useCallback(
    (text?: string) => Boolean(anchorEl) && currentLink === text,
    [anchorEl, currentLink]
  );

  const handleClick = (
    event: MouseEvent<HTMLAnchorElement | HTMLSpanElement>,
    navLink: NavigationLinksProps
  ) => {
    if (!navLink?.subLinks?.length) {
      setCurrentLink('');
      setAnchorEl(null);
      setShowDrawer(false);

      // router.push(navLink.link);
      return;
    }

    setCurrentLink((current) => (current === navLink.text ? '' : navLink.text));
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
  };

  const handleClose = () => {
    setCurrentLink('');
    setAnchorEl(null);
  };

  useEffect(() => {
    handleClose();
  }, [pathname]);

  return (
    <>
      {(links || []).map((item) => (
        <Box key={item.text + item.link} sx={{ ...sx }}>
          <CustomLink
            aria-describedby={'simple-popover' + item?.text + item?.link}
            href={item.link}
            color="purple.900"
            variant="body1"
            fontWeight={pathname === item.link ? 500 : 400}
            onClick={(event) => handleClick(event, item)}
            sx={{
              '&:hover': {
                color: 'purple.800',
              },
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              {item.text}

              {!item?.subLinks?.length ? null : isOpened(item.text) ? (
                <KeyboardArrowUpOutlinedIcon width={16} height={16} />
              ) : (
                <KeyboardArrowDownOutlinedIcon width={16} height={16} />
              )}
            </Box>
          </CustomLink>

          {currentLink === item?.text && (
            <Box
              flexDirection="column"
              sx={{
                pt: 2,
                px: 2,
                rowGap: 2,
                backgroundColor: 'inherit',
                display: {
                  xs: 'flex',
                  md: 'none',
                },
              }}
            >
              <NavigationLinks
                links={item.subLinks}
                setShowDrawer={setShowDrawer}
              />
            </Box>
          )}

          <Popover
            id={'simple-popover' + item?.text + item?.link}
            open={isOpened(item.text)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            sx={{
              display: {
                xs: 'none',
                md: 'block',
              },
              top: 'calc(0 * 8px)',
              '& .MuiPaper-root': {
                boxShadow: 'none',
                backgroundColor: 'inherit',
              },
            }}
          >
            <Box
              display="flex"
              flexDirection="column"
              sx={{
                pt: 4,
                px: 4,
                backgroundColor: 'white',
              }}
            >
              <NavigationLinks
                links={item.subLinks}
                sx={{
                  mb: 4,
                }}
                setShowDrawer={setShowDrawer}
              />
            </Box>
          </Popover>
        </Box>
      ))}
    </>
  );
}
