import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react'
import { DateTime } from 'luxon'
import { useAppState } from './StateContext'
import { TIMEZONE } from '@/utils/constant'

interface TimerContextValues {
  cycleTimerProgress: number
  idleTimerProgress: number
  currentTime?: string
  playing: boolean
}

const TimerContext = createContext<TimerContextValues>({
  cycleTimerProgress: 0,
  idleTimerProgress: 0,
  playing: false
})

interface TimerContextVariables {
  cycleTimeout: number
  idleTimeout: number
  disableRotation: number
}

const TimerVariablesContext = createContext<TimerContextVariables>({
  cycleTimeout: 180,
  idleTimeout: 600,
  disableRotation: 1
})

interface TimerContextSetters {
  setCycleTimerProgress: (val: number) => void
  setCycleTimeout: (val: number) => void
  setIdleTimerProgress: (val: number) => void
  setIdleTimeout: (val: number) => void
  setPlaying: (val: boolean) => void
  setDisableRotation: (val: number) => void
}

const TimerSetterContext = createContext<TimerContextSetters>({
  setCycleTimerProgress: () => null,
  setCycleTimeout: () => null,
