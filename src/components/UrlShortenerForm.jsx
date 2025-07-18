import { useState } from 'react';
import axios from 'axios';
import CopyIcon from './CopyIcon';
import CheckIcon from './CheckIcon';
import { isValidHttpUrl } from '../utils/validation';

function UrlShortenerForm() {
  const [url, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [message, setMessage] = useState('');
  const [showCheckIcon, setShowCheckIcon] = useState(false);

  const handleCopy = async (urlToCopy) => {
    try {
      await navigator.clipboard.writeText(urlToCopy);
      setShowCheckIcon(true);
      setTimeout(() => {
        setShowCheckIcon(false);
      }, 5000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages

    if (!isValidHttpUrl(url)) {
      setMessage({ type: 'error', text: 'Please enter a valid URL (http or https).' });
      return;
    }

    try {
      const response = await axios.post('https://url-shortener-2p0y.onrender.com/shorten', { url });
      const { data } = response.data;
      setShortenedUrl(`https://bidenjr-utils.netlify.app/${data.shortCode}`);
      setMessage({ type: 'success', text: 'Success', url: `https://bidenjr-utils.netlify.app/${data.shortCode}` });
      setUrl(''); // Clear input
    } catch (error) {
      console.error('Error shortening URL:', error);
      setMessage({ type: 'error', text: 'Tell BidenJr to Setup DB' });
      setShortenedUrl('');
    }
  };

  return (
    <div className='h-screen flex flex-col items-center justify-center gap-2'>
      <p className='text-blue-500 font-bold text-3xl'>URL Shortener</p>
      <p className='pb-10 text-sm'>Your only free URL shortener without ads.</p>
      <form className='flex flex-row flex-wrap justify-center gap-5' onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className='w-full px-5 py-3 outline-0 rounded-lg text-lg bg-green-100'
        />
        <button type="submit" className='px-5 py-2 rounded-lg bg-blue-100'>Shorten</button>
      </form>
      {message && (
        <div className='flex flex-row gap-3 bg-neutral-300 rounded-lg text-sm mt-4 py-3 px-5 cursor-pointer'>
          {
            message.url && 
              <a href={message.url} target="_blank" rel="noopener noreferrer" className=''>
                {message.url}
              </a>
          }
          {message.url && (
            showCheckIcon ? (
              <CheckIcon />
            ) : (
              <CopyIcon onClick={() => handleCopy(message.url)} />
            )
          )}
        </div>
      )}
    </div>
  );
}

export default UrlShortenerForm;