import React from 'react';
import { motion } from 'framer-motion';
import { Contribution } from '../../types/github';

interface ContributedReposListProps {
  contributions: Contribution[];
}

const ContributedReposList: React.FC<ContributedReposListProps> = ({ contributions = [] }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 overflow-hidden">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">Contributed Repositories</h2>
      <div className="overflow-x-auto">
        <div className="flex space-x-4 pb-4">
          {contributions.map((contribution, index) => (
            <motion.div
              key={contribution.repo}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex-shrink-0 w-64 bg-gray-50 rounded-md p-4 shadow"
            >
              <a
                href={contribution.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-blue-600 hover:underline"
              >
                {contribution.repo.split('/')[1]}
              </a>
              <p className="text-gray-600 mt-2">Contributions: {contribution.count}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContributedReposList;