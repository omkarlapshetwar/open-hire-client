import React from 'react';
import { motion } from 'framer-motion';
import { DeveloperStats } from '../../types/github';
import { FaUsers, FaCodeBranch } from 'react-icons/fa';

interface CollaborationInsightsProps {
  stats: DeveloperStats | null;
}

const CollaborationInsights: React.FC<CollaborationInsightsProps> = ({ stats }) => {
  if (!stats) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-purple-700">Collaboration Insights</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center">
          <FaUsers className="text-3xl text-blue-500 mb-2" />
          <p className="text-sm text-gray-600">Organizations Contributed To</p>
          <p className="text-xl font-bold">{stats.organizationsContributedTo}</p>
        </div>
        <div className="flex flex-col items-center">
          <FaCodeBranch className="text-3xl text-green-500 mb-2" />
          <p className="text-sm text-gray-600">Open Source Projects</p>
          <p className="text-xl font-bold">{stats.openSourceProjectsContributedTo}</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-600 mb-1">PR Merge Ratio</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-purple-600 h-2.5 rounded-full"
            style={{ width: `${stats.pullRequestMergeRatio * 100}%` }}
          ></div>
        </div>
        <p className="text-right text-sm mt-1">{(stats.pullRequestMergeRatio * 100).toFixed(1)}%</p>
      </div>
    </motion.div>
  );
};

export default CollaborationInsights;