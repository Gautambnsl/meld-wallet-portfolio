import { useRef } from 'react';
import { Grid } from '@mui/material';
import ProfileTabs from 'sections/apps/profiles/user/ProfileTabs';
import { Outlet } from 'react-router';

const UserProfile = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <ProfileTabs />
      </Grid>
      <Grid item xs={12} md={9}>
        <Outlet context={inputRef} />
      </Grid>
    </Grid>
  );
};

export default UserProfile;
