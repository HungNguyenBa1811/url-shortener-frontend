import axios from 'axios';
import { useState, useEffect, use } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';

import { isValidHttpUrl, isValidShortcode } from '../utils/validation';

function Redirect() {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  const [countdown, setCountdown] = useState(3);
  const [showProceedButton, setShowProceedButton] = useState(false);
  const [originalUrl, setOriginalUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if(!isValidShortcode(shortcode)) {
      navigate('/not-found');
      return;
    }
  }, [])

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
    setIsLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/shorten/${shortcode}`);
      const fetchedUrl = response.data.data.original_url;
      if (fetchedUrl && isValidHttpUrl(fetchedUrl)) {
        setOriginalUrl(fetchedUrl);
        window.location.href = fetchedUrl;
      } else {
        navigate('/not-found');
      }
    } catch (error) {
      console.error('Error fetching original URL:', error);
      navigate('/not-found');
    }
  };

  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      {countdown > 0 ? (
        <span className='text-blue-500 font-bold text-3xl md:text-5xl lg:text-5xl xl:text-5xl'>Please wait {countdown}s</span>
      ) : (
        <>
          {showProceedButton && (
            <button
              className={`w-45 border-2 px-10 py-4 rounded-xl ${!isLoading ? 'border-blue-500 bg-blue-500 hover:bg-white hover:*:text-blue-500' : 'border-blue-400 bg-blue-400'}`}
              onClick={handleProceed}
              disabled={isLoading}
            >
              {isLoading ? <PulseLoader size={8} color={'#FFFFFF'} className='py-1'/> : <span className='text-white text-2xl font-semibold'>Proceed</span>}
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default Redirect;