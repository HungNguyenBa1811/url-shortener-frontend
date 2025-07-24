import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PuffLoader, ClipLoader } from 'react-spinners';

import SortIcon from '../components/icons/SortIcon.jsx';
import { getStats, getUrls, searchUrls, deleteUrl } from '../services/admin';

function Admin() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total_links: 0, total_clicks: 0 });
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleting, setDeleting] = useState(null);
  const [order, setOrder] = useState('desc');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsData, urlsData] = await Promise.all([
          getStats(),
          getUrls(page, 10, order)
        ]);
        const { links, visits } = statsData.data || {};
        setStats({ total_links: links, total_clicks: visits });
        // console.log('Stats:', urlsData.data);
        setUrls(urlsData.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, order]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery) {
      const urlsData = await getUrls(page, 10, order);
      setUrls(urlsData.data || []);
      return;
    }
    try {
      setLoading(true);
      const urlsData = await searchUrls(searchQuery);
      setUrls(urlsData.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (code) => {
    setDeleting(code);
    try {
      await deleteUrl(code);
      const [statsData, urlsData] = await Promise.all([
        getStats(),
        getUrls(page, 10, order)
      ]);
      const { links, visits } = statsData.data || {};
      setStats({ total_links: links, total_clicks: visits });
      setUrls(urlsData.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting(null);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={`relative min-h-screen ${loading ? '!overflow-y-hidden' : ''}`}>
      {loading && (
        <div className="absolute w-screen h-screen flex items-center justify-center bg-transparent z-10">
          <PuffLoader color="#36D7B7" loading={loading} size={75}/>
        </div>
      )}
      <div className={`${loading ? 'blur-sm' : ''} transition-all duration-300`}>
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-extrabold">Admin Dashboard</h1>
            <button
              onClick={() => {
                sessionStorage.removeItem('admin-key');
                navigate('/');
              }}
              className="border-2 border-red-500 bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-white hover:text-red-500"
            >
              Logout
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="p-4 bg-gray-100 rounded-lg">
              <h2 className="text-lg font-semibold">Total Links</h2>
              <p className="text-5xl font-bold text-green-500">{stats.total_links}</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
              <h2 className="text-lg font-semibold">Total Clicks</h2>
              <p className="text-5xl font-bold text-green-500">{stats.total_clicks}</p>
            </div>
          </div>

          <form onSubmit={handleSearch} className="mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for links..."
              className="border outline-0 px-5 py-3 !leading-relaxed rounded-lg w-full"
            />
          </form>

          <div>
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold">All URLs</h2>
              <button
                onClick={() => setOrder(o => o === 'desc' ? 'asc' : 'desc')}
                className="px-4 py-2 rounded-lg font-bold cursor-pointer outline-0 flex items-center"
              >
                <SortIcon className="inline-block mr-2" />
                <span>
                  Recent {order === 'desc' ? '↓' : '↑'}
                </span>
              </button>
            </div>

            <ul className="space-y-6 mb-12">
              {urls.map(url => (
                <li key={url.id} className="p-4 bg-white rounded-lg shadow">
                  <div className="flex flex-wrap flex-row justify-between items-center">
                    <div className="flex flex-col w-3/4">
                      <p className="px-2 py-2 font-semibold">{url.short_code}</p>
                      <a href={url.original_url} target="_blank" rel="noopener noreferrer" className="pr-3 pl-2 text-blue-500 break-all">{url.original_url}</a>
                    </div>
                    <div className='flex flex-col w-1/4 items-end gap-3'>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">Visits:</span>
                        <span>{url.access_count}</span>
                      </div>
                      <button
                        onClick={() => handleDelete(url.short_code)}
                        className="border-2 border-red-500 bg-red-500 text-white px-3 py-1 rounded-lg w-24 cursor-pointer hover:bg-white hover:text-red-500 disabled:bg-red-400 disabled:border-red-400"
                        disabled={deleting === url.short_code}
                      >
                        {deleting === url.short_code ? (
                          <div className="flex items-center justify-center">
                            <ClipLoader color="#fff" loading={true} size={20} />
                          </div>
                        ) : (
                          'Delete'
                        )}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex justify-center mb-6 gap-5">
              <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1} className="border-2 border-blue-500 bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer outline-0 disabled:bg-gray-400 disabled:border-gray-400 disabled:text-white hover:bg-white hover:text-blue-500">Prev</button>
              <div className='flex items-center'>
                <span>Page {page}</span>
              </div>
              <button
                onClick={() => setPage(p => p + 1)}
                disabled={page * 10 >= stats.total_links}
                className="border-2 border-blue-500 bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer outline-0 disabled:bg-gray-400 disabled:border-gray-400 disabled:text-white hover:bg-white hover:text-blue-500"
              >
                Next
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Admin;