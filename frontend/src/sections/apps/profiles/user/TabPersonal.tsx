import { RefObject, useState } from 'react'
import { useOutletContext } from 'react-router'

// material-ui
import {
  Box,
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  Stack,
  TextField
} from '@mui/material'

// third party
import * as Yup from 'yup'
import { Formik } from 'formik'

// project import
import MainCard from 'components/MainCard'
import useAuth from 'hooks/useAuth'
import { getProfileAPi } from 'actions/userApi/getProfileAPI'
import { StatusCode } from 'utils/constant/StatusCode'
import MetaTag from 'utils/common/MetaTag'

function useInputRef() {
  return useOutletContext<RefObject<HTMLInputElement>>()
}
//@ts-ignore
const user = JSON.parse(localStorage.getItem('user-data'))

// ==============================|| TAB - PERSONAL ||============================== //

const TabPersonal = () => {
  const inputRef = useInputRef()
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const { updateProfile } = useAuth()
  const { setFieldValue }: any = Formik

  const getProfiledata = () => {
    getProfileAPi()
      .then((response) => {
        if (response.status === StatusCode.success) {
          setIsEdit(false)
          localStorage.setItem(
            'user-data',
            JSON.stringify(response?.data)
          )
          setFieldValue('firstName', response?.data?.firstName)
          setFieldValue('lastName', response?.data?.lastName)
        }
      })
      .catch((error) => {
        return error
      })
  }

  const handleEdit = () => {
    setIsEdit(true)
  }
  return (
    <>
      <MetaTag title={'Personal'} />
      <MainCard
        content={false}
        title="Personal Information"
        sx={{ '& .MuiInputLabel-root': { fontSize: '0.875rem' } }}
        secondary={
          <Button
            disabled={isEdit}
            color="primary"
            onClick={handleEdit}
          >
            Edit Profile
          </Button>
        }
      >
        <Formik
          initialValues={{
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
            role: user?.adminRole?.roleName
              .split('-')
              .map(
                (word: string) =>
                  word.charAt(0).toUpperCase() + word.slice(1)
              )
              .join(' '),
            submit: null
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string()
              .max(255)
              .required('First Name is required.'),
            lastName: Yup.string()
              .max(255)
              .required('Last Name is required.')
          })}
          onSubmit={async (
            values,
            { setErrors, setStatus, setSubmitting }
          ) => {
            try {
              await updateProfile(
                values.firstName,
                values.lastName
              ).then(
                () => {
                  getProfiledata()
                  setStatus({ success: false })
                  setSubmitting(false)
                },
                (err: any) => {
                  setStatus({ success: false })
                  setErrors({ submit: err.message })
                  setSubmitting(false)
                }
              )
            } catch (err: any) {
              setStatus({ success: false })
              setErrors({ submit: err.message })
              setSubmitting(false)
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            touched,
            values
          }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Box sx={{ p: 2.5 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="personal-first-name">
                        First Name{' '}
                        {isEdit && (
                          <span style={{ color: 'red' }}>*</span>
                        )}
                      </InputLabel>
                      <TextField
                        fullWidth
                        id="personal-first-name"
                        value={values?.firstName}
                        name="firstName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="First Name"
                        autoFocus
                        inputRef={inputRef}
                        disabled={!isEdit}
                      />
                      {touched?.firstName && errors?.firstName && (
                        <FormHelperText
                          error
                          id="personal-first-name-helper"
                        >
                          {/* @ts-ignore */}
                          {errors?.firstName}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="personal-last-name">
                        Last Name{' '}
                        {isEdit && (
                          <span style={{ color: 'red' }}>*</span>
                        )}
                      </InputLabel>
                      <TextField
                        fullWidth
                        id="personal-last-name"
                        value={values?.lastName}
                        name="lastName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Last Name"
                        disabled={!isEdit}
                      />
                      {touched?.lastName && errors?.lastName && (
                        <FormHelperText
                          error
                          id="personal-last-name-helper"
                        >
                          {/* @ts-ignore */}
                          {errors?.lastName}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="personal-email">
                        Email Address
                      </InputLabel>
                      <TextField
                        type="email"
                        disabled
                        fullWidth
                        value={values?.email}
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        id="personal-email"
                        placeholder="Email Address"
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="my-role">
                        My Role
                      </InputLabel>
                      <TextField
                        type="role"
                        disabled
                        fullWidth
                        value={values?.role}
                        name="role"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        id="my-role"
                        placeholder="My Role"
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
              {isEdit && (
                <Box sx={{ p: 2.5 }}>
                  <Stack
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    spacing={2}
                    sx={{ mt: 2.5 }}
                  >
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => setIsEdit(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" variant="contained">
                      Save
                    </Button>
                  </Stack>
                </Box>
              )}
            </form>
          )}
        </Formik>
      </MainCard>
    </>
  )
}

export default TabPersonal
