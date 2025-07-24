const BASE_URL = import.meta.env.VITE_BASE_URL;

const getHeaders = () => {
  const adminKey = sessionStorage.getItem('admin-key');
  return {
    'Content-Type': 'application/json',
    'x-api-key': adminKey,
  };
};

export const getStats = async () => {
  const response = await fetch(`${BASE_URL}/admin/stats`, {
    headers: getHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch stats');
  }
  return response.json();
};

export const getUrls = async (page = 1, perPage = 10, order = 'desc') => {
  const response = await fetch(`${BASE_URL}/admin/urls?page=${page}&per_page=${perPage}&order=${order}`, {
    headers: getHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch URLs');
  }
  return response.json();
};

export const searchUrls = async (query) => {
  const response = await fetch(`${BASE_URL}/admin/search?q=${query}`, {
    headers: getHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to search URLs');
  }
  return response.json();
};

export const deleteUrl = async (code) => {
  const response = await fetch(`${BASE_URL}/admin/${code}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to delete URL');
  }
  return response.json();
};