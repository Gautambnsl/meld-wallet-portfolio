import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { useMediaQuery, Button, Grid, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// ==============================|| USER PROFILE - TOP CARD ||============================== //

interface Props {
  handleSelect: any;
}

const ProfileCard = ({ handleSelect }: Props) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <MainCard
      border={false}
      content={false}
      sx={{ bgcolor: 'primary.lighter', position: 'relative' }}
    >
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        padding="1rem"
        sx={{ position: 'relative', zIndex: 5 }}
      >
        <Grid item>
          <Stack
            direction="row"
            spacing={matchDownSM ? 1 : 2}
            alignItems="center"
          >
            <Stack spacing={0.75}>
              <Typography variant="h5">Edit Your Profile</Typography>
              <Typography variant="body2" color="secondary">
                Complete your profile to unlock all features
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid
          item
          sx={{
            mx: matchDownSM ? 2 : 3,
            my: matchDownSM ? 1 : 0,
            mb: matchDownSM ? 2 : 0,
          }}
          xs={matchDownSM ? 12 : 'auto'}
        >
          <Button
            variant="contained"
            fullWidth={matchDownSM}
            component={Link}
            to="/profile/personal"
            onClick={handleSelect}
          >
            Edit Your Profile
          </Button>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default ProfileCard;
