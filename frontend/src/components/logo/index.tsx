import { To } from 'history'
import { SxProps } from '@mui/system'
import { useTheme } from '@mui/material/styles'
import { ButtonBase } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'

interface Props {
  reverse?: boolean
  isIcon?: boolean
  sx?: SxProps
  to?: To
}

const LogoSection = ({ reverse, isIcon, sx, to }: Props) => {
  const theme = useTheme()
  const location = useLocation()
  return (
    <ButtonBase
      disableRipple
      component={Link}
      to={
        location.pathname.includes('login') ||
        location.pathname.includes('password') ||
        location.pathname === '/'
          ? '/login'
          : `${sessionStorage.getItem(
              'menu-key'
            )}/dashboard-management`
      }
    >
      {isIcon ? (
        <img
          alt="Company Logo"
          height={30}
          width={30}
          src="https://edexa-general.s3.ap-south-1.amazonaws.com/XLogo.png"
          style={{
            cursor: 'pointer'
          }}
        />
      ) : (
        <img
          alt="Company Logo"
          style={{
            height: '50%',
            width: '50%',
            cursor: 'pointer',
            marginRight: '3rem'
          }}
          src={
            theme.palette.mode === 'dark'
              ? 'https://account-files-bucket.s3.ap-south-1.amazonaws.com/central-admin/images/edeXa_Logo_Primary_White.svg'
              : 'https://edexa-general.s3.ap-south-1.amazonaws.com/logo.svg'
          }
        />
      )}
    </ButtonBase>
  )
}

export default LogoSection
