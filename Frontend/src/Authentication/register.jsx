import React  ,{useState}from 'react'
import '../assets/Style/Register.css';
import Logo from '../assets/Image/UniGuide 1.png';

const Register = () => {
  const [FormData , setFormData] =useState({
    email : "",
    first_name : "",
    last_name: "",
    password1: "",
    password2 :"",

  })

  return (
    <div className="signup-wrapper">
      <div className="bg-glow bg-glow-teal" />
      <div className="bg-glow bg-glow-orange" />

      <div className="signup-box">

        {/* Logo */}
        <div className="text-center mb-4 logo-area">
          <img src={Logo} alt="UniGuide AI" className="logo-img mb-2" />
          <h1 className="brand-name mb-1">UniGuide <span>AI</span></h1>
          <span className="brand-tag">
            <i className="dot me-1" />
            AI Career &amp; Internship Navigator
          </span>
        </div>

        {/* Card */}
        <div className="signup-card p-4">

          <div className="mb-4">
            <h2 className="card-title-text mb-1">Create your account</h2>
            <p className="card-sub-text">Start your guided career journey today</p>
          </div>

          <form>


            {/* Name Row */}
            <div className="row g-2 mb-3">
              <div className="col-6 field-group">
                <label className="custom-label">First name</label>
                <div className="input-wrap">
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="#00b4d8" strokeWidth="2" strokeLinecap="round">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                  <input type="text" className="custom-input form-control" placeholder="John" value={FormData.first_name} />
                </div>
              </div>
              <div className="col-6 field-group">
                <label className="custom-label">Last name</label>
                <div className="input-wrap">
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="#00b4d8" strokeWidth="2" strokeLinecap="round">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                  <input type="text" className="custom-input form-control" placeholder="Doe" value={FormData.last_name} />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="mb-3 field-group">
              <label className="custom-label">Email address</label>
              <div className="input-wrap">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="#00b4d8" strokeWidth="2" strokeLinecap="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 8l10 6 10-6"/>
                </svg>
                <input type="email" className="custom-input form-control" placeholder="john@example.com" value={FormData.email} />
              </div>
            </div>

            {/* Password */}
            <div className="mb-3 field-group">
              <label className="custom-label">Password</label>
              <div className="input-wrap">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="#00b4d8" strokeWidth="2" strokeLinecap="round">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
                <input type="password" className="custom-input form-control" placeholder="Min. 8 characters" value={FormData.password1} />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-4 field-group">
              <label className="custom-label">Confirm password</label>
              <div className="input-wrap">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="#f77f00" strokeWidth="2" strokeLinecap="round">
                  <path d="M9 12l2 2 4-4"/><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
                <input type="password" className="custom-input form-control" placeholder="Repeat password" value={FormData.password2} />
              </div>
            </div>

            <button type="submit" className="btn signup-btn w-100 mb-3">
              Create Account →
            </button>

          </form>

          {/* Divider */}
          <div className="divider my-3">
            <span /><em>or</em><span />
          </div>

          {/* Google */}
          <button className="btn google-btn w-100 mb-3">
            <svg width="16" height="16" viewBox="0 0 24 24" className="me-2">
              <path fill="#EA4335" d="M5.27 9.76A7.08 7.08 0 0112 5c1.69 0 3.21.6 4.4 1.57l3.29-3.29A12 12 0 000 12c0 1.94.46 3.77 1.28 5.38z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.9l-3.67-3.02A7.1 7.1 0 0112 19.1c-3.4 0-6.28-2.3-7.31-5.4L.82 17.1A12 12 0 0012 24z"/>
              <path fill="#4A90E2" d="M23.76 12.27c0-.82-.07-1.62-.2-2.4H12v4.54h6.61A5.65 5.65 0 0116.27 18l3.67 3.02C22.19 18.99 23.76 15.87 23.76 12.27z"/>
              <path fill="#FBBC05" d="M4.69 13.7A7.14 7.14 0 014.62 12c0-.6.08-1.17.22-1.72L1.28 6.62A12 12 0 000 12c0 1.94.46 3.77 1.28 5.38z"/>
            </svg>
            Continue with Google
          </button>

          <p className="login-link text-center mb-0">
            Already have an account? <a href="/login">Sign in</a>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Register