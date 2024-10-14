// material-ui
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  FormControlLabel,
  Stack,
  Typography,
} from '@mui/material';

// project import
import Avatar from 'components/@extended/Avatar';
import { PopupTransition } from 'components/@extended/Transitions';

// assets
import { InfoOutlined } from '@ant-design/icons';
import { project } from 'utils/constant/Constants';
import { useLocation } from 'react-router';

// types
interface Props {
  open: boolean;
  handleClose: () => void;
  handleActiveInactive: (notify?: boolean) => void;
  toggleStatus?: any;
  checked?: boolean;
  setChecked?: any;
  module: string;
  notify?: boolean;
  setNotify?: any;
}

// ==============================|| CUSTOMER - DELETE ||============================== //

export default function AlertToggle({
  open,
  handleClose,
  handleActiveInactive,
  toggleStatus,
  checked,
  setChecked,
  module,
  notify,
  setNotify,
}: Readonly<Props>) {
  const location = useLocation();
  const userManagement = `/${project.admin}/user-management`;

  return (
    <Dialog
      open={open}
      keepMounted
      TransitionComponent={PopupTransition}
      maxWidth="xs"
      aria-labelledby="column-delete-title"
      aria-describedby="column-delete-description"
    >
      <DialogContent sx={{ mt: 2, my: 1 }}>
        <Stack alignItems="center" spacing={3.5}>
          <Avatar
            color="primary"
            sx={{ width: 72, height: 72, fontSize: '1.75rem' }}
          >
            <InfoOutlined />
          </Avatar>
          <Stack spacing={2}>
            {module.includes('role') && (
              <>
                <Typography variant="h4" align="center">
                  Are your sure to{' '}
                  {toggleStatus === '0' ? 'Inactive' : 'Active'} the Role?
                </Typography>
                {toggleStatus === '0' ? (
                  <Typography variant="h6" component={'span'} align="center">
                    Note : To whom this role is assigned, those users will not
                    be able to login
                  </Typography>
                ) : (
                  <Typography variant="h6" component={'span'} align="center">
                    <Checkbox
                      checked={checked}
                      onClick={() => setChecked(!checked)}
                    />
                    Let all users to login again
                  </Typography>
                )}
              </>
            )}

            {module.includes('admin') && (
              <Typography variant="h4" align="center">
                Are your sure to {toggleStatus === '0' ? 'Inactive' : 'Active'}{' '}
                the User?
              </Typography>
            )}

            {module.includes('module') && (
              <Typography variant="h4" align="center">
                Are your sure to {toggleStatus === '1' ? 'Inactive' : 'Active'}{' '}
                the module?
              </Typography>
            )}

            {module.includes('error') && (
              <Typography variant="h4" align="center">
                Are your sure to {!toggleStatus ? 'Inactive' : 'Active'} this
                log?
              </Typography>
            )}

            {module.includes('nft') && (
              <Typography variant="h4" align="center">
                Are your sure to {!toggleStatus ? 'unban' : 'ban'} this NFT?
              </Typography>
            )}
          </Stack>
          {userManagement === location.pathname && toggleStatus === '0' && (
            <FormControlLabel
              control={
                <Checkbox
                  name="notifyUser"
                  onChange={(e) => {
                    setNotify(e.target.checked);
                  }}
                />
              }
              label="Notify User"
            />
          )}
          <Stack direction="row" spacing={2} sx={{ width: 1 }}>
            <Button
              fullWidth
              onClick={() => handleClose()}
              color="secondary"
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              onClick={() => handleActiveInactive(notify)}
              autoFocus
            >
              Update
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
