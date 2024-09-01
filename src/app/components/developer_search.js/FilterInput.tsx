"use client";

import React, { useState } from 'react';

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

  const handleAddTag = () => {
    if (inputValue && !tags.includes(inputValue)) {
      const newTags = [...tags, inputValue];
      setTags(newTags);
      onUpdate(newTags);
      setInputValue('');
    }
  };

  const handleRemoveTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    onUpdate(newTags);
  };

  return (
    <div className="flex flex-col">
      <label className="text-white mb-1">{label}</label>
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="w-full px-3 py-2 text-gray-900 rounded border border-gray-400 focus:outline-none"
          placeholder={`Add ${label.toLowerCase()}...`}
          onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
        />
        <button
          type="button"
          onClick={handleAddTag}
          className="absolute right-0 top-0 h-full px-4 bg-blue-500 text-white rounded-r"
        >
          +
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-500 text-white px-2 py-1 rounded-full flex items-center"
          >
            {tag}
            <button
              type="button"
              onClick={() => handleRemoveTag(index)}
              className="ml-2 text-white hover:text-red-300"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default FilterInput;
