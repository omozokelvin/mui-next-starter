import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { FC, MouseEvent } from 'react';

interface BackButtonProps {
  iconMarginRight?: number;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const BackButton: FC<BackButtonProps> = ({
  iconMarginRight = 0.5,
  onClick,
}) => {
  const router = useRouter();

  const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    if (!onClick) {
      router.back();
      e.stopPropagation();
      return;
    }

    onClick(e);
  };

  return (
    <Button
      disableElevation
      size="small"
      sx={{
        paddingInline: 0,
        color: (theme) => theme.palette.text.secondary,
        minWidth: 'unset',
        '&:hover': {
          backgroundColor: 'unset',
        },
      }}
      onClick={onClickHandler}
      startIcon={<ArrowBackIosNewOutlinedIcon sx={{ mr: iconMarginRight }} />}
    >
      Back
    </Button>
  );
};
