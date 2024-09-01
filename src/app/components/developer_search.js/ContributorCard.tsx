import React, { useState } from 'react';
import Image from 'next/image';
import { Developer } from '../../services/githubService';

interface ContributorCardProps {
  developer: Developer;
}

const ContributorCard: React.FC<ContributorCardProps> = ({ developer }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="bg-card p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
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
            <span className="text-2xl text-purple-600">{developer.login.charAt(0).toUpperCase()}</span>
          </div>
        )}
        <div>
          <h2 className="text-xl font-semibold text-text-primary">{developer.login}</h2>
          <p className="text-text-secondary">{developer.location || 'Location not specified'}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="text-text-secondary">
          <span className="font-medium text-text-primary">Repos:</span> {developer.public_repos}
        </div>
        <div className="text-text-secondary">
          <span className="font-medium text-text-primary">Followers:</span> {developer.followers}
        </div>
      </div>
    </div>
  );
};

export default ContributorCard;