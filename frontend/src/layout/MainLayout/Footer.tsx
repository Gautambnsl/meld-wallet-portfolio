import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Link, Stack, Typography } from '@mui/material';

const Footer = () => (
  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: '24px 16px 0px', mt: 'auto' }}>
    <Typography variant="caption">Powered by edeXa Business Blockchain &copy; {new Date().getFullYear()}</Typography>
    <Stack spacing={1.5} direction="row" justifyContent="space-between" alignItems="center">
      {/* <Link component={RouterLink} to="#" target="_blank" variant="caption" color="textPrimary">
        About us
      </Link> */}
      <Link component={RouterLink} to="https://edexa.network/privacy-policy" target="_blank" variant="caption" color="textPrimary">
        Privacy
      </Link>
      <Link component={RouterLink} to="https://edexa.network/terms-and-conditions" target="_blank" variant="caption" color="textPrimary">
        Terms
      </Link>
    </Stack>
  </Stack>
);

export default Footer;
