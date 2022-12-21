
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BusinessForm from './admin/BusinessForm';
import CustomerForm from './admin/CustomerForm';
// import AwardPoint from './admin/AwardPoint.js';
import './App.css';
import Businesses from './components/pages/Businesses';
// import Forgot from './components/auth/Forgot';
// import Login from './components/auth/Login';
// import ResetPassword from './components/auth/ResetPassword';
// import { VerifyOtp } from './components/auth/VerifyOtp';
import Home from './components/Home';
import AdminInfo from './components/pages/AdminInfo';
// import { AdminLayout } from './components/layout/AdminLayout';
import Customers from './components/pages/Customers';
import Reports from './components/pages/Reports';
import SearchUser from './components/pages/SearchUser';

function App() {
  return (
    <div>
      <Toaster />
      <BrowserRouter>
        <div className="App">
          <div>
            {/* <CustomerForm /> */}
            {/* <BusinessForm /> */}
            {/* <Businesses /> */}
            {/* <Customers /> */}
            {/* <AdminLayout /> */}
            {/* <AwardPoint /> */}
            <Routes>
              <Route path="/" />
              <Route path="/AdminInfo" element={<AdminInfo />} />
              <Route path="/Businesses" element={<Businesses />} />
              <Route path="/Reports" element={<Reports />} />
              <Route path="/Search-User" element={<SearchUser />} />
              SearchUser
            </Routes>
            {/* 
            <Route path="/login" element={<Login />} />
              <Route path="/forgot" element={<Forgot />} />
              <Route path="verifyOtp" element={<VerifyOtp />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Routes> */}
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
