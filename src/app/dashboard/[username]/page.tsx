'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { getDeveloperProfile, getDeveloperContributions } from '../../services/githubService';
import Spinner from '../../components/common/Spinner';
import { Developer, Contribution } from '../../types/github';
import ProfileCard from '../../components/dashboard_components/ProfileCard';
import ContributionsChart from '../../components/dashboard_components/ContributionsChart';
import ContributionsList from '../../components/dashboard_components/ContributionsList';
import ErrorDisplay from '../../components/common/ErrorDisplay';

export default function DashboardPage() {
  const params = useParams();
  const username = params.username as string;
  const [profile, setProfile] = useState<Developer | null>(null);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (typeof username !== 'string') {
        setError('Invalid username');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const [profileData, contributionsData] = await Promise.all([
          getDeveloperProfile(username),
          getDeveloperContributions(username)
        ]);
        setProfile(profileData);
        setContributions(contributionsData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [username]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <motion.h1
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="text-4xl font-bold mb-8 text-center text-purple-700"
      >
        {profile?.name || username}'s Dashboard
      </motion.h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <ProfileCard profile={profile} />
        <ContributionsChart contributions={contributions} />
      </div>

      <ContributionsList contributions={contributions} />
    </motion.div>
  );
}