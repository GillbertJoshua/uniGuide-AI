import React from 'react'

// Add this component inside your Register.jsx (above the Register component)
const SocialLoginPopup = ({ onClose }) => {
  const providers = [
    {
      name: "Google",
      handler: () => { /* window.location.href = '/auth/google' */ },
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path fill="#EA4335" d="M5.27 9.76A7.08 7.08 0 0112 5c1.69 0 3.21.6 4.4 1.57l3.29-3.29A12 12 0 000 12c0 1.94.46 3.77 1.28 5.38z"/>
          <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.9l-3.67-3.02A7.1 7.1 0 0112 19.1c-3.4 0-6.28-2.3-7.31-5.4L.82 17.1A12 12 0 0012 24z"/>
          <path fill="#4A90E2" d="M23.76 12.27c0-.82-.07-1.62-.2-2.4H12v4.54h6.61A5.65 5.65 0 0116.27 18l3.67 3.02C22.19 18.99 23.76 15.87 23.76 12.27z"/>
          <path fill="#FBBC05" d="M4.69 13.7A7.14 7.14 0 014.62 12c0-.6.08-1.17.22-1.72L1.28 6.62A12 12 0 000 12c0 1.94.46 3.77 1.28 5.38z"/>
        </svg>
      ),
    },
    {
      name: "GitHub",
      handler: () => { /* window.location.href = '/auth/github' */ },
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02 0 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58A12.01 12.01 0 0024 12C24 5.37 18.63 0 12 0z"/>
        </svg>
      ),
    },
    {
      name: "Facebook",
      handler: () => { /* window.location.href = '/auth/facebook' */ },
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
          <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.27h3.32l-.53 3.5h-2.79V24C19.62 23.1 24 18.1 24 12.07z"/>
        </svg>
      ),
    },
    {
      name: "Apple",
      handler: () => { /* window.location.href = '/auth/apple' */ },
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16.52 0c.08 1.28-.37 2.55-1.13 3.47-.78.96-2.04 1.7-3.27 1.6-.1-1.24.44-2.52 1.17-3.4C14.05.68 15.38-.03 16.52 0zM21.95 17.3c-.52 1.14-1.14 2.19-2 3.12-.72.8-1.62 1.85-2.87 1.86-1.22.01-1.62-.73-3.03-.72-1.41.01-1.83.74-3.07.73-1.24-.01-2.1-1-2.83-1.8C6.52 18.27 5 15.55 5 12.82c0-4.42 2.87-6.76 5.7-6.8 1.26-.02 2.59.79 3.41.79.82 0 2.36-.97 3.98-.83.68.03 2.58.28 3.8 2.1l-.06.04c-.65.4-2.22 1.7-2.19 4 .03 2.65 1.98 3.7 2.31 3.87v.01z"/>
        </svg>
      ),
    },
    {
      name: "Microsoft",
      handler: () => { /* window.location.href = '/auth/microsoft' */ },
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24">
          <rect x="1" y="1" width="10.5" height="10.5" fill="#F25022"/>
          <rect x="12.5" y="1" width="10.5" height="10.5" fill="#7FBA00"/>
          <rect x="1" y="12.5" width="10.5" height="10.5" fill="#00A4EF"/>
          <rect x="12.5" y="12.5" width="10.5" height="10.5" fill="#FFB900"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="social-popup-overlay" onClick={onClose}>
      <div className="social-popup-box" onClick={(e) => e.stopPropagation()}>
        <button className="social-popup-close" onClick={onClose}>×</button>
        <h3 className="social-popup-title">Continue with</h3>
        <p className="social-popup-sub">Choose a provider to sign in or register</p>
        <div className="social-popup-list">
          {providers.map((p) => (
            <button key={p.name} className="social-provider-btn" onClick={p.handler}>
              {p.icon}
              <span>{p.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialLoginPopup