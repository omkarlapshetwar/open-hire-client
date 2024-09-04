import React from 'react';
import { motion } from 'framer-motion';
import { DeveloperStats } from '../../types/github';
import { ResponsiveCalendar } from '@nivo/calendar';

interface KeyMetricsProps {
  stats: DeveloperStats | null;
}

const KeyMetrics: React.FC<KeyMetricsProps> = ({ stats }) => {
  if (!stats) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-purple-700">Key Metrics</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Total Contributions (Year)</p>
          <p className="text-2xl font-bold">{stats.totalContributions}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Longest Streak</p>
          <p className="text-2xl font-bold">{stats.longestStreak} days</p>
        </div>
      </div>
      <div className="h-48">
        <ResponsiveCalendar
          data={stats.contributionCalendar}
          from={stats.contributionCalendar[0].day}
          to={stats.contributionCalendar[stats.contributionCalendar.length - 1].day}
          emptyColor="#eeeeee"
          colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
          margin={{ top: 20, right: 10, bottom: 10, left: 10 }}
          yearSpacing={40}
          monthBorderColor="#ffffff"
          dayBorderWidth={2}
          dayBorderColor="#ffffff"
        />
      </div>
    </motion.div>
  );
};

export default KeyMetrics;