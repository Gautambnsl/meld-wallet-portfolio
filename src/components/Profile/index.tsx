/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from 'react';
import { getProfileApi } from '../../services/profile/getProfileApi';
import toast from 'react-hot-toast';
import { Copy, Pencil } from 'lucide-react';
import { getUserData, updateField } from '../../store/slices/userDataSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { updateProfileApi } from '../../services/profile/updateProfileApi';
import { useNavigate } from 'react-router-dom';
import EditModal from './EditModal';
import { unsubscribeAPI } from '../../services/alert/unsubscribe';

const ProfilePage = () => {
  const [modalField, setModalField] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const userData = useSelector((state: RootState) => state.userData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUserData = () => {
    getProfileApi()
      .then((response) => {
        // @ts-ignore
        delete response?.__v;
        // @ts-ignore
        delete response?._id;
        dispatch(getUserData(response));
      })
      .catch((error) => {
        console.log('Error fetching user data', error);
        toast.error(error?.data?.message);
      });
  };

  const handleCopy = (text: string) => {
    if (!text) return;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success('Copied to clipboard!');
      })
      .catch((error) => {
        console.error('Failed to copy: ', error);
        toast.error('Failed to copy to clipboard');
      });
  };

  const handlePremium = () => {
    if (userData?.premiumService === 'pro') {
      toast.success('You have already subscribed to premium');
    } else {
      toast.success('You have successfully subscribed to premium');
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      const data = {
        premiumService: 'pro',
      };
      const response: any = await updateProfileApi(data);
      if (response) {
        dispatch(updateField({ field: 'premiumService', value: 'pro' }));
        toast.success(response);
      }
    } catch (error) {
      console.error('Error updating address:', error);
      toast.error('Failed to update address');
    }
  };

  const openModal = (field: string) => {
    setModalField(field);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleUnSub = async () => {
    try {
      const response = await unsubscribeAPI();

      if (response) {
        toast.success('Alert set successfully!');
        fetchUserData();
      }
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <div className="profile-content">
        <div className="personal-info">
          <div className="card">
            <h2>Personal Information</h2>
            <div className="profile-card-info">
              <div className="profile-card">
                <div className="profile-div">
                  <span className="text-field">Name</span>
                  <div className="button-div">
                    <button
                      className="copy-button"
                      onClick={() => handleCopy(userData?.name)}
                    >
                      <Copy size={18} />
                    </button>
                    <button
                      className="edit-button"
                      onClick={() => openModal('name')}
                    >
                      <Pencil size={18} />
                    </button>
                  </div>
                </div>
                <div className="profile-card-value">{userData?.name}</div>
              </div>
              <div className="profile-card">
                <div className="profile-div">
                  <span className="text-field">Email Address</span>
                  <div className="button-div">
                    <button
                      className="copy-button"
                      onClick={() => handleCopy(userData?.email)}
                    >
                      <Copy size={18} />
                    </button>
                  </div>
                </div>
                <div className="profile-card-value">{userData?.email}</div>
              </div>
              <div className="profile-card">
                <div className="profile-div">
                  <span className="text-field">Phone Number</span>
                  <div className="button-div">
                    {userData?.phoneNumber && (
                      <button
                        className="copy-button"
                        onClick={() => handleCopy(userData?.phoneNumber)}
                      >
                        <Copy size={18} />
                      </button>
                    )}
                    <button
                      className="edit-button"
                      onClick={() => openModal('phoneNumber')}
                    >
                      <Pencil size={18} />
                    </button>
                  </div>
                </div>
                {userData?.phoneNumber && (
                  <div className="profile-card-value">
                    {userData?.phoneNumber}
                  </div>
                )}
              </div>
              <div className="profile-card">
                <div className="profile-div">
                  <span className="text-field">Wallet Address</span>
                  <div className="button-div">
                    {userData?.walletAddress && (
                      <button
                        className="copy-button"
                        onClick={() => handleCopy(userData?.walletAddress)}
                      >
                        <Copy size={18} />
                      </button>
                    )}
                    <button
                      className="edit-button"
                      onClick={() => openModal('walletAddress')}
                    >
                      <Pencil size={18} />
                    </button>
                  </div>
                </div>
                {userData?.walletAddress && (
                  <div className="profile-card-value">
                    {userData?.walletAddress}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="account-info">
          <div className="card">
            <h2>Account Statistics</h2>
            <div className="profile-field">
              <label htmlFor="visit-count">Visit Count :</label>
              <span>{userData?.visitCount}</span>
            </div>
            <div className="profile-field">
              <label htmlFor="login-count">Login Count :</label>
              <span>{userData?.loginCount}</span>
            </div>
            <div className="profile-field">
              <label htmlFor="premium-service">Premium Service :</label>
              <span className="premium-value">{userData?.premiumService}</span>
            </div>
            <div className="profile-field">
              <label htmlFor="alerts">Alerts :</label>
              <span>{userData?.isAlertOn ? 'On' : 'Off'}</span>
            </div>
          </div>

          <div className="card">
            <h2>Quick Actions</h2>
            <button className="btn btn-secondary" onClick={handlePremium}>
              Get Premium
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => navigate('/dashboard')}
            >
              View Dashboard
            </button>
            {userData?.premiumService === 'pro' && (
              <button
                className="btn btn-secondary"
                onClick={() => {
                  if (userData?.isAlertOn) {
                    handleUnSub();
                  } else {
                    navigate('/alert-services');
                  }
                }}
              >
                {userData?.isAlertOn
                  ? 'Unsubscribed Alert Services'
                  : 'Go To Alert Services'}
              </button>
            )}
          </div>
        </div>

        <EditModal
          field={modalField}
          // @ts-ignore
          value={userData[modalField]}
          label={modalField === 'walletAddress' ? 'Wallet Address' : modalField}
          isOpen={modalOpen}
          onClose={closeModal}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
