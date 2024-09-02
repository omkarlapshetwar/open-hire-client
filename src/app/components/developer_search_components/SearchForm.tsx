import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { SearchCriteria } from '@/app/types/github';
import { useDebounce } from '@/app/hooks/useDebounce';
import FilterInput from './FilterInput';

interface SearchFormProps {
  onSearch: (criteria: SearchCriteria) => void;
}

const SearchForm: React.FC<SearchFormProps> = React.memo(({ onSearch }) => {
  const [criteria, setCriteria] = useState<SearchCriteria>({});
  const debouncedSearch = useDebounce(onSearch, 300);

  const handleChange = useCallback((field: keyof SearchCriteria, value: string | string[] | boolean) => {
    setCriteria(prev => {
      const newCriteria = { ...prev, [field]: value };
      debouncedSearch(newCriteria);
      return newCriteria;
    });
  }, [debouncedSearch]);

  return (
    <motion.form
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg p-6 mb-8 shadow-lg"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FilterInput
          label="Location"
          field="location"
          onUpdate={(values) => handleChange('location', values)}
        />
        <FilterInput
          label="Language"
          field="language"
          onUpdate={(values) => handleChange('language', values)}
        />
        <FilterInput
          label="Topics"
          field="topics"
          onUpdate={(values) => handleChange('topics', values)}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Minimum Followers
          </label>
          <input
            type="number"
            name="followers"
            onChange={(e) => handleChange('followers', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter minimum followers"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Open to Work
          </label>
          <select
            name="openToWork"
            onChange={(e) => handleChange('openToWork', e.target.value === 'true')}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Any</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          onSearch(criteria);
        }}
        className="w-full mt-6 bg-purple-600 text-white p-3 rounded-md hover:bg-purple-700 transition duration-300 font-semibold"
      >
        Search Developers
      </motion.button>
    </motion.form>
  );
});

SearchForm.displayName = 'SearchForm';

export default SearchForm;