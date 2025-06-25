import React from 'react'
import { NavLink } from 'react-router-dom'
import { 
  BarChart3, 
  Calendar, 
  ClipboardList, 
  Brain, 
  Bell, 
  Users, 
  Settings,
  GraduationCap
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

const Sidebar = () => {
  const { profile } = useAuth()

  const navigation = [
    { name: 'Dashboard', href: '/', icon: BarChart3, roles: ['student', 'staff', 'admin'] },
    { name: 'Performance', href: '/performance', icon: BarChart3, roles: ['student', 'staff', 'admin'] },
    { name: 'Attendance', href: '/attendance', icon: Calendar, roles: ['student', 'staff', 'admin'] },
    { name: 'Assignments', href: '/assignments', icon: ClipboardList, roles: ['student', 'staff', 'admin'] },
    { name: 'AI Insights', href: '/insights', icon: Brain, roles: ['student', 'staff', 'admin'] },
    { name: 'Alerts', href: '/alerts', icon: Bell, roles: ['student', 'staff', 'admin'] },
    { name: 'Students', href: '/students', icon: Users, roles: ['staff', 'admin'] },
    { name: 'Settings', href: '/settings', icon: Settings, roles: ['student', 'staff', 'admin'] },
  ]

  const filteredNavigation = navigation.filter(item => 
    profile?.role && item.roles.includes(profile.role)
  )

  return (
    <div className="flex flex-col w-64 bg-white border-r border-gray-200 h-screen">
      {/* Logo */}
      <div className="flex items-center px-6 py-4 border-b border-gray-200">
        <GraduationCap className="h-8 w-8 text-blue-600" />
        <h1 className="ml-3 text-xl font-bold text-gray-900">EduDashboard</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {filteredNavigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* User info */}
      <div className="px-4 py-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-white">
              {profile?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{profile?.name}</p>
            <p className="text-xs text-gray-500 capitalize">{profile?.role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar