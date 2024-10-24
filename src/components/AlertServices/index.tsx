import toast from 'react-hot-toast';
import { subscribeAPI } from '../../services/alert/subscribe';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { updateField } from '../../store/slices/userDataSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AlertServices = () => {
  const [alertMethods, setAlertMethods] = useState({
    email: false,
    phone: false,
    sms: false,
  });
  const [error, setError] = useState('');

  const userData = useSelector((state: RootState) => state.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFieldChange = (field: string, value: string) => {
    dispatch(updateField({ field, value }));
  };

  const handleCheckboxChange = (method: string) => {
    setAlertMethods((prevState) => ({
      ...prevState,
      [method]: !prevState[method],
    }));
  };

  const validateForm = () => {
    if (!userData.alertAddress) {
      setError('Please enter a valid alert address.');
      toast.error('Please enter a valid alert address.');
      return false;
    }

    const alertType = Object.values(alertMethods).some((method) => method);
    if (!alertType) {
      setError('Please select at least one alert option.');
      toast.error('Please select at least one alert option.');
      return false;
    }

    setError('');
    return true;
  };

  const handleSetAlert = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const data = {
        alertAddress: userData.alertAddress,
        alertType: Object.keys(alertMethods).filter((key) => alertMethods[key]),
      };

      const response = await subscribeAPI(data);

      if (response) {
        toast.success('Alert set successfully!');
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className="alert-container">
      <div className="alert-box">
        <div className="alert-icon">🔔</div>
        <h2 className="alert-title">MELD Alerts</h2>

        <div className="alert-input-group">
          <span className="alert-input-label">Please notify me via</span>
          <div className="alert-input-checkboxes">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={alertMethods.email}
                onChange={() => handleCheckboxChange('email')}
              />
              email
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={alertMethods.phone}
                onChange={() => handleCheckboxChange('phone')}
              />
              phone
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={alertMethods.sms}
                onChange={() => handleCheckboxChange('sms')}
              />
              sms
            </label>
          </div>
        </div>

        <div className="alert-input-group">
          <span className="alert-input-label">when my MELD</span>
        </div>

        <input
          className="alert-input-field"
          placeholder="Enter your Alert address"
          value={userData?.alertAddress || ''}
          onChange={(e) => handleFieldChange('alertAddress', e.target.value)}
        />

        <p className="alert-footer">completes a transaction.</p>
        <button className="alert-button" onClick={handleSetAlert}>
          SET ALERT
        </button>
        <button className="alert-button" onClick={() => navigate('/profile')}>
          Go to Profile Page
        </button>
      </div>
    </div>
  );
};

export default AlertServices;
