import { useState } from 'react';
import {
  FormLabel,
  Grid,
  Stack,
  Typography,
  Input,
  Button,
} from '@mui/material';
import MainCard from 'components/MainCard';
import ProfileTab from './ProfileTab';
import { getBase64 } from 'utils/functions/CommonFunctions';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { UpdateProfileApi } from 'actions/userApi/UpdateProfileApi';

// ==============================|| USER PROFILE - TAB CONTENT ||============================== //

const ProfileTabs = () => {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [showImage, setShowImage] = useState<string>('');

  // @ts-ignore
  const user = JSON.parse(localStorage.getItem('user-data'));

  const handleSave = () => {
    const formData: FormData = new FormData();
    formData.append('profilePic', selectedImage);
    UpdateProfileApi(formData)
      .then(() => {
        dispatch(
          openSnackbar({
            open: true,
            message: 'Personal profile updated successfully.',
            variant: 'alert',
            alert: {
              color: 'success',
            },
            close: false,
          })
        );
      })
      .catch((error) => {
        return error;
      });
  };

  return (
    <MainCard>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="flex-end">
            {selectedImage && (
              <Button
                color="primary"
                onClick={() => {
                  handleSave();
                  setSelectedImage('');
                }}
              >
                Save 
              </Button>
            )}
          </Stack>
          <Stack spacing={2.5} alignItems="center">
            <FormLabel>
              <label htmlFor="imageUrl">
                <img
                  alt="Profile"
                  style={{
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '1px dotted #090909',
                    cursor: 'pointer',
                  }}
                  src={showImage !== '' ? showImage : user?.profilePic}
                  height="100"
                  width="100"
                />
              </label>
              <Input
                type="file"
                placeholder="Image"
                id="imageUrl"
                name="imageUrl"
                sx={{ marginTop: '25px', display: 'none' }}
                onChange={(e: any) => {
                  if (e?.target?.files?.[0]?.name?.includes('.svg')) {
                    dispatch(
                      openSnackbar({
                        open: true,
                        message:
                          'Please provide a file format that is either PNG, JPEG, or JPG.',
                        variant: 'alert',
                        alert: {
                          color: 'error',
                        },
                        close: false,
                      })
                    );
                  } else {
                    setSelectedImage(e.target.files[0]);
                    getBase64(e.target.files[0])
                      .then((response: any) => {
                        setShowImage(response);
                      })
                      .catch((error) => {
                        return error;
                      });
                  }
                }}
              />
            </FormLabel>
            <Stack spacing={0.5} alignItems="center">
              <Typography variant="h5">{user?.firstName}</Typography>
              <Typography color="secondary">
                {user?.adminRole?.roleName
                  .split('-')
                  .map(
                    (word: string) =>
                      word.charAt(0).toUpperCase() + word.slice(1)
                  )
                  .join(' ')}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <ProfileTab />
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default ProfileTabs;
