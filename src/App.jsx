import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Redirect from './pages/Redirect';
import NotFound from './pages/NotFound';
import AdminVerification from './pages/AdminVerification';
import Admin from './pages/Admin';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/verification" element={<AdminVerification />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="/:shortcode" element={<Redirect />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;