import { useState, useEffect } from 'react';
import axios from 'axios';
import { isValidHttpUrl } from '../utils/validation';

function ShortcodeRedirect({ shortcode }) {
  const [countdown, setCountdown] = useState(3);
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
      const fetchedUrl = response.data.data.original_url;
      if (fetchedUrl && isValidHttpUrl(fetchedUrl)) {
        setOriginalUrl(fetchedUrl);
        window.location.href = fetchedUrl;
      } else {
        // If no original_url is returned or it's not a valid HTTP/HTTPS URL, redirect to not-found
        window.history.replaceState({}, '', '/not-found');
        window.location.pathname = '/not-found';
      }
    } catch (error) {
      console.error('Error fetching original URL:', error);
      // In case of an error, also redirect to not-found
      window.history.replaceState({}, '', '/not-found');
      window.location.pathname = '/not-found';
    }
  };

  return (
    <div className='h-screen flex flex-col items-center justify-center gap-5 md:gap-10'>
      {countdown > 0 ? (
        <span className='text-blue-500 font-semibold text-3xl'>Please wait {countdown}s</span>
      ) : (
        <>
          {showProceedButton && (
            <button className='px-12 py-4' onClick={handleProceed} >
              <span className='text-blue-500 text-3xl font-semibold'>Proceed</span>
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default ShortcodeRedirect;