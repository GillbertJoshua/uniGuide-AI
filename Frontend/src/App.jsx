import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './Authentication/Register';
import Login from './Authentication/Login';
import Profile from './Authentication/Profile';
import OtpForm from './Authentication/OtpForm';
import ForgetPassword from './Authentication/ForgetPassword';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Profile />} />
        <Route path='/otp/verify' element={<OtpForm />} />
        <Route path='/forgetpassword' element={<ForgetPassword />} />
      </Routes>
    </Router>
  )
}

export default App