'use client'

import { ReactNode, createContext, useContext, useState } from 'react'
import { useApp } from '../../context/AppContext'
import { RoleSidebar } from '../navigation/RoleSidebar'
import { RoleHeader } from '../navigation/RoleHeader'
import { MobileBottomNav } from '../common/MobileBottomNav'

interface DashboardLayoutProps {
  children: ReactNode
}

interface SidebarContextType {
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within DashboardLayout')
  }
  return context
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { currentUser } = useApp()
  const [isCollapsed, setIsCollapsed] = useState(false)

  if (!currentUser) {
    return null
  }

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      <div className="dashboard-layout">
        <RoleSidebar />
        <div className={`dashboard-main ${isCollapsed ? 'collapsed' : ''}`}>
          <RoleHeader />
          <div className="dashboard-content">
            {children}
          </div>
          <MobileBottomNav />
        </div>
      </div>
    </SidebarContext.Provider>
  )
}
