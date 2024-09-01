import React from 'react';
import { Developer } from '../../services/githubService';
import ContributorCard from './ContributorCard';

interface ContributorsListProps {
  contributors: Developer[];
}

const ContributorsList: React.FC<ContributorsListProps> = ({ contributors }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {contributors.map((contributor) => (
        <ContributorCard key={contributor.login} developer={contributor} />
      ))}
    </div>
  );
};

export default ContributorsList;
