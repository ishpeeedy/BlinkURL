import React from 'react';
import UrlForm from '../components/UrlForm';
import UrlDataTable from '../components/UrlDataTable';

const dummyUrls = [
  {
    _id: '1',
    full_url: 'https://example.com',
    short_url: 'abc123',
    clicks: 5,
    createdAt: new Date().toISOString(),
  },
  {
    _id: '2',
    full_url: 'https://neobrutalism.dev',
    short_url: 'neo456',
    clicks: 10,
    createdAt: new Date().toISOString(),
  },
  {
    _id: '3',
    full_url: 'https://github.com',
    short_url: 'gh789',
    clicks: 2,
    createdAt: new Date().toISOString(),
  },
  {
    _id: '4',
    full_url: 'https://react.dev',
    short_url: 'react101',
    clicks: 8,
    createdAt: new Date().toISOString(),
  },
  {
    _id: '5',
    full_url: 'https://vitejs.dev',
    short_url: 'vite202',
    clicks: 0,
    createdAt: new Date().toISOString(),
  },
];

const DashboardPage = () => {
  return (
    <div>
      {/* <UrlForm /> */}
      <UrlDataTable urls={dummyUrls} />
    </div>
  );
};

export default DashboardPage;
