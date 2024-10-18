const AlertServices = () => {
    return (
      <div className="alert-container">
        <div className="alert-box">
          <div className="alert-icon">🔔</div>
          <h2 className="alert-title">MELD Alerts</h2>
  
          <div className="input-group">
            <span className="input-label">Please</span>
            <select className="input-select">
              <option>Email</option>
              <option>Call</option>
              <option>SMS</option>
            </select>
          </div>
  
          <div className="input-group">
            <span className="input-label">me when my</span>
            <select className="input-select">
              <option>MELD</option>
              <option>BTC</option>
              <option>USDT</option>
            </select>
          </div>
  
          <p className="alert-footer">wallet address completes a transaction.</p>
          <button className="alert-button">SET ALERT</button>
        </div>
      </div>
    );
  };
  
  export default AlertServices;
  