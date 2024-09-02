import React from 'react';
import { motion } from 'framer-motion';
import { Repository, Contribution } from '../../types/github';

interface ActivityTimelineProps {
  activities: (Repository | Contribution)[];
}

const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ activities }) => {
  const sortedActivities = activities
    .filter(activity => 'created_at' in activity)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 10);

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-8"
    >
      <h2 className="text-2xl font-bold mb-4 text-purple-700">Recent Activity</h2>
      {sortedActivities.length > 0 ? (
        <div className="space-y-4">
          {sortedActivities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md p-4"
            >
              {'name' in activity ? (
                <div>
                  <p className="font-semibold">Created repository: {activity.name}</p>
                  <p className="text-sm text-gray-600">{new Date(activity.created_at).toLocaleDateString()}</p>
                </div>
              ) : (
                <div>
                  <p className="font-semibold">Contributed to: {activity.repo}</p>
                  <p className="text-sm text-gray-600">Contributions: {activity.count}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No recent activity found.</p>
      )}
    </motion.div>
  );
};

export default ActivityTimeline;