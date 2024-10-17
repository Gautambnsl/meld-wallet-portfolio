import {
  ArrowRightLeft,
  Landmark,
  LayoutDashboard,
  LogOut,
  Wallet,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../Card';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  zoomPlugin
);

const Wrapper = () => {
  const data = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    datasets: [
      {
        label: 'Stock Price',
        data: [65, 59, 80, 81, 56, 55, 40, 70, 85, 90, 75, 100], // Sample stock prices
        fill: false,
        backgroundColor: '#E51B44',
        borderColor: '#E51B44',
        tension: 0.1, // Smooth curves
      },
    ],
  };

  // Chart options with zoom and pan functionality
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Stock Market Prices',
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'xy', // Enable panning in both x and y directions
        },
        zoom: {
          enabled: true,
          mode: 'xy', // Enable zooming in both x and y directions
          rangeMin: {
            x: null, // Set minimum zoom range for x-axis (null means no restriction)
            y: null, // Set minimum zoom range for y-axis (null means no restriction)
          },
          rangeMax: {
            x: null, // Set maximum zoom range for x-axis (null means no restriction)
            y: null, // Set maximum zoom range for y-axis (null means no restriction)
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months',
        },
        beginAtZero: true,
      },
      y: {
        title: {
          display: true,
          text: 'Price ($)',
        },
        beginAtZero: true,
      },
    },
  };

  const changePortfolio = (value: number) => {
    console.log('value', value);
  };

  return (
    <div className="wrapper-main">
      <div className="left-item">
        <Link to="/">
          <div className="logo"></div>
        </Link>
        <div className="info-user">
          <div className="bottom">
            <div className="title">
              <div className="name-user">
                <div className="name">
                  <p>All Assets</p>
                  <span>22 Assets</span>
                </div>
                <div className="status">
                  <p>$16,375.25</p>
                </div>
              </div>
            </div>
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
                <p>Landing & Borrowing</p>
              </Link>
            </div>
            <div className="menu-item">
              <Link to="/loans">
                <div className="icon">
                  <Wallet />
                </div>
                <p>Staking</p>
              </Link>
            </div>
            <div className="menu-item">
              <Link to="/swap">
                <div className="icon">
                  <ArrowRightLeft />
                </div>
                <p>Alert Services</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="logout">
          <div className="icon">
            <LogOut />
          </div>
          <p>
            <Link to="/login">Logout</Link>
          </p>
        </div>
      </div>
      <div className="main-content">
        <header className="header">
          <div className="name-pages">
            <p>Wallet Portfolio</p>
          </div>
          <div className="theme">
            <div className="burger" aria-label="Menu">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </header>
        <main className="content-loans">
          <div className="text-info-loans transparent-loans">
            <div className="block-card">
              <Card title="SUPPLY POWER">
                <div className="field">
                  <div className="left">
                    <p>1.76% APY</p>
                    <span>UP TO &lt; $0.01/M</span>
                  </div>
                </div>
              </Card>
              <Card title="BORROW POWER">
                <div className="field">
                  <div className="left">
                    <p>$2,385.76</p>
                    <span>@ 0.24%</span>
                  </div>
                </div>
              </Card>
              <Card title="STAKED">
                <div className="field">
                  <div className="left">
                    <p>$2,385.76</p>
                    <span>@ 0.24%</span>
                  </div>
                </div>
              </Card>
              <Card title="AVERAGE YIELD">
                <div className="field">
                  <div className="left">
                    <p>$2,385.76</p>
                    <span>@ 0.24%</span>
                  </div>
                </div>
              </Card>
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
                <Line data={data} options={options} />
              </div>
            </div>
          </div>
          <div className="tabs-with-statistic-coin">
            <div className="header-tabs">
              <div className="control-tabs">
                <p className="active">ASSETS</p>
                <p>NFT</p>
              </div>
            </div>
            <div className="wrapper-table" id="table-1">
              <table className="style-table" id="search_table-1">
                <tbody>
                  <tr>
                    <td>
                      <div className="name-coin">
                        <div>
                          <img src="./images/icon-coins/solana.svg" alt="" />
                        </div>
                        <div>
                          <p>Solana</p>
                          <p>SOL</p>
                        </div>
                      </div>
                      <div>
                        1.3 SOL
                        <br />
                        $1659.45
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="name-coin">
                        <div>
                          <img src="./images/icon-coins/xrp.svg" alt="" />
                        </div>
                        <div>
                          <p>XRP</p>
                          <p>XRP</p>
                        </div>
                      </div>
                      <div>
                        1.3 XRP
                        <br />
                        $1659.45
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Wrapper;
