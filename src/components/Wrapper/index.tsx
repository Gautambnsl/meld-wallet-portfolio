import {
  ArrowRightLeft,
  Landmark,
  LayoutDashboard,
  LogOut,
  Wallet,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../Card';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Wrapper = () => {
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
        formatter: function () {
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
      formatter: function () {
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
          <div className="wallet-container">
            <input
              type="text"
              className="wallet-input"
              placeholder="Enter your wallet address"
            />
            <button className="connect-button">Connect</button>
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

export default Wrapper;
