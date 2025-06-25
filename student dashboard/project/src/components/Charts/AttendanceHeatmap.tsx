import React from 'react'

interface AttendanceHeatmapProps {
  data: Array<{
    date: string
    status: 'present' | 'absent' | 'late'
  }>
}

const AttendanceHeatmap: React.FC<AttendanceHeatmapProps> = ({ data }) => {
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const currentDate = new Date()
  const daysInMonth = getDaysInMonth(currentDate)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const getStatusColor = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    const attendance = data.find(d => d.date === dateStr)
    
    if (!attendance) return 'bg-gray-100'
    
    switch (attendance.status) {
      case 'present':
        return 'bg-green-500'
      case 'late':
        return 'bg-yellow-500'
      case 'absent':
        return 'bg-red-500'
      default:
        return 'bg-gray-100'
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Heatmap</h3>
      
      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map(day => (
          <div
            key={day}
            className={`aspect-square flex items-center justify-center text-sm font-medium text-white rounded-lg ${getStatusColor(day)}`}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center space-x-6 mt-6">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
          <span className="text-sm text-gray-600">Present</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
          <span className="text-sm text-gray-600">Late</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
          <span className="text-sm text-gray-600">Absent</span>
        </div>
      </div>
    </div>
  )
}

export default AttendanceHeatmap