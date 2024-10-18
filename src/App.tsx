import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import WalletPortfolio from './components/WalletPortfolio';
import AlertServices from './components/AlertServices';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<WalletPortfolio />} />
        <Route path="/alert-services" element={<AlertServices />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
