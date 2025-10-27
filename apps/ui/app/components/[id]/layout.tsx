'use client'

import ComponentSidebar from '@/components/internal/ComponentSidebar'
import React from 'react'

const ComponentPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row gap-1 max-h-screen overflow-hidden h-full flex-1">
      <div className="bg-secondary rounded-xl h-[unset] overflow-hidden">
        <ComponentSidebar />
      </div>
      <div
        className="bg-secondary rounded-xl flex-1 p-8 overflow-auto h-[unset] relative flex flex-col items-center justify-center"
        id="preview-scroll-container"
      >
        {children}
      </div>
    </div>
  )
}

export default ComponentPageLayout
