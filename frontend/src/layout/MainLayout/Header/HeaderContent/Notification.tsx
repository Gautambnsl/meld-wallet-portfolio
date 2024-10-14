import { useRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Badge,
  Box,
} from '@mui/material';

// project import
import IconButton from 'components/@extended/IconButton';

// assets
import { BellFilled, BellOutlined } from '@ant-design/icons';

// types
import { ThemeMode } from 'types/config';
import { useLocation, useNavigate } from 'react-router';

// ==============================|| HEADER CONTENT - NOTIFICATION ||============================== //

const Notification = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const anchorRef = useRef<any>(null);
  const [open] = useState(false);

  const iconBackColorOpen = theme.palette.mode === ThemeMode.DARK ? 'grey.200' : 'grey.300';
  const iconBackColor = theme.palette.mode === ThemeMode.DARK ? 'background.default' : 'grey.100';

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <IconButton
        color="secondary"
        variant="light"
        sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : iconBackColor }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={() => navigate('/notification')}
      >
        <Badge badgeContent={JSON.parse(localStorage.getItem('user-data')!)?.notification} color="primary">
          {
            location.pathname.split('/')[1] === 'notification' ? <BellFilled /> : <BellOutlined />
          }
        </Badge>
      </IconButton>
    </Box>
  );
};

export default Notification;
