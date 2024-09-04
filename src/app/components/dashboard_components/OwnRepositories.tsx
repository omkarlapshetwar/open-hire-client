import React from 'react';
import { motion } from 'framer-motion';
import { Repository } from '../../types/github';
import { FaStar, FaCodeBranch } from 'react-icons/fa';

interface OwnRepositoriesProps {
  repos: Repository[];
}

const OwnRepositories: React.FC<OwnRepositoriesProps> = ({ repos }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">Own Repositories</h2>
      <div className="h-96 overflow-y-auto pr-4 space-y-4 custom-scrollbar">
        {repos.map((repo, index) => (
          <motion.div
            key={repo.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 shadow"
          >
            <h3 className="font-semibold text-blue-800 mb-2 truncate" title={repo.name}>
              {repo.name}
            </h3>
            <p className="text-sm text-gray-600 mb-2 h-10 overflow-hidden">
              {repo.description || 'No description available'}
            </p>
            <div className="flex justify-between text-sm text-gray-500">
              <span className="flex items-center">
                <FaStar className="mr-1 text-yellow-500" /> {repo.stargazers_count}
              </span>
              <span className="flex items-center">
                <FaCodeBranch className="mr-1 text-green-500" /> {repo.forks_count}
              </span>
            </div>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm text-blue-600 hover:underline"
            >
              View Repository
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OwnRepositories;