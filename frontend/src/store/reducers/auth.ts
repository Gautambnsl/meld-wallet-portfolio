// action - state management
import {
  getDecryptedCookie,
  removeCookie,
  setEncryptedCookie
} from 'utils/functions/CommonFunctions'
import { REGISTER, LOGIN, LOGOUT } from './actions'

// types
import { AuthProps, AuthActionProps } from 'types/auth'
import { cookieKeys } from 'utils/constant/Constants'

// initial state
export const initialState: AuthProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: null,
  token: getDecryptedCookie(cookieKeys.token) || '',
  currentProject: sessionStorage.getItem('menu-key') || ''
}

// ==============================|| AUTH REDUCER ||============================== //

const auth = (state = initialState, action: AuthActionProps) => {
  switch (action.type) {
    case REGISTER: {
      const { user } = action.payload!
      return {
        ...state,
        user
      }
    }
    case LOGIN: {
      const { user, token, currentProject } = action.payload!
      setEncryptedCookie(cookieKeys.token, token)
      return {
        ...state,
        isLoggedIn: true,
        isInitialized: true,
        user,
        currentProject
      }
    }
    case LOGOUT: {
      removeCookie(cookieKeys.token)
      localStorage.clear()
      sessionStorage.clear()
      return {
        ...state,
        isLoggedIn: false,
        isInitialized: true,
        currentProject: '',
        user: null
      }
    }
    default: {
      return { ...state }
    }
  }
}

export default auth
