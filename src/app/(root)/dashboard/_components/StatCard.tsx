import { Card, CardContent } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import React from 'react'

interface CardProps {
    title:string,
    value: number,
    icon: React.ReactNode
}

export default function StatCard({ title, value, icon }:CardProps) {
  return (
      <Card>
          <CardContent className="p-6">
              <div className="flex items-center justify-between">
                  <div>
                      <p className="text-sm font-medium text-gray-600">{title}</p>
                      <p className="text-2xl font-bold text-gray-900">{value}</p>
                  </div>
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      {icon}
                  </div>
              </div>
          </CardContent>
      </Card>
  )
}
