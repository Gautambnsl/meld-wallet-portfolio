import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import WalletPortfolio from './components/WalletPortfolio';
import AlertServices from './components/AlertServices';
import Login from './components/Login';
import RegisterPage from './components/Register';
import Profile from './components/Profile';
import { Provider } from 'react-redux';
import store from './store';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <Provider store={store}>
      <Toaster position="bottom-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<WalletPortfolio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/alert-services"
            element={
              <ProtectedRoute>
                <AlertServices />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
