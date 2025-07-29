import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../hooks/useAxiosPublic';
import ApartmentCard from './ApartmentCard';
import Spinner from '../Pages/Shared/Spinner';

const Apartments = () => {
  const axiosInstance = useAxiosPublic();
  const [page, setPage] = useState(1);
  const limit = 6;


  const [inputMinRent, setInputMinRent] = useState('');
  const [inputMaxRent, setInputMaxRent] = useState('');

  const [minRent, setMinRent] = useState('');
  const [maxRent, setMaxRent] = useState('');

  const { data, isLoading, error } = useQuery({
    queryKey: ['apartments', page, minRent, maxRent],
    queryFn: async () => {
      let query = `/apartments?page=${page}&limit=${limit}`;
      if (minRent !== '' && maxRent !== '') {
        query += `&minRent=${minRent}&maxRent=${maxRent}`;
      }
      const res = await axiosInstance.get(query);
      return res.data;
    },
    keepPreviousData: true,
  });

  if (isLoading) return <Spinner />;
  if (error) return <div>Error loading apartments</div>;

  const totalPages = Math.ceil(data.total / limit);

  return (
    <div className="p-4 my-12 max-w-7xl mx-auto">
      {/* Search Filters */}
      <div className="mb-6 flex flex-wrap gap-3 items-center">
        <input
          type="number"
          value={inputMinRent}
          onChange={(e) => setInputMinRent(e.target.value)}
          placeholder="Min Rent"
          className="border px-4 py-2 rounded w-40"
        />
        <input
          type="number"
          value={inputMaxRent}
          onChange={(e) => setInputMaxRent(e.target.value)}
          placeholder="Max Rent"
          className="border px-4 py-2 rounded w-40"
        />
        <button
          onClick={() => {
            setMinRent(inputMinRent);
            setMaxRent(inputMaxRent);
            setPage(1); 
          }}
          className="bg-gradient-to-r from-primary to-secondary text-base-200 px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {/* Apartment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        {data.apartments?.length > 0 ? (
          data.apartments.map((apartment) => (
            <ApartmentCard key={apartment._id} apartment={apartment} />
          ))
        ) : (
          <p>No apartments available</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setPage(idx + 1)}
            className={`px-3 py-1 rounded ${
              page === idx + 1
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {idx + 1}
          </button>
        ))}
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Apartments;

