import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FilterInputProps {
  label: string;
  field: string;
  onUpdate: (values: string[]) => void;
}

const FilterInput: React.FC<FilterInputProps> = ({ label, field, onUpdate }) => {
  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddTag = useCallback(() => {
    if (inputValue && !tags.includes(inputValue)) {
      const newTags = [...tags, inputValue];
      setTags(newTags);
      onUpdate(newTags);
      setInputValue('');
    }
  }, [inputValue, tags, onUpdate]);

  const handleRemoveTag = useCallback((index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    onUpdate(newTags);
  }, [tags, onUpdate]);

  return (
    <div className="flex flex-col">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="w-full p-2 bg-white bg-opacity-75 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
          placeholder={`Add ${label.toLowerCase()}...`}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="button"
          onClick={handleAddTag}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center focus:outline-none"
        >
          +
        </motion.button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        <AnimatePresence>
          {tags.map((tag, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm flex items-center"
            >
              {tag}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                onClick={() => handleRemoveTag(index)}
                className="ml-1 focus:outline-none text-purple-500 hover:text-purple-700"
              >
                ×
              </motion.button>
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default React.memo(FilterInput);