import React from 'react';
import { motion } from 'framer-motion';
import { Repository } from '../../types/github';

interface LearningGrowthProps {
  repos: Repository[];
}

const LearningGrowth: React.FC<LearningGrowthProps> = ({ repos }) => {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const recentLanguages = repos
    .filter(repo => new Date(repo.created_at) > sixMonthsAgo)
    .map(repo => repo.language)
    .filter((language): language is string => language !== null);

  const uniqueRecentLanguages = Array.from(new Set(recentLanguages)).slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-purple-700">Learning & Growth</h2>
      <div>
        <h3 className="text-lg font-semibold mb-2">Recently Used Technologies</h3>
        <ul className="list-disc list-inside">
          {uniqueRecentLanguages.map(language => (
            <li key={language} className="text-gray-700">{language}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default LearningGrowth;