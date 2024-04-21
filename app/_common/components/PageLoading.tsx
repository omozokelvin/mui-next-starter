import Grid from '@mui/material/Grid';

export const PageLoading = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ height: 'calc(100vh - 56px)' }}
      id="page-loading"
    >
      <p>mui-next-starter...</p>
    </Grid>
  );
};
