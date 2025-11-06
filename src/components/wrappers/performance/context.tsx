import { useAppState } from '@/contexts/StateContext'
import React, { PropsWithChildren, createContext } from 'react'
import { IscPerformanceState } from '@/types/performance'

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

// Create a provider for the new context
export const PerformanceProvider = ({
  children,
  timeframe
}: PropsWithChildren<PerformanceProviderProps>) => {
  const { performanceTimeframeState } = useAppState()

