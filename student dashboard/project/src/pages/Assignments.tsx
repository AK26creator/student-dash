import React, { useState } from 'react'
import { Plus, Filter, Search, Calendar } from 'lucide-react'
import AssignmentCard from '../components/Assignments/AssignmentCard'
import { Assignment } from '../lib/supabase'

const Assignments = () => {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data - in real app this would come from Supabase
  const assignments: Assignment[] = [
    {
      id: '1',
      student_id: 'student-1',
      title: 'Linear Algebra Problem Set',
      subject: 'Mathematics',
      due_date: '2024-01-25',
      status: 'pending',
      created_at: '2024-01-15T00:00:00Z'
    },
    {
      id: '2',
      student_id: 'student-1',
      title: 'Physics Lab Report',
      subject: 'Physics',
      due_date: '2024-01-20',
      status: 'submitted',
      score: 92,
      created_at: '2024-01-10T00:00:00Z'
    },
    {
      id: '3',
      student_id: 'student-1',
      title: 'Chemistry Research Paper',
      subject: 'Chemistry',
      due_date: '2024-01-18',
      status: 'late',
      score: 78,
      created_at: '2024-01-08T00:00:00Z'
    },
    {
      id: '4',
      student_id: 'student-1',
      title: 'Biology Presentation',
      subject: 'Biology',
      due_date: '2024-01-30',
      status: 'pending',
      created_at: '2024-01-12T00:00:00Z'
    },
    {
      id: '5',
      student_id: 'student-1',
      title: 'English Essay',
      subject: 'English',
      due_date: '2024-01-22',
      status: 'graded',
      score: 85,
      created_at: '2024-01-05T00:00:00Z'
    }
  ]

  const filteredAssignments = assignments.filter(assignment => {
    const matchesFilter = filter === 'all' || assignment.status === filter
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.subject.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getFilterCount = (status: string) => {
    if (status === 'all') return assignments.length
    return assignments.filter(a => a.status === status).length
  }

  const completionRate = Math.round((assignments.filter(a => a.status === 'submitted' || a.status === 'graded').length / assignments.length) * 100)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Assignments</h1>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          New Assignment
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Assignments</p>
              <p className="text-3xl font-bold text-gray-900">{assignments.length}</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completion Rate</p>
              <p className="text-3xl font-bold text-gray-900">{completionRate}%</p>
            </div>
            <div className="w-16 h-16 relative">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-200"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-green-600"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={`${completionRate}, 100`}
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-3xl font-bold text-yellow-600">{getFilterCount('pending')}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Score</p>
              <p className="text-3xl font-bold text-gray-900">85%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-400" />
            <div className="flex space-x-2">
              {[
                { key: 'all', label: 'All', count: getFilterCount('all') },
                { key: 'pending', label: 'Pending', count: getFilterCount('pending') },
                { key: 'submitted', label: 'Submitted', count: getFilterCount('submitted') },
                { key: 'late', label: 'Late', count: getFilterCount('late') },
                { key: 'graded', label: 'Graded', count: getFilterCount('graded') }
              ].map(({ key, label, count }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    filter === key
                      ? 'bg-blue-100 text-blue-700 border-blue-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {label} ({count})
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search assignments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
        </div>
      </div>

      {/* Assignments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssignments.map((assignment) => (
          <AssignmentCard key={assignment.id} assignment={assignment} />
        ))}
      </div>

      {filteredAssignments.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Calendar className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No assignments found</h3>
          <p className="text-gray-500">Try adjusting your filters or search terms.</p>
        </div>
      )}
    </div>
  )
}

export default Assignments