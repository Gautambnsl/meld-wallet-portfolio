import {
  ArrowRightLeft,
  Landmark,
  LayoutDashboard,
  LogOut,
  User,
  Wallet,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState } from 'react';
import { removedCookie } from '../../utils/functions/commonFunctions';
import { cookieKeys } from '../../utils/constants/constants';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { getProfileApi } from '../../services/profile/getProfileApi';
import { updateField, getUserData } from '../../store/slices/userDataSlice';
import { updateProfileApi } from '../../services/profile/updateProfileApi';

const WalletPortfolio = () => {
  const [selectedTab, setSelectedTab] = useState<string>('assets');

  const { isAuth } = useSelector((state: RootState) => state.auth);
  const userData = useSelector((state: RootState) => state.userData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUserData = () => {
    getProfileApi()
      .then((response) => {
        delete response?.__v;
        delete response?._id;
        dispatch(getUserData(response));
      })
      .catch((error) => {
        console.log('Error fetching user data', error);
        toast.error(error?.data?.message);
      });
  };

  const handleFieldChange = (field: string, value: string) => {
    dispatch(updateField({ field, value }));
  };

  const handleSubmit = async () => {
    try {
      const data = {
        tempAddress: userData.tempAddress,
      };
      const response = await updateProfileApi(data);
      if (response) {
        dispatch(
          updateField({ field: 'tempAddress', value: userData.tempAddress })
        );
        toast.success(response);
      }
    } catch (error) {
      console.error('Error updating address:', error);
      toast.error('Failed to update address');
    }
  };

  const options = {
    chart: {
      type: 'area',
      backgroundColor: '#252630',
    },
    title: {
      text: null,
    },
    xAxis: {
      categories: [
        'Oct 8',
        'Oct 9',
        'Oct 10',
        'Oct 11',
        'Oct 12',
        'Oct 13',
        'Oct 14',
      ],
      tickmarkPlacement: 'on',
      title: {
        text: null,
      },
      labels: {
        style: {
          color: '#fff',
        },
      },
      gridLineColor: 'transparent',
    },
    yAxis: {
      title: {
        text: null,
      },
      labels: {
        style: {
          color: '#fff',
        },
        formatter: function (
          this: Highcharts.AxisLabelsFormatterContextObject
        ): string {
          return '$' + this?.value;
        },
      },
      gridLineColor: 'transparent',
      min: 0,
    },
    tooltip: {
      shared: true,
      crosshairs: true,
      backgroundColor: '#252630',
      borderColor: '#E51B44',
      style: {
        color: '#fff',
      },
      formatter: function (
        this: Highcharts.AxisLabelsFormatterContextObject
      ): string {
        return `Balance: $${this?.y}<br>${this?.x}`;
      },
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, '#E51B44'],
            [1, 'rgba(229, 27, 68, 0.1)'],
          ],
        },
        marker: {
          enabled: true,
          fillColor: '#E51B44',
          radius: 4,
        },
        lineWidth: 2,
        states: {
          hover: {
            lineWidth: 2,
          },
        },
        threshold: null,
      },
    },
    series: [
      {
        name: 'Balance',
        data: [0, 0, 0, 0, 0, 1660, 1660],
        color: '#E51B44',
      },
    ],
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
  };

  const changePortfolio = (value: number) => {
    console.log('value', value);
  };

  const handleClick = () => {
    if (userData?.premiumService === 'pro') {
      navigate('/alert-services');
    } else {
      toast.error('Please purchase premium from the profile page.');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="wrapper-main">
      <div className="left-item">
        <Link to="/">
          <div className="logo"></div>
        </Link>
        <div className="info-user">
          <div className="header">
            <p className="title">All Assets</p>
            <span className="total-assets">22 Assets</span>
          </div>
          <div className="asset-details">
            <p className="asset-value">$16,375.25</p>
          </div>
        </div>

        <div className="main-menu">
          <div className="menu">
            <div className="menu-item active">
              <Link to="/">
                <div className="icon">
                  <LayoutDashboard />
                </div>
                <p>Wallet Portfolio</p>
              </Link>
            </div>
            <div className="menu-item">
              <Link to="/markets">
                <div className="icon">
                  <Landmark />
                </div>
                <p>Lending & Borrowing</p>
              </Link>
            </div>
            <div className="menu-item">
              <a
                href="https://devbhuptani.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="icon">
                  <Wallet />
                </div>
                <p>Staking</p>
              </a>
            </div>
            <div className="menu-item" onClick={handleClick}>
              <a>
                <div className="icon">
                  <ArrowRightLeft />
                </div>
                <p>Alert Services</p>
              </a>
            </div>
            <div className="menu-item">
              <Link to="/profile">
                <div className="icon">
                  <User />
                </div>
                <p>User Profile</p>
              </Link>
            </div>
          </div>
        </div>
        {isAuth && (
          <div
            className="logout"
            onClick={() => {
              toast.success('Logout successfully');
              localStorage.clear();
              removedCookie(cookieKeys.cookieUser);
              navigate('/login');
            }}
          >
            <div className="icon">
              <LogOut />
            </div>
            <p>
              <Link to="/login">Logout</Link>
            </p>
          </div>
        )}
      </div>
      <div className="main-content">
        <header className="header">
          <div className="name-pages">
            <p>Wallet Portfolio</p>
          </div>
        </header>
        <main className="content-loans">
          <div className="text-info-loans transparent-loans">
            <div className="block-card">
              <div className="card">
                <p className="title">Supply Power</p>
                <h3 className="value">1.76% APY</h3>
                <span className="percentage">UP TO &lt; $0.01/M</span>
              </div>
              <div className="card">
                <p className="title">Borrow Power</p>
                <h3 className="value">$2,385.76</h3>
                <span className="percentage">@ 0.24%</span>
              </div>
              <div className="card">
                <p className="title">Staked</p>
                <h3 className="value">$2,385.76</h3>
                <span className="percentage">@ 0.24%</span>
              </div>
              <div className="card">
                <p className="title">Average Yield</p>
                <h3 className="value">$2,385.76</h3>
                <span className="percentage">@ 0.24%</span>
              </div>
            </div>
          </div>
          <div className="wallet-container">
            <input
              type="text"
              className="wallet-input"
              placeholder="Enter your temp address"
              value={userData?.tempAddress}
              onChange={(e) => handleFieldChange('tempAddress', e.target.value)}
            />
            <button className="connect-button" onClick={handleSubmit}>
              Submit Address
            </button>
          </div>
          <div className="tabs-with-statistic-coin">
            <div className="header-tabs">
              <div className="control-tabs">
                <p
                  className={selectedTab === 'assets' ? 'active' : ''}
                  onClick={() => setSelectedTab('assets')}
                >
                  ASSETS
                </p>
                <p
                  className={selectedTab === 'nft' ? 'active' : ''}
                  onClick={() => setSelectedTab('nft')}
                >
                  NFT
                </p>
              </div>
            </div>
            <div className="wrapper-table" id="table-1">
              {selectedTab === 'assets' && (
                <table className="style-table" id="search_table-1">
                  <tbody>
                    <tr>
                      <td>
                        <div className="name-coin">
                          <div className="coin-box" />
                          <p>Solana</p>
                        </div>
                        <div className="coin-price">
                          1.3 SOL
                          <p>$1659.45</p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="name-coin">
                          <div className="coin-box" />
                          <p>Solana</p>
                        </div>
                        <div className="coin-price">
                          1.3 SOL
                          <p>$1659.45</p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="name-coin">
                          <div className="coin-box" />
                          <p>Solana</p>
                        </div>
                        <div className="coin-price">
                          1.3 SOL
                          <p>$1659.45</p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="name-coin">
                          <div className="coin-box" />
                          <p>XRP</p>
                        </div>
                        <div className="coin-price">
                          1.3 SOL
                          <p>$1659.45</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
              {selectedTab === 'nft' && (
                <div className="nft-div">
                  <div className="nft-card">
                    <img
                      src="https://images.unsplash.com/photo-1721332153282-3be1f363074d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMDk1MTB8MXwxfGFsbHwxfHx8fHx8fHwxNzI5MjY4NDQ1fA&ixlib=rb-4.0.3&q=80&w=1080"
                      alt="Meld Bank Man"
                      className="nft-image"
                    />
                    <div className="nft-info">
                      <p className="nft-name">Meld Bank Man</p>
                      <p className="nft-wallet">#4d656c642042616e6</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="graph-block">
            <div className="title">My Portfolio</div>
            <div className="portfolio-control">
              <div className="number-pages portfolio-buttons">
                <p
                  className="p-dat active"
                  id="7d"
                  onClick={() => changePortfolio(0)}
                >
                  1H
                </p>
                <p className="p-dat" id="1m" onClick={() => changePortfolio(1)}>
                  1D
                </p>
                <p
                  className="p-dat"
                  id="6md"
                  onClick={() => changePortfolio(2)}
                >
                  7D
                </p>
                <p
                  className="p-dat"
                  id="1yr"
                  onClick={() => changePortfolio(3)}
                >
                  30D
                </p>
                <p className="p-dat" id="1m" onClick={() => changePortfolio(1)}>
                  60D
                </p>
                <p className="p-dat" id="1m" onClick={() => changePortfolio(1)}>
                  90D
                </p>
                <p className="p-dat" id="1m" onClick={() => changePortfolio(1)}>
                  6M
                </p>
                <p className="p-dat" id="1m" onClick={() => changePortfolio(1)}>
                  1Y
                </p>
                <p className="p-dat" id="1m" onClick={() => changePortfolio(1)}>
                  ALL
                </p>
              </div>
            </div>
            <div className="live-table">
              <div className="rere">
                <HighchartsReact highcharts={Highcharts} options={options} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default WalletPortfolio;
