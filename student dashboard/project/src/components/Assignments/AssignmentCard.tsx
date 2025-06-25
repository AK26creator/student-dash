import React from 'react'
import { Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import { Assignment } from '../../lib/supabase'

interface AssignmentCardProps {
  assignment: Assignment
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({ assignment }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'late':
        return 'text-red-600 bg-red-50 border-red-200'
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'graded':
        return 'text-blue-600 bg-blue-50 border-blue-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
      case 'graded':
        return <CheckCircle className="h-4 w-4" />
      case 'late':
      case 'pending':
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{assignment.title}</h3>
          <p className="text-sm text-gray-600">{assignment.subject}</p>
        </div>
        <div className={`flex items-center px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(assignment.status)}`}>
          {getStatusIcon(assignment.status)}
          <span className="ml-1 capitalize">{assignment.status}</span>
        </div>
      </div>

      <div className="flex items-center text-sm text-gray-600 mb-4">
        <Calendar className="h-4 w-4 mr-2" />
        Due: {formatDate(assignment.due_date)}
      </div>

      {assignment.score && (
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <span className="text-sm text-gray-600">Score</span>
          <span className="text-lg font-semibold text-gray-900">{assignment.score}/100</span>
        </div>
      )}
    </div>
  )
}

export default AssignmentCard