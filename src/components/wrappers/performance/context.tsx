import { useAppState } from '@/contexts/StateContext'
import React, { PropsWithChildren, createContext } from 'react'

interface PerformanceContextValues {
  performanceState: IscPerformanceState
}

// Create a new context
export const PerformanceContext = createContext<PerformanceContextValues>({
  performanceState: {} as IscPerformanceState
})

interface PerformanceProviderProps {
  timeframe: string
}
