
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
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
import { useSelector } from 'react-redux';
import UserTransactions from './components/pages/user/UserTransactions';
import UserSupport from './components/pages/user/UserSupport';
import UserSelfProfile from './components/pages/user/UserSelfProfile';


function App() {
  const { is_admin, token } = useSelector(state => state.loginSlice.allData);
  // const navigate = useNavigate();
  // if(!token?.access) {
  //   window.location.replace('/login');
  // }
  // console.log(is_admin, "is admin");
  return (
    <div>
      <Toaster />
      <BrowserRouter>
        <div className="App">
          <div>
          <Routes>
            <Route path="/" element={is_admin ? <Businesses /> : <UserTransactions />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/verifyOtp" element={<VerifyOtp />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/admin-info" element={<AdminInfo />} />
            <Route path="/businesses" element={<Businesses />} />
            <Route path="/customers/:business_id" element={<Customers />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/search-user" element={<SearchUser />} />
            <Route path="/user-profile/:member_id" element={<UserProfile />} />
            <Route path="/user/transaction" element={<UserTransactions />} />
            <Route path="/user/profile" element={<UserSelfProfile />} />
            <Route path="/user/support" element={<UserSupport />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
