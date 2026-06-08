"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"

export function Shell({ children }: { children: React.ReactNode }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  return (
    <div className="flex h-dvh">
      {/* Desktop sidebar */}
      <Sidebar />

      {/* Mobile sidebar */}
      <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SheetTitle className="sr-only">Navigation menu</SheetTitle>
          <Sidebar />
        </SheetContent>
      </Sheet>

      <div className="flex flex-1 flex-col min-w-0">
        <Header onMenuClick={() => setMobileSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
