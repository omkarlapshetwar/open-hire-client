import React from 'react';
import { motion } from 'framer-motion';
import { Developer } from '../../types/github';
import Image from 'next/image';

interface ProfileCardProps {
  profile: Developer | null;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  if (!profile) return null;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <div className="flex items-center mb-4">
        <Image
          src={profile.avatar_url}
          alt={`${profile.login}'s avatar`}
          width={80}
          height={80}
          className="rounded-full mr-4"
        />
        <div>
          <h2 className="text-2xl font-bold text-purple-700">{profile.name || profile.login}</h2>
          <p className="text-gray-600">@{profile.login}</p>
        </div>
      </div>
      {profile.bio && <p className="text-gray-700 mb-4">{profile.bio}</p>}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600">Followers</p>
          <p className="text-xl font-bold">{profile.followers}</p>
        </div>
        <div>
          <p className="text-gray-600">Following</p>
          <p className="text-xl font-bold">{profile.following}</p>
        </div>
        <div>
          <p className="text-gray-600">Public Repos</p>
          <p className="text-xl font-bold">{profile.public_repos}</p>
        </div>
        <div>
          <p className="text-gray-600">Location</p>
          <p className="text-xl font-bold">{profile.location || 'N/A'}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;