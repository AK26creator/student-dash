import React, { useState } from 'react'
import { TrendingUp, TrendingDown, Award, BarChart3 } from 'lucide-react'
import PerformanceChart from '../components/Charts/PerformanceChart'
import StatCard from '../components/Dashboard/StatCard'

const Performance = () => {
  const [selectedSemester, setSelectedSemester] = useState('current')
  
  const performanceData = {
    labels: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Computer Science'],
    datasets: [
      {
        label: 'Current Semester',
        data: [85, 78, 92, 88, 76, 82, 95],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
      {
        label: 'Previous Semester',
        data: [80, 75, 88, 85, 78, 79, 90],
        backgroundColor: 'rgba(156, 163, 175, 0.8)',
        borderColor: 'rgba(156, 163, 175, 1)',
        borderWidth: 1,
      },
    ],
  }

  const gradeDistribution = {
    labels: ['A+ (90-100)', 'A (80-89)', 'B+ (75-79)', 'B (70-74)', 'C+ (65-69)', 'C (60-64)', 'F (<60)'],
    datasets: [
      {
        data: [2, 3, 1, 1, 0, 0, 0],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(127, 29, 29, 0.8)',
        ],
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  }

  const subjects = [
    { name: 'Computer Science', current: 95, previous: 90, trend: 'up' },
    { name: 'Chemistry', current: 92, previous: 88, trend: 'up' },
    { name: 'Biology', current: 88, previous: 85, trend: 'up' },
    { name: 'Mathematics', current: 85, previous: 80, trend: 'up' },
    { name: 'History', current: 82, previous: 79, trend: 'up' },
    { name: 'Physics', current: 78, previous: 75, trend: 'up' },
    { name: 'English', current: 76, previous: 78, trend: 'down' },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Academic Performance</h1>
        <select
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="current">Current Semester</option>
          <option value="previous">Previous Semester</option>
          <option value="all">All Time</option>
        </select>
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Overall GPA"
          value="3.8"
          change={0.2}
          icon={Award}
          color="green"
        />
        <StatCard
          title="Class Rank"
          value="5th"
          change={2}
          icon={TrendingUp}
          color="blue"
        />
        <StatCard
          title="Credits Earned"
          value="18"
          change={0}
          icon={BarChart3}
          color="green"
        />
        <StatCard
          title="Subjects Passed"
          value="7/7"
          change={0}
          icon={Award}
          color="green"
        />
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceChart
          type="bar"
          data={performanceData}
          title="Subject-wise Performance Comparison"
        />
        <PerformanceChart
          type="doughnut"
          data={gradeDistribution}
          title="Current Grade Distribution"
        />
      </div>

      {/* Detailed Subject Performance */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Subject Performance Details</h3>
        <div className="space-y-4">
          {subjects.map((subject) => (
            <div key={subject.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{subject.name}</h4>
                  <p className="text-sm text-gray-600">
                    Current: {subject.current}% | Previous: {subject.previous}%
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{subject.current}%</div>
                  <div className={`flex items-center text-sm ${
                    subject.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {subject.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    {Math.abs(subject.current - subject.previous)}%
                  </div>
                </div>
                
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${subject.current}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Strengths</h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-green-50 rounded-lg">
              <Award className="h-5 w-5 text-green-600 mr-3" />
              <span className="text-sm text-green-900">Excellent performance in Computer Science</span>
            </div>
            <div className="flex items-center p-3 bg-green-50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-600 mr-3" />
              <span className="text-sm text-green-900">Consistent improvement across subjects</span>
            </div>
            <div className="flex items-center p-3 bg-green-50 rounded-lg">
              <BarChart3 className="h-5 w-5 text-green-600 mr-3" />
              <span className="text-sm text-green-900">Strong analytical skills in STEM subjects</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Areas for Improvement</h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
              <TrendingDown className="h-5 w-5 text-yellow-600 mr-3" />
              <span className="text-sm text-yellow-900">English performance needs attention</span>
            </div>
            <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
              <BarChart3 className="h-5 w-5 text-yellow-600 mr-3" />
              <span className="text-sm text-yellow-900">Focus on essay writing skills</span>
            </div>
            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
              <Award className="h-5 w-5 text-blue-600 mr-3" />
              <span className="text-sm text-blue-900">Maintain current momentum in other subjects</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Performance