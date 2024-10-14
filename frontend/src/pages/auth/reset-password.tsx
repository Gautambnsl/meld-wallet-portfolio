// material-ui
import { Grid, Stack, Typography } from '@mui/material';
import { GetVerifyPasswordApi } from 'actions/authApi/GetVerifyPasswordApi';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

// project import
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthResetPassword from 'sections/auth/auth-forms/AuthResetPassword';
import { StatusCode } from 'utils/constant/StatusCode';

// ================================|| RESET PASSWORD ||================================ //

const ResetPassword = () => {
  const params = useParams<{ verifyKey: string }>();
  const [verifyKey, setVerifyKey] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  
  const handleVerifyPasswordKey = useCallback(() => {
    GetVerifyPasswordApi({
      verifyKey: params?.verifyKey,
    })
      .then((response: any) => {
        if (response.status === StatusCode.success) {
          setVerifyKey(response?.data?.verifyKey);
          setEmail(response?.data?.email);
        }
      })
      .catch((error: any) => {
        navigate('/login');
      });
  }, [params?.verifyKey]);

  useEffect(() => {
    params?.verifyKey && handleVerifyPasswordKey();
  }, [params?.verifyKey]);

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack sx={{ mb: { xs: -0.5, sm: 0.5 } }} spacing={1}>
            <Typography variant="h3">Set Password</Typography>
            <Typography color="secondary">
              Continue to edeXa Central Admin
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthResetPassword email={email} verifyKey={verifyKey} />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default ResetPassword;
