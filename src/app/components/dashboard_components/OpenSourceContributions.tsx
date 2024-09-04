import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Contribution } from '../../types/github';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface OpenSourceContributionsProps {
  contributions: Contribution[];
}

const OpenSourceContributions: React.FC<OpenSourceContributionsProps> = ({ contributions }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (scrollOffset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="relative bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">Open Source Contributions</h2>
      <div className="relative">
        {showLeftArrow && (
          <button
            onClick={() => scroll(-200)}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
          >
            <FaChevronLeft className="text-purple-700" />
          </button>
        )}
        {showRightArrow && (
          <button
            onClick={() => scroll(200)}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
          >
            <FaChevronRight className="text-purple-700" />
          </button>
        )}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hide space-x-4 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {contributions.map((contribution, index) => (
            <motion.div
              key={contribution.repo}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex-shrink-0 w-64 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg p-4 shadow"
            >
              <h3 className="font-semibold text-purple-800 mb-2 truncate" title={contribution.repo}>
                {contribution.repo.split('/')[1]}
              </h3>
              <a
                href={contribution.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                View Repository
              </a>
              <p className="mt-2 text-gray-600">Contributions: {contribution.count}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OpenSourceContributions;