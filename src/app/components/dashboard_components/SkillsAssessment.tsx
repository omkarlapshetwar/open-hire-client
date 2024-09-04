import React from 'react';
import { motion } from 'framer-motion';
import { Repository } from '../../types/github';

interface SkillsAssessmentProps {
  repos: Repository[];
}

const SkillsAssessment: React.FC<SkillsAssessmentProps> = ({ repos }) => {
  const languageStats = repos.reduce((acc, repo) => {
    if (repo.language) {
      acc[repo.language] = (acc[repo.language] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const topLanguages = Object.entries(languageStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-purple-700">Skills Assessment</h2>
      <div>
        <h3 className="text-lg font-semibold mb-2">Top Languages</h3>
        {topLanguages.map(([language, count]) => (
          <div key={language} className="mb-2">
            <div className="flex justify-between mb-1">
              <span>{language}</span>
              <span>{((count / repos.length) * 100).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${(count / repos.length) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SkillsAssessment;