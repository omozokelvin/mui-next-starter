import { useBreakPoints } from '@/app/_common/hooks/useBreakPoints';
import CloseIcon from '@mui/icons-material/Close';
import {
  Dialog,
  DialogContent,
  DialogContentProps,
  DialogTitle,
  Grid,
  IconButton,
  SwipeableDrawer,
  SxProps,
  Theme,
} from '@mui/material';
import { ReactNode } from 'react';

type Props = {
  open: boolean;
  onClose?: () => void;
  children: ReactNode;
  dialogContentProps?: DialogContentProps;
  dialogSxProps?: SxProps<Theme>;
};

export default function ResponsiveDialog(props: Props) {
  const {
    open,
    onClose = () => {},
    children,
    dialogContentProps = {},
    dialogSxProps = {},
  } = props;

  const { medium: mediumDownwards } = useBreakPoints('down');

  return (
    <>
      {mediumDownwards ? (
        <SwipeableDrawer
          anchor="bottom"
          open={open}
          onClose={onClose}
          onOpen={() => {}}
          PaperProps={{
            sx: {
              borderRadius: '16px 16px 0px 0px',
              boxShadow: '-40px 40px 80px -8px rgba(145, 158, 171, 0.24)',
            },
          }}
        >
          {children}
        </SwipeableDrawer>
      ) : (
        <Dialog
          open={open}
          onClose={onClose}
          sx={
            {
              marginTop: 1,
              '& .MuiPaper-root': {
                width: '100%',
                borderRadius: '8px',
                maxWidth: '600px',
                ...dialogSxProps,
              },
            } as SxProps<Theme>
          }
        >
          <DialogTitle>
            {!!onClose && (
              <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            )}
          </DialogTitle>

          <DialogContent {...dialogContentProps}>
            <Grid container>
              <Grid item xs={12}>
                {children}
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
