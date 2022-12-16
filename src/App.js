
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Forgot from './components/auth/Forgot';
import Login from './components/auth/Login';
import ResetPassword from './components/auth/ResetPassword';
import { VerifyOtp } from './components/auth/VerifyOtp';
import Home from './components/Home';

function App() {
  return (
    <div>
      <Toaster />
      <BrowserRouter>
        <div className="App">
          <div>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/forgot' element={<Forgot />} />
              <Route path='verifyOtp' element={<VerifyOtp />} />
              <Route path='resetPassword' element={<ResetPassword />} />
            </Routes>
          </div>
        </div >
      </BrowserRouter>
    </div>
  )
}

export default App;
