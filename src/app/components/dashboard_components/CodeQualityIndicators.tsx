import React from 'react';
import { motion } from 'framer-motion';
import { DeveloperStats } from '../../types/github';
import { FaClock, FaComments } from 'react-icons/fa';

interface CodeQualityIndicatorsProps {
  stats: DeveloperStats | null;
}

const CodeQualityIndicators: React.FC<CodeQualityIndicatorsProps> = ({ stats }) => {
  if (!stats) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-purple-700">Code Quality Indicators</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="flex items-center mb-2">
            <FaClock className="text-xl text-blue-500 mr-2" />
            <p className="text-sm text-gray-600">Avg. Commit Frequency</p>
          </div>
          <p className="text-xl font-bold">{stats.averageCommitFrequency.toFixed(1)} / week</p>
        </div>
        <div>
          <div className="flex items-center mb-2">
            <FaComments className="text-xl text-green-500 mr-2" />
            <p className="text-sm text-gray-600">Code Review Participation</p>
          </div>
          <p className="text-xl font-bold">{stats.codeReviewParticipation.toFixed(1)}%</p>
        </div>
      </div>
    </motion.div>
  );
};

export default CodeQualityIndicators;