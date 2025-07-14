import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (path === '/') {
    return (
      <div className="App">
        <h1>URL Shortener</h1>
        <p>Your only free URL shortener without ads.</p>
      </div>
    );
  } else if (path.startsWith('/')) {
    const shortcode = path.substring(1); // Remove the leading '/'
    return <ShortcodeRedirect shortcode={shortcode} />;
  }

  return (
    <div className="App">
      <h1>Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

function ShortcodeRedirect({ shortcode }) {
  const [countdown, setCountdown] = useState(5);
  const [showProceedButton, setShowProceedButton] = useState(false);
  const [originalUrl, setOriginalUrl] = useState('');

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowProceedButton(true);
    }
  }, [countdown]);

  const handleProceed = async () => {
    try {
      const response = await axios.get(`https://url-shortener-2p0y.onrender.com/shorten/${shortcode}`);
      setOriginalUrl(response.data.data.original_url);
      window.location.href = response.data.data.original_url;
    } catch (error) {
      console.error('Error fetching original URL:', error);
      alert('Error: Could not retrieve original URL. Please try again later.');
    }
  };

  return (
    <div className="App">
      {countdown > 0 ? (
        <>
          <h1>Please wait {countdown}s</h1>
        </>
      ) : (
        <>
          {showProceedButton && (
            <button onClick={handleProceed} className="proceed-button">Proceed</button>
          )}
        </>
      )}
    </div>
  );
}

export default App;
