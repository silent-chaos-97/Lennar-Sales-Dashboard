import { useAppState } from '@/contexts/StateContext'
import React, { PropsWithChildren, createContext } from 'react'
import { IscPerformanceState } from '@/types/performance'

interface PerformanceContextValues {
  performanceState: IscPerformanceState
