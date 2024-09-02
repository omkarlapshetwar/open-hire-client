import React from 'react';
import { motion } from 'framer-motion';
import { Repository } from '../../types/github';

interface RepositoriesListProps {
  repos: Repository[];
}

const RepositoriesList: React.FC<RepositoriesListProps> = ({ repos }) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-8"
    >
      <h2 className="text-2xl font-bold mb-4 text-purple-700">Repositories</h2>
      {repos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.map((repo) => (
            <motion.div
              key={repo.id}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg shadow-md p-4"
            >
              <h3 className="text-lg font-semibold mb-2">
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {repo.name}
                </a>
              </h3>
              <p className="text-sm text-gray-600 mb-2">{repo.description || 'No description available'}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Stars: {repo.stargazers_count}</span>
                <span>Forks: {repo.forks_count}</span>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No repositories found.</p>
      )}
    </motion.div>
  );
};

export default RepositoriesList;