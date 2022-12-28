
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BusinessForm from './admin/BusinessForm';
import CustomerForm from './admin/CustomerForm';
// import AwardPoint from './admin/AwardPoint.js';
import './App.css';
import Businesses from './components/pages/Businesses';
import Forgot from './components/auth/Forgot';
import Login from './components/auth/Login';
import ResetPassword from './components/auth/ResetPassword';
import { VerifyOtp } from './components/auth/VerifyOtp';
import Home from './components/Home';
import AdminInfo from './components/pages/AdminInfo';
// import { AdminLayout } from './components/layout/AdminLayout';
import Customers from './components/pages/Customers';
import Reports from './components/pages/Reports';
import SearchUser from './components/pages/SearchUser';
import UserProfile from './components/pages/UserProfile';
import MessageForm from './admin/MessageForm';
import PageNotFound from './components/pages/PageNotFound';
import ConfirmationModal from './components/modal/ConfirmationModal';


function App() {
  return (
    <div>
      <Toaster />
      <BrowserRouter>
        <div className="App">
          <div>
            <Routes>
              {/* <Route path="/" element={<ConfirmationModal />} /> */}
              <Route path="/" element={<Businesses />} />
              <Route path="/admin-info" element={<AdminInfo />} />
              <Route path="/businesses" element={<Businesses />} />
              <Route path="/customers/:business_id" element={<Customers />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/search-user" element={<SearchUser />} />
              <Route path="/user-profile" element={<UserProfile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot" element={<Forgot />} />
              <Route path="/verifyOtp" element={<VerifyOtp />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
