import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const gatekeeperMessages = [
  "You think you can fool me",
  "You are deeply mistaken",
  "Go away!",
  "You are deeply mistaken",
  "I should have hid this room better...",
  "You're not supposed to be in here...",
  "RubRub won't like this...",
  "zzzZZZZ...",
  "Don't touch that!*",
  "Why you touch my stuff?",
  "RubRub better not find you in here...",
  "Can't you just leave?",
  "This is not the room you are looking for...",
  "Sneaky sneaky...",
  "It's my precious...",
  "You shall not pass!",
  "Don't push the button!",
  "You're gonna get me in trouble...",
  "This is getting ridiculus...",
  "Go collect some stars",
  "Maybe there are new levels?",
  "Just, stop bothering me",
  "I'm gonna stop talking",
  "...",
  "......",
  "GAH!",
  "You're hopeless...",
  "Really, still here?",
  "Fine, press the button"
];

function getRandomMessage() {
  const randomIndex = Math.floor(Math.random() * gatekeeperMessages.length);
  return gatekeeperMessages[randomIndex];
}

function AdminVerification() {
  const [key, setKey] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');

    if (key === import.meta.env.VITE_ADMIN_KEY) {
      sessionStorage.setItem('admin-key', key);
      setMessage({ type: 'success', text: 'Verified!' });
      setTimeout(() => {
        navigate('/admin');
      }, 1000);
    } else {
      setMessage({ type: 'error', text: 'Access Denied!' });
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
    setKey('');
  };

  return (
    <div className='h-screen flex flex-col items-center justify-center gap-2'>
      <p className='text-red-500 font-bold text-4xl md:text-5xl lg:text-5xl xl:text-5xl'>Vault of Secrets</p>
      <p className='pb-10 text-xs md:text-sm lg:text-sm xl:text-sm'>{getRandomMessage()}</p>
      <form className='flex flex-row flex-wrap justify-center gap-5 w-full' onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="El. Psy. Congroo"
          value={key}
          disabled={message.type === 'error' || message.type === 'success'}
          onChange={(e) => setKey(e.target.value)}
          className='w-3/4 xl:w-1/3 bg-red-50 focus:bg-red-100 px-5 py-3 outline-0 rounded-lg text-lg !leading-relaxed'
        />
        <div className='flex flex-row justify-center w-3/4 xl:w-auto'>
          <button type="submit" className='px-5 py-3 rounded-lg bg-red-500 border-2 border-transparent text-white font-semibold cursor-pointer hover:bg-white hover:text-red-500 hover:border-red-500'>
            Enter
          </button>
        </div>
      </form>
      {message && (
        <div className={`w-auto flex flex-row gap-3 rounded-lg text-sm mt-4 py-3 px-5 ${message.type === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
          <span>{message.text}</span>
        </div>
      )}
    </div>
  );
}

export default AdminVerification;