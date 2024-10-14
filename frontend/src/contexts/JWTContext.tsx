import React, { createContext, useEffect, useReducer } from 'react';

// third-party
import jwtDecode from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT } from 'store/reducers/actions';
import authReducer from 'store/reducers/auth';

// project import
import Loader from 'components/Loader';
import { KeyedObject } from 'types/root';
import { AuthProps, JWTContextType } from 'types/auth';
import { LoginApi } from 'actions/authApi/LoginApi';
import { ResetPasswordApi } from 'actions/authApi/ResetPasswordApi';
import { UpdateProfileApi } from 'actions/userApi/UpdateProfileApi';
import { cookieKeys } from 'utils/constant/Constants';
import { getDecryptedCookie } from 'utils/functions/CommonFunctions';
import { ChangePasswordApi } from 'actions/userApi/ChangePasswordApi';
import { StatusCode } from 'utils/constant/StatusCode';
import { useLocation, useNavigate } from 'react-router';

// constant
const initialState: AuthProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: null,
};

const verifyToken: (st: string) => boolean = (serviceToken) => {
  if (!serviceToken) {
    return false;
  }
  const decoded: KeyedObject = jwtDecode(serviceToken);
  /**
   * Property 'exp' does not exist on type '<T = unknown>(token: string, options?: JwtDecodeOptions | undefined) => T'.
   */
  return decoded.exp > Date.now() / 1000;
};

const setPermission = (permissions?: any) => {
  if (permissions) {
    localStorage.setItem('admin-permission', JSON.stringify(permissions));
  } else {
    localStorage.removeItem('admin-permission');
  }
};
const setUserData = (userData?: any) => {
  if (userData) {
    localStorage.setItem('user-data', JSON.stringify(userData));
  } else {
    localStorage.removeItem('user-data');
  }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //

const JWTContext = createContext<JWTContextType | null>(null);
export const JWTProvider = ({ children }: { children: React.ReactElement }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();
  const location = useLocation();

  const init = async () => {
    try {
      const serviceToken = getDecryptedCookie(cookieKeys.token);
      if (serviceToken && verifyToken(serviceToken)) {
        dispatch({
          type: LOGIN,
          payload: {
            isLoggedIn: true,
          },
        });
        // For set password and reset password link
      } else if (location?.pathname?.includes('password')) {
        dispatch({
          type: LOGOUT,
        });
      } else {
        dispatch({
          type: LOGOUT,
        });
        navigate('/login');
      }
    } catch (err) {
      dispatch({
        type: LOGOUT,
      });
    }
  };

  useEffect(() => {
    init();
  }, []);

  const login = async (email: string, password: string) => {
    LoginApi({ email, password }).then((res: any) => {
      const currentProject = 'admin';
      sessionStorage.setItem('menu-key', currentProject);
      const user = res.data.user;
      const token = res.data.token;
      setUserData(user);
      setPermission(res.data.user.permission);
      dispatch({
        type: LOGIN,
        payload: {
          isLoggedIn: true,
          user,
          token,
          currentProject,
        },
      });
    });
  };

  const logout = () => {
    setPermission(null);
    dispatch({ type: LOGOUT });
  };

  const resetPassword = async (email: string) => {
    ResetPasswordApi({ email })
      .then((res: any) => {
        navigate('/check-mail', { replace: true });
        return res;
      })
      .catch((err) => {
        return err;
      });
  };

  const updateProfile = async (firstName: string, lastName: string) => {
    UpdateProfileApi({ firstName, lastName }).then((res: any) => {
      return res;
    });
  };

  const changePassword = async (oldPassword: string, newPassword: string) => {
    ChangePasswordApi({ oldPassword, newPassword }).then((res: any) => {
      if (res.status === StatusCode.success) {
        dispatch({ type: LOGOUT });
      }
    });
  };

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return (
    <JWTContext.Provider
      value={{
        ...state,
        login,
        logout,
        resetPassword,
        changePassword,
        updateProfile,
      }}
    >
      {children}
    </JWTContext.Provider>
  );
};

export default JWTContext;
