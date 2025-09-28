import React from 'react';
import UrlForm from '../components/UrlForm';
import UrlDataTable from '../components/UrlDataTable';
import { useQuery } from '@tanstack/react-query';
import { getAllUserUrls } from '../api/user.api';

import { Alert } from '@/components/ui/alert';

const DashboardPage = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['userUrls'],
    queryFn: getAllUserUrls,
    refetchInterval: 30000,
    staleTime: 0,
  });

  let urls = [];
  if (data && data.urls) {
    urls = data.urls;
  }

  return (
    <div>
      <div className="w-full max-w-4xl mx-auto">
        <UrlForm />
      </div>
      {isLoading ? (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : isError ? (
        <Alert variant="warning">
          <AlertTriangle />
          <AlertDescription>
            {' '}
            Error loading your URLs:{error.message}
          </AlertDescription>
        </Alert>
      ) : (
        <UrlDataTable urls={urls} />
      )}
    </div>
  );
};

export default DashboardPage;
