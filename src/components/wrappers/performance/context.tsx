import { useAppState } from '@/contexts/StateContext'
import React, { PropsWithChildren, createContext } from 'react'

interface PerformanceContextValues {
  performanceState: IscPerformanceState
}
