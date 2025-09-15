'use client';

import { useEffect, useState } from 'react';
import { Package, Gift, TrendingUp, Eye } from 'lucide-react';
import Link from 'next/link';


interface Stats {
  totalTemplates: number;
  totalHantaran: number;
  activeTemplates: number;
  activeHantaran: number;
}

const AdminDashboard = () => {

  const [stats, setStats] = useState<Stats>({
    totalTemplates: 0,
    totalHantaran: 0,
    activeTemplates: 0,
    activeHantaran: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    
    const fetchStatsWithAbort = async () => {
      try {
        const [templatesRes, hantaranRes] = await Promise.all([
          fetch('/api/templates', { signal: controller.signal }),
          fetch('/api/hantaran', { signal: controller.signal })
        ]);

        if (!templatesRes.ok || !hantaranRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const templatesData = await templatesRes.json();
        const hantaranData = await hantaranRes.json();

        const activeTemplates = templatesData.data?.filter((t: { is_active: boolean }) => t.is_active).length || 0;
        const activeHantaran = hantaranData.data?.filter((h: { is_active: boolean }) => h.is_active).length || 0;

        setStats({
          totalTemplates: templatesData.data?.length || 0,
          totalHantaran: hantaranData.data?.length || 0,
          activeTemplates,
          activeHantaran
        });
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return; // Request was cancelled, ignore
        }
        console.error('Error fetching stats:', error);
        // Set default stats on error
        setStats({
          totalTemplates: 0,
          totalHantaran: 0,
          activeTemplates: 0,
          activeHantaran: 0
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStatsWithAbort();
    
    return () => {
      controller.abort();
    };
  }, []);





  const statCards = [
    {
      title: 'Total Templates',
      value: stats.totalTemplates,
      icon: Package,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Active Templates',
      value: stats.activeTemplates,
      icon: Eye,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      title: 'Total Hantaran',
      value: stats.totalHantaran,
      icon: Gift,
      color: 'bg-purple-500',
      textColor: 'text-purple-600'
    },
    {
      title: 'Active Hantaran',
      value: stats.activeHantaran,
      icon: TrendingUp,
      color: 'bg-orange-500',
      textColor: 'text-orange-600'
    }
  ];

  const quickActions = [
    {
      title: 'Manage Templates',
      description: 'Create, edit, and manage wedding invitation templates',
      href: '/admin/templates',
      icon: Package,
      color: 'bg-blue-50 hover:bg-blue-100 border-blue-200'
    },
    {
      title: 'Manage Hantaran',
      description: 'Create, edit, and manage hantaran packages',
      href: '/admin/hantaran',
      icon: Gift,
      color: 'bg-purple-50 hover:bg-purple-100 border-purple-200'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your wedding services platform</p>
          </div>
          <Link
            href="/"
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            View Site
          </Link>
        </div>
      </div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Link
                  key={index}
                  href={action.href}
                  className={`${action.color} border-2 rounded-lg p-6 transition-all duration-200 block`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <IconComponent className="h-8 w-8 text-gray-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                      <p className="text-gray-600">{action.description}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-900">System Overview</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Templates Status</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Active Templates</span>
                    <span className="font-semibold text-green-600">{stats.activeTemplates}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Inactive Templates</span>
                    <span className="font-semibold text-red-600">{stats.totalTemplates - stats.activeTemplates}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Hantaran Status</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Active Hantaran</span>
                    <span className="font-semibold text-green-600">{stats.activeHantaran}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Inactive Hantaran</span>
                    <span className="font-semibold text-red-600">{stats.totalHantaran - stats.activeHantaran}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default AdminDashboard;