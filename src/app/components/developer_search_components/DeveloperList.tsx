import React from 'react';
import { motion } from 'framer-motion';
import { Developer } from '../../types/github';
import Image from 'next/image';
import Link from 'next/link';

interface DeveloperListProps {
  developers: Developer[];
  lastDeveloperRef: (node: HTMLElement | null) => void;
}

const DeveloperList: React.FC<DeveloperListProps> = ({ developers, lastDeveloperRef }) => {
  return (
    <ul className="space-y-4">
      {developers.map((developer, index) => (
        <motion.li
          key={developer.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
          ref={index === developers.length - 1 ? lastDeveloperRef : null}
        >
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-4">
              <Image
                src={developer.avatar_url}
                alt={`${developer.login}'s avatar`}
                width={64}
                height={64}
                className="rounded-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = `https://ui-avatars.com/api/?name=${developer.login}&background=random`;
                }}
              />
            </div>
            <div className="flex-grow">
              <h2 className="text-xl font-semibold text-purple-700">{developer.login}</h2>
              <p className="text-gray-600">{developer.location || 'Location not specified'}</p>
              <div className="mt-2 flex flex-wrap gap-4">
                <span className="text-sm text-gray-500">Repos: {developer.public_repos}</span>
                <span className="text-sm text-gray-500">Followers: {developer.followers}</span>
                <span className="text-sm text-gray-500">Experience: N/A</span>
                <span className="text-sm text-gray-500">Current Company: N/A</span>
              </div>
            </div>
            <Link href={`/dashboard/${developer.login}`} className="ml-4">
              <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors duration-300">
                View Dashboard
              </button>
            </Link>
          </div>
        </motion.li>
      ))}
    </ul>
  );
};

export default DeveloperList;