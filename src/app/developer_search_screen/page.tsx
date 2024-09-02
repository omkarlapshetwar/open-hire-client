'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchForm from '../components/developer_search_components/SearchForm';
import DeveloperList from '../components/developer_search_components/DeveloperList';
import Spinner from '../components/common/Spinner';
import { SearchCriteria, Developer } from '../types/github';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import apiService from '../services/apiService';

interface DeveloperSearchProps {
  onSignOut: () => void;
  token: string;
  onError: (message: string, statusCode?: number) => void;
}

const DeveloperSearch: React.FC<DeveloperSearchProps> = ({ onSignOut, token, onError }) => {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [criteria, setCriteria] = useState<SearchCriteria>({});

  useEffect(() => {
    // Load saved results from localStorage on component mount
    const savedResults = localStorage.getItem('lastSearchResults');
    if (savedResults) {
      setDevelopers(JSON.parse(savedResults));
      setHasSearched(true);
    }
  }, []);

  const loadMoreDevelopers = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const nextPage = Math.ceil(developers.length / 10) + 1;
      const response = await apiService.post('/api/external-contributors', { ...criteria, page: nextPage });
      const newDevelopers = [...developers, ...response.data];
      setDevelopers(newDevelopers);
      localStorage.setItem('lastSearchResults', JSON.stringify(newDevelopers));
    } catch (error) {
      console.error('Error loading more developers:', error);
      onError('Failed to load more developers. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [criteria, developers, isLoading, onError]);

  const lastDeveloperRef = useInfiniteScroll(loadMoreDevelopers);

  const handleSearch = async (searchCriteria: SearchCriteria) => {
    setIsLoading(true);
    setHasSearched(true);
    setCriteria(searchCriteria);
    try {
      const response = await apiService.post('/api/external-contributors', { ...searchCriteria, page: 1 });
      setDevelopers(response.data);
      localStorage.setItem('lastSearchResults', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error searching developers:', error);
      onError('Failed to search developers. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-purple-600">Developer Search</h1>
          <button
            onClick={onSignOut}
            className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition duration-300"
          >
            Sign Out
          </button>
        </div>
        
        <SearchForm onSearch={handleSearch} />
        
        <AnimatePresence>
          {isLoading && developers.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-64"
            >
              <Spinner />
            </motion.div>
          ) : hasSearched && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <DeveloperList developers={developers} lastDeveloperRef={lastDeveloperRef} />
              {isLoading && (
                <div className="text-center py-4">
                  <Spinner />
                  <p className="mt-2 text-gray-600">Loading more developers...</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DeveloperSearch;