import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerAPI } from '../../services/auth/register';
import { STATUS_CODE } from '../../utils/constants/StatusCode';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, 'Name must be at least 2 characters long')
        .required('Full Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .required('Password is required'),
    }),
    onSubmit: (values) => {
      registerAPI(values)
        .then((response) => {
          if (response.status === STATUS_CODE.created) {
            const { message } = response;
            toast.success(message);
            navigate('/login');
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
      if (errors?.name) {
        toast.error(errors?.name);
      } else if (errors?.email) {
        toast.error(errors?.email);
      } else if (errors?.password) {
        toast.error(errors?.password);
      } else {
        handleSubmit();
      }
    });
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="register-icon">📝</div>
        <h2 className="register-title">Create Account</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleValidationAndSubmit();
          }}
        >
          <div className="input-group">
            <label className="input-label" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="input-field"
              {...getFieldProps('name')}
            />
          </div>

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

          <button type="submit" className="register-button">
            REGISTER
          </button>
        </form>

        <div className="register-text">
          Already have an account?{' '}
          <span className="register-link" onClick={() => navigate('/login')}>
            Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
