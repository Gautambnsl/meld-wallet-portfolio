import { CircularProgress } from '@mui/material'
import { styled } from '@mui/system'
import Box from '@mui/material/Box'
export const CircularLoading = () => (
  <>
    <CircularProgress
      size={40}
      sx={{
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 2
      }}
    />
    <DisabledBackground />
  </>
)

const DisabledBackground = styled(Box)({
  width: '100%',
  height: '100%',
  position: 'fixed',
  background: '#ccc',
  opacity: 0.3,
  zIndex: 99
})
