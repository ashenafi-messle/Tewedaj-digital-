'use client'

import { ReactNode, createContext, useContext, useState, useEffect } from 'react'
import { useApp } from '../../context/AppContext'
import { RoleSidebar } from '../navigation/RoleSidebar'
import { RoleHeader } from '../navigation/RoleHeader'
import { MobileDrawer } from '../navigation/MobileDrawer'
import { MobilePortalHeader } from '../navigation/MobilePortalHeader'
import { MobileBottomNav } from '../common/MobileBottomNav'
import { usePathname } from 'next/navigation'

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
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileDrawerOpen(false)
  }, [pathname])

  // Remove mobile drawer open class when drawer is closed
  useEffect(() => {
    if (isMobileDrawerOpen) {
      document.body.classList.add('mobile-drawer-open')
    } else {
      document.body.classList.remove('mobile-drawer-open')
    }

    return () => {
      document.body.classList.remove('mobile-drawer-open')
    }
  }, [isMobileDrawerOpen])

  if (!currentUser) {
    return null
  }

  // Get page title based on current route
  const getPageTitle = () => {
    const pathSegments = pathname.split('/').filter(Boolean)
    if (pathSegments.length === 0) return 'Dashboard'
    
    const lastSegment = pathSegments[pathSegments.length - 1]
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1).replace(/-/g, ' ')
  }

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      <div className="dashboard-layout">
        {/* Desktop Sidebar */}
        <RoleSidebar />
        
        {/* Mobile Drawer */}
        <MobileDrawer 
          isOpen={isMobileDrawerOpen} 
          onClose={() => setIsMobileDrawerOpen(false)} 
        />
        
        {/* Main Content Area */}
        <div className={`dashboard-main ${isCollapsed ? 'collapsed' : ''}`}>
          {/* Desktop Header */}
          <RoleHeader />
          
          {/* Mobile Header */}
          <MobilePortalHeader 
            onMenuClick={() => setIsMobileDrawerOpen(true)}
            title={getPageTitle()}
          />
          
          {/* Page Content */}
          <div className="dashboard-content">
            {children}
          </div>
        </div>
        
        {/* Mobile Bottom Navigation */}
        <MobileBottomNav onMenuClick={() => setIsMobileDrawerOpen(true)} />
      </div>
    </SidebarContext.Provider>
  )
}
