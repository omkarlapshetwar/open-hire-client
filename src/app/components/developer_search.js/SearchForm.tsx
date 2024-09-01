import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchCriteria {
  location?: string[];
  language?: string[];
  topics?: string[];
  followers?: number;
  repos?: number;
}

type TagFields = 'location' | 'language' | 'topics';

interface SearchFormProps {
  onSearch: (criteria: SearchCriteria) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [criteria, setCriteria] = useState<SearchCriteria>({});
  const [tags, setTags] = useState<Record<TagFields, string[]>>({
    location: [],
    language: [],
    topics: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCriteria(prev => ({ ...prev, [name]: Number(value) }));
  };

  const isTagField = (field: string): field is TagFields => {
    return ['location', 'language', 'topics'].includes(field);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, field: TagFields) => {
    if (e.key === 'Enter' && e.currentTarget.value) {
      e.preventDefault();
      const newValue = e.currentTarget.value.trim();
      if (!tags[field].includes(newValue)) {
        setTags(prev => ({ ...prev, [field]: [...prev[field], newValue] }));
        setCriteria(prev => ({
          ...prev,
          [field]: isTagField(field) ? [...(prev[field] || []), newValue] : newValue
        }));
        e.currentTarget.value = '';
      }
    }
  };

  const removeTag = (field: TagFields, value: string) => {
    setTags(prev => ({ ...prev, [field]: prev[field].filter(tag => tag !== value) }));
    setCriteria(prev => ({
      ...prev,
      [field]: prev[field]?.filter((tag: string) => tag !== value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(criteria);
  };

  const renderTagInput = (field: TagFields, placeholder: string) => (
    <div className="mb-4">
      <input
        type="text"
        name={field}
        placeholder={placeholder}
        onKeyDown={(e) => handleKeyDown(e, field)}
        className="w-full p-2 bg-white text-gray-800 border border-primary-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <div className="flex flex-wrap gap-2 mt-2">
        <AnimatePresence>
          {tags[field].map((tag, index) => (
            <motion.span
              key={`${field}-${index}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-primary-light text-primary px-2 py-1 rounded-full text-sm flex items-center"
            >
              {tag}
              <button type="button" onClick={() => removeTag(field, tag)} className="ml-2 focus:outline-none">
                ×
              </button>
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="glass rounded-lg p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {renderTagInput('location', 'Location (Press Enter to add)')}
        {renderTagInput('language', 'Language (Press Enter to add)')}
        {renderTagInput('topics', 'Topics (Press Enter to add)')}
        <input
          type="number"
          name="followers"
          placeholder="Min Followers"
          onChange={handleChange}
          className="w-full p-2 bg-white text-gray-800 border border-primary-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          type="number"
          name="repos"
          placeholder="Min Repos"
          onChange={handleChange}
          className="w-full p-2 bg-white text-gray-800 border border-primary-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full bg-primary text-white p-2 rounded-md hover:bg-opacity-90 transition duration-300"
      >
        Search
      </motion.button>
    </form>
  );
};

export default SearchForm;