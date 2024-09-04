import React from 'react';
import { motion } from 'framer-motion';
import { Repository } from '../../types/github';

interface OwnReposListProps {
  repos: Repository[];
}

const OwnReposList: React.FC<OwnReposListProps> = ({ repos = [] }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">Own Repositories</h2>
      <div className="overflow-y-auto max-h-96">
        {repos.map((repo, index) => (
          <motion.div
            key={repo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-gray-50 rounded-md p-4 shadow mb-4"
          >
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-blue-600 hover:underline"
            >
              {repo.name}
            </a>
            <p className="text-gray-600 mt-2">{repo.description || 'No description available'}</p>
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>Stars: {repo.stargazers_count}</span>
              <span>Forks: {repo.forks_count}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OwnReposList;