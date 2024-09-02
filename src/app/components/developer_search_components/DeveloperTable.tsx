import React from 'react';
import { motion } from 'framer-motion';
import { Developer } from '@/app/types/github';
import ContributorCard from './ContributorCard';

interface DeveloperTableProps {
  developers: Developer[];
  lastDeveloperRef: (node: HTMLElement | null) => void;
}

const DeveloperTable: React.FC<DeveloperTableProps> = React.memo(({ developers, lastDeveloperRef }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {developers.map((developer, index) => (
        <div
          key={developer.id}
          ref={index === developers.length - 1 ? lastDeveloperRef : null}
        >
          <ContributorCard developer={developer} />
        </div>
      ))}
    </motion.div>
  );
});

DeveloperTable.displayName = 'DeveloperTable';

export default DeveloperTable;