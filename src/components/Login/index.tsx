import { useFormik } from 'formik';
import * as Yup from 'yup';
import { STATUS_CODE } from '../../utils/constants/StatusCode';
import toast from 'react-hot-toast';
import { setEncryptedCookie } from '../../utils/functions/commonFunctions';
import { cookieKeys } from '../../utils/constants/constants';
import { setLogin } from '../../store/slices/authSlice';
import { setUserLoginData } from '../../store/slices/userSlice';
import { useDispatch } from 'react-redux';
import { loginAPI } from '../../services/auth/login';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      loginAPI(values)
        .then((response) => {
          if (response.status === STATUS_CODE.ok) {
            const { data, message } = response;
            toast.success(message);
            dispatch(setLogin(true));
            dispatch(setUserLoginData(response?.data));
            setEncryptedCookie(cookieKeys.cookieUser, data);
            navigate('/dashboard');
          }
        })
        .catch((error) => {
          toast.error(error?.data?.message);
        });
    },
  });

  const { handleSubmit, getFieldProps, validateForm } = formik;

  const handleValidationAndSubmit = () => {
    validateForm().then((errors) => {
      if (errors?.email) {
        toast.error(errors?.email);
      } else if (errors?.password) {
        toast.error(errors?.password);
      } else {
        handleSubmit();
      }
    });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-icon">🔒</div>
        <h2 className="login-title">Login to MELD</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleValidationAndSubmit();
          }}
        >
          <div className="input-group">
            <label className="input-label" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="input-field"
              {...getFieldProps('email')}
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="password">
              Password
            </label>
            <div className="password-input-container">
              <input
                type="password"
                id="password"
                className="input-field"
                {...getFieldProps('password')}
              />
            </div>
          </div>

          <button type="submit" className="login-button">
            LOGIN
          </button>
        </form>

        <div className="register-text">
          Don't have an account?{' '}
          <span className="register-link" onClick={() => navigate('/register')}>
            Register here
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
