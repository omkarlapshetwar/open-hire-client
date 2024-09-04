import React from 'react';
import { motion } from 'framer-motion';
import { Developer, DeveloperStats } from '../../types/github';
import { FaUsers, FaUserFriends } from 'react-icons/fa';

interface CommunityEngagementProps {
  profile: Developer | null;
  stats: DeveloperStats | null;
}

const CommunityEngagement: React.FC<CommunityEngagementProps> = ({ profile, stats }) => {
  if (!profile || !stats) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-purple-700">Community Engagement</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center">
          <FaUsers className="text-3xl text-blue-500 mb-2" />
          <p className="text-sm text-gray-600">Followers</p>
          <p className="text-xl font-bold">{profile.followers}</p>
        </div>
        <div className="flex flex-col items-center">
          <FaUserFriends className="text-3xl text-green-500 mb-2" />
          <p className="text-sm text-gray-600">Following</p>
          <p className="text-xl font-bold">{profile.following}</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-600 mb-2">Open Source Contributions</p>
        <p className="text-xl font-bold">{stats.openSourceProjectsContributedTo} projects</p>
      </div>
    </motion.div>
  );
};

export default CommunityEngagement;