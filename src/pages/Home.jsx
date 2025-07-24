import axios from 'axios';
import { useState } from 'react';
import { PulseLoader } from 'react-spinners';

import CopyIcon from '../components/icons/CopyIcon';
import CheckIcon from '../components/icons/CheckIcon';
import { isValidHttpUrl } from '../utils/validation';

function Home() {
  const [url, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [message, setMessage] = useState('');
  const [showCheckIcon, setShowCheckIcon] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCopy = async (urlToCopy) => {
    try {
      await navigator.clipboard.writeText(urlToCopy);
      setShowCheckIcon(true);
      setTimeout(() => {
        setShowCheckIcon(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    if (!isValidHttpUrl(url)) {
      setMessage({ type: 'error', text: 'Failed to create link, please ensure that you entered a valid URL starting with http:// or https://.' });
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('https://url-shortener-2p0y.onrender.com/shorten', { url });
      const { data } = response.data;
      setShortenedUrl(`https://bidenjr.netlify.app/${data.shortCode}`);
      setMessage({ type: 'success', text: 'Success', url: `https://bidenjr.netlify.app/${data.shortCode}` });
      setUrl('');
    } catch (error) {
      console.error('Error shortening URL:', error);
      setMessage({ type: 'error', text: 'Tell BidenJr to wake DB up' });
      setShortenedUrl('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='h-screen flex flex-col items-center justify-center gap-2'>
      <p className='text-blue-500 font-bold text-4xl md:text-5xl lg:text-5xl xl:text-5xl'>BidenJr's URL Shortener</p>
      <p className='pb-10 text-xs md:text-sm lg:text-sm xl:text-sm'>Your only free URL shortener without ads.</p>
      <form className='flex flex-row flex-wrap justify-center gap-5 w-full' onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={!!isLoading}
          className='w-3/4 xl:w-1/3 bg-blue-50 focus:bg-blue-100 px-5 py-3 outline-0 rounded-lg text-lg !leading-relaxed '
        />
        <div className='flex flex-row justify-center w-3/4 xl:w-auto'>
          <button type="submit" disabled={!!isLoading} className='px-5 py-3 rounded-lg bg-blue-500 border-2 border-transparent text-white font-semibold cursor-pointer hover:bg-white hover:text-blue-500 hover:border-blue-500 disabled:text-white disabled:bg-blue-400 disabled:border-blue-400 disabled:hover:text-white disabled:hover:bg-blue-400'>
            {isLoading ? <PulseLoader size={8} color={"#FFFFFF"} /> : "Shorten"}
          </button>
        </div>
      </form>
      {message && (
        <div className={`w-auto flex flex-row gap-3 bg-neutral-200 rounded-lg text-sm mt-4 py-3 px-5 ${message.url ? 'cursor-pointer' : ''}`}>
          {message.url ? (
            <>
              <a href={message.url} target="_blank" rel="noopener noreferrer" className=''>
                {message.url}
              </a>
              {showCheckIcon ? (
                <CheckIcon />
              ) : (
                <CopyIcon onClick={() => handleCopy(message.url)} />
              )}
            </>
          ) : (
            <span className='text-red-500'>{message.text}</span>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;