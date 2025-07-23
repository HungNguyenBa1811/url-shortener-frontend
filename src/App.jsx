import { useState, useEffect } from 'react';

import Home from './pages/Home';
import Redirect from './pages/Redirect';
import NotFound from './pages/NotFound';
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
    return <Home />;
  } else if (path === '/not-found') {
    return <NotFound />;
  } else if (path.startsWith('/')) {
    const shortcode = path.substring(1);
    if (isValidShortcode(shortcode)) {
      return <Redirect shortcode={shortcode} />;
    } else {
      window.history.replaceState({}, '', '/not-found');
      return <NotFound />;
    }
  }
  // Fallback
  return <NotFound />;
}

export default App;