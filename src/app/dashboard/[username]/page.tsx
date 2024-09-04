'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { getDeveloperProfile, getDeveloperContributions, getDeveloperRepos, getDeveloperStats } from '../../services/githubService';
import Spinner from '../../components/common/Spinner';
import { Developer, Contribution, Repository, DeveloperStats } from '../../types/github';
import ProfileCard from '../../components/dashboard_components/ProfileCard';
import KeyMetrics from '../../components/dashboard_components/KeyMetrics';
import SkillsAssessment from '../../components/dashboard_components/SkillsAssessment';
import OpenSourceContributions from '../../components/dashboard_components/OpenSourceContributions';
import OwnRepositories from '../../components/dashboard_components/OwnRepositories';
import CollaborationInsights from '../../components/dashboard_components/CollaborationInsights';
import CodeQualityIndicators from '../../components/dashboard_components/CodeQualityIndicators';
import ErrorDisplay from '../../components/common/ErrorDisplay';

export default function DashboardPage() {
  const params = useParams();
  const username = params.username as string;
  const [profile, setProfile] = useState<Developer | null>(null);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [stats, setStats] = useState<DeveloperStats | null>(null);
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
        const [profileData, contributionsData, reposData, statsData] = await Promise.all([
          getDeveloperProfile(username),
          getDeveloperContributions(username),
          getDeveloperRepos(username),
          getDeveloperStats(username)
        ]);
        setProfile(profileData);
        setContributions(contributionsData);
        setRepos(reposData);
        setStats(statsData);
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
        <Spinner color="purple" className="h-12 w-12" />
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
      className="container mx-auto px-4 py-8 bg-gray-100"
    >
      <motion.h1
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="text-4xl font-bold mb-8 text-center text-purple-700"
      >
        {profile?.name || username}'s Developer Profile
      </motion.h1>
      
      <OpenSourceContributions contributions={contributions} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <ProfileCard profile={profile} />
          <KeyMetrics stats={stats} />
          <SkillsAssessment repos={repos} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CollaborationInsights stats={stats} />
            <CodeQualityIndicators stats={stats} />
          </div>
        </div>
        <div className="md:col-span-1">
          <OwnRepositories repos={repos} />
        </div>
      </div>
    </motion.div>
  );
}