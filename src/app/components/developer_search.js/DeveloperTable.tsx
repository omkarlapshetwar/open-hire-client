import React from 'react';
import { Developer } from '../../services/githubService';
import Image from 'next/image';

interface DeveloperTableProps {
  developers: Developer[];
}

const DeveloperTable: React.FC<DeveloperTableProps> = ({ developers }) => {
  return (
    <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden">
      <table className="min-w-full divide-y divide-purple-200">
        <thead className="bg-purple-100">
          <tr>
            {['Name', 'Location', 'Repos', 'Followers', 'Actions'].map((header) => (
              <th 
                key={header}
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-purple-100">
          {developers.map((developer) => (
            <tr key={developer.id} className="hover:bg-purple-50 transition duration-300">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <Image
                      className="h-10 w-10 rounded-full"
                      src={developer.avatar_url}
                      alt=""
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{developer.login}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{developer.location || 'N/A'}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{developer.public_repos}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{developer.followers}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <a href={developer.html_url} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-900">
                  View Profile
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeveloperTable;