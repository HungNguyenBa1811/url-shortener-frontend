import { useState, useEffect } from 'react';
import UrlShortenerForm from './components/UrlShortenerForm';
import ShortcodeRedirect from './components/ShortcodeRedirect';
import NotFound from './components/NotFound'; // Import the new NotFound component
import { isValidShortcode } from './utils/validation';

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
    return <UrlShortenerForm />;
  } else if (path === '/not-found') {
    return <NotFound />; // Use the NotFound component
  } else if (path.startsWith('/')) {
    const shortcode = path.substring(1); // Remove the leading '/'
    if (isValidShortcode(shortcode)) {
      return <ShortcodeRedirect shortcode={shortcode} />;
    } else {
      // If the shortcode is not valid, redirect to the not-found page
      window.history.replaceState({}, '', '/not-found');
      return <NotFound />; // Use the NotFound component
    }
  }
  // Fallback for any other unhandled paths, though the above conditions should cover most cases
  return <NotFound />; // Use the NotFound component
}

export default App;