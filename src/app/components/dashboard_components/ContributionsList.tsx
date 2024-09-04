import React from 'react';
import { motion } from 'framer-motion';
import { Contribution } from '../../types/github';

interface ContributionsListProps {
  contributions: Contribution[];
}

const ContributionsList: React.FC<ContributionsListProps> = ({ contributions = [] }) => {
  if (!Array.isArray(contributions)) {
    return <p className="text-gray-600">No contribution data available.</p>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">Contributed Repositories</h2>
      {contributions.length > 0 ? (
        <ul className="space-y-4">
          {contributions.map((contribution, index) => (
            <motion.li
              key={contribution.repo}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-gray-50 rounded-md p-4 shadow"
            >
              <a
                href={contribution.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-blue-600 hover:underline"
              >
                {contribution.repo}
              </a>
              <p className="text-gray-600 mt-1">Contributions: {contribution.count}</p>
            </motion.li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No contribution data available.</p>
      )}
    </div>
  );
};

export default ContributionsList;
