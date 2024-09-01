'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import SearchForm from './components/developer_search.js/SearchForm';
import DeveloperTable from './components/developer_search.js/DeveloperTable';
import Spinner from './components/developer_search.js/Spinner';
import { SearchCriteria, Developer, searchDevelopers } from './services/githubService';

export default function Home() {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [page, setPage] = useState(1);
  const [criteria, setCriteria] = useState<SearchCriteria>({});

  const handleSearch = async (searchCriteria: SearchCriteria) => {
    setIsLoading(true);
    setHasSearched(true);
    setCriteria(searchCriteria);
    setPage(1);
    try {
      const results = await searchDevelopers({ ...searchCriteria, page: 1 });
      setDevelopers(results);
    } catch (error) {
      console.error('Error searching developers:', error);
      // Handle error state
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const results = await searchDevelopers({ ...criteria, page: page + 1 });
      setDevelopers(prev => [...prev, ...results]);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error loading more developers:', error);
    } finally {
      setIsLoading(false);
    }
  }, [criteria, isLoading, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore]);

  return (
    <main className="min-h-screen p-4 bg-purple-100">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 text-purple-600 text-center"
      >
        Developer Search
      </motion.h1>
      
      <SearchForm onSearch={handleSearch} />
      
      {isLoading && developers.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <Spinner />
        </div>
      ) : hasSearched && (
        <>
          <DeveloperTable developers={developers} />
          {isLoading && (
            <div className="text-center py-4">
              <Spinner />
              <p>Loading more...</p>
            </div>
          )}
        </>
      )}
    </main>
  );
}