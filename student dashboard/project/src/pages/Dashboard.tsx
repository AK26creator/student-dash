import React, { useEffect, useState } from 'react'
import { BarChart3, Calendar, ClipboardList, TrendingUp, Users, Award } from 'lucide-react'
import StatCard from '../components/Dashboard/StatCard'
import PerformanceChart from '../components/Charts/PerformanceChart'
import AttendanceHeatmap from '../components/Charts/AttendanceHeatmap'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

const Dashboard = () => {
  const { profile } = useAuth()
  const [stats, setStats] = useState({
    averageGrade: 85,
    attendanceRate: 92,
    pendingAssignments: 3,
    completedAssignments: 15
  })
  
  const [performanceData, setPerformanceData] = useState({
    labels: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History'],
    datasets: [
      {
        label: 'Current Grades',
        data: [85, 78, 92, 88, 76, 82],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  })

  const [gradeDistribution, setGradeDistribution] = useState({
    labels: ['A+', 'A', 'B+', 'B', 'C+', 'C'],
    datasets: [
      {
        data: [15, 25, 20, 18, 12, 10],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  })

  const [attendanceData, setAttendanceData] = useState([
    { date: '2024-01-15', status: 'present' as const },
    { date: '2024-01-16', status: 'present' as const },
    { date: '2024-01-17', status: 'late' as const },
    { date: '2024-01-18', status: 'present' as const },
    { date: '2024-01-19', status: 'absent' as const },
  ])

  useEffect(() => {
    // Simulate fetching dashboard data
    const fetchDashboardData = async () => {
      // In a real app, this would fetch from Supabase
      // For demo purposes, we're using mock data
    }

    fetchDashboardData()
  }, [])

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Average Grade"
          value={`${stats.averageGrade}%`}
          change={5.2}
          icon={Award}
          color="green"
        />
        <StatCard
          title="Attendance Rate"
          value={`${stats.attendanceRate}%`}
          change={2.1}
          icon={Calendar}
          color="blue"
        />
        <StatCard
          title="Pending Tasks"
          value={stats.pendingAssignments}
          change={-12.5}
          icon={ClipboardList}
          color="yellow"
        />
        <StatCard
          title="Completed Tasks"
          value={stats.completedAssignments}
          change={18.7}
          icon={TrendingUp}
          color="green"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceChart
          type="bar"
          data={performanceData}
          title="Subject-wise Performance"
        />
        <PerformanceChart
          type="doughnut"
          data={gradeDistribution}
          title="Grade Distribution"
        />
      </div>

      {/* Attendance Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AttendanceHeatmap data={attendanceData} />
        </div>
        
        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
              <div className="flex items-center">
                <ClipboardList className="h-5 w-5 text-blue-600 mr-3" />
                <span className="text-sm font-medium text-blue-900">View Assignments</span>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
              <div className="flex items-center">
                <BarChart3 className="h-5 w-5 text-green-600 mr-3" />
                <span className="text-sm font-medium text-green-900">Check Performance</span>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-lg bg-yellow-50 hover:bg-yellow-100 transition-colors">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-yellow-600 mr-3" />
                <span className="text-sm font-medium text-yellow-900">View Attendance</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard