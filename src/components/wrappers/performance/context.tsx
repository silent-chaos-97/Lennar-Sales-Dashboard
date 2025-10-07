import { useAppState } from '@/contexts/StateContext'
import React, { PropsWithChildren, createContext } from 'react'
import { IscPerformanceState } from '@/types/performance'

  performanceState: IscPerformanceState
}

// Create a new context
export const PerformanceContext = createContext<PerformanceContextValues>({
