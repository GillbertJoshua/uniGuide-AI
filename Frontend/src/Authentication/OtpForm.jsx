import React from 'react'
import Logo from '../assets/Image/UniGuide 1.png';
import '../assets/Style/OtpFrom.css'
const OtpForm = () => {
  return (
    <div className="otp-wrapper">
      <div className="bg-glow bg-glow-teal" />
      <div className="bg-glow bg-glow-orange" />

      <div className="otp-box">

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
        <div className="otp-card p-4">

          {/* Mail Icon */}
          <div className="d-flex justify-content-center mb-3">
            <div className="otp-icon-wrap">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                stroke="#00b4d8" strokeWidth="1.8" strokeLinecap="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M2 8l10 6 10-6"/>
              </svg>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-4">
            <h2 className="card-title-text mb-1">Verify your email</h2>
            <p className="card-sub-text">
              We sent a 6-digit code to your email.<br />
              Enter it below to continue.
            </p>
          </div>

          {/* OTP Inputs */}
          <div className="otp-inputs mb-4" onPaste={handlePaste}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={el => inputs.current[i] = el}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)}
                className={`otp-input ${digit ? 'filled' : ''}`}
              />
            ))}
          </div>

          {/* Verify Button */}
          <button type="submit" className="btn verify-btn w-100">
            Verify &amp; Continue →
          </button>

          {/* Divider */}
          <div className="divider my-3">
            <span /><em>or</em><span />
          </div>

          {/* Resend */}
          <div className="text-center">
            <p className="resend-text mb-1">Didn't receive the code?</p>
            <button type="button" className="btn resend-btn">Resend OTP</button>
          </div>

          {/* Back */}
          <p className="login-link text-center mt-3 mb-0">
            <a href="/">← Back to register</a>
          </p>

        </div>
      </div>
    </div>
  );
};

export default OtpForm;