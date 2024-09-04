import React from 'react';
import { motion } from 'framer-motion';
import { Contribution } from '../../types/github';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface ContributionsChartProps {
  contributions: Contribution[];
}

const ContributionsChart: React.FC<ContributionsChartProps> = ({ contributions = [] }) => {
  if (!Array.isArray(contributions)) {
    return <p className="text-gray-600">No contribution data available.</p>;
  }

  const chartData = contributions.slice(0, 10).map(contribution => ({
    name: contribution.repo.split('/')[1] || contribution.repo,
    contributions: contribution.count
  }));

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-purple-700">Top Contributions</h2>
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="contributions" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-600">No contribution data available.</p>
      )}
    </motion.div>
  );
};

export default ContributionsChart;
