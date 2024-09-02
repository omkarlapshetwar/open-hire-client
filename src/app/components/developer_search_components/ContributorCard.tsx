import React, { useState } from 'react';
import Image from 'next/image';
import { Developer } from '@/app/types/github';
import { motion } from 'framer-motion';

interface ContributorCardProps {
  developer: Developer;
}

const ContributorCard: React.FC<ContributorCardProps> = ({ developer }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
    >
      <div className="flex items-center mb-4">
        {!imageError ? (
          <Image
            src={developer.avatar_url}
            alt={`${developer.login}'s avatar`}
            width={64}
            height={64}
            className="rounded-full mr-4"
            onError={handleImageError}
          />
        ) : (
          <div className="w-16 h-16 bg-purple-300 rounded-full mr-4 flex items-center justify-center">
            <span className="text-2xl font-bold text-purple-600">
              {developer.login.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{developer.login}</h2>
          <p className="text-gray-600">{developer.location || 'Location not specified'}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="text-gray-600">
          <span className="font-medium text-gray-800">Repos:</span> {developer.public_repos}
        </div>
        <div className="text-gray-600">
          <span className="font-medium text-gray-800">Followers:</span> {developer.followers}
        </div>
      </div>
      <motion.a
        href={developer.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        View Profile
      </motion.a>
    </motion.div>
  );
};

export default ContributorCard;