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
  setIdleTimerProgress: () => null,
  setIdleTimeout: () => null,
  setPlaying: () => null,
  setDisableRotation: () => null
})

export enum Rotate {
  locations = 1,
  within_region,
  not
}

export const TimerProvider = (props: PropsWithChildren) => {
  const { refreshData, fetchNextDivision, fetchRegionDivisions, currentCohort } = useAppState()
  const [cycleTimerProgress, setCycleTimerProgress] = useState(0)
  const [cycleTimeout, setCycleTimeout] = useState(180)
  const [idleTimerProgress, setIdleTimerProgress] = useState(0)
  const [idleTimeout, setIdleTimeout] = useState(600)
  const [disableRotation, setDisableRotation] = useState(1)
  const [playing, setPlaying] = useState(true)
  const [currentTime, setCurrentTime] = useState(
    DateTime.local().setZone('America/New_York').toFormat("h:mm a 'ET' MMM d")
  )

  useEffect(() => {
    const cycleTimer = setInterval(() => {
      if (playing) {
        if ((cycleTimerProgress / cycleTimeout) * 100 >= 100) {
          setCycleTimerProgress(0)
          switch (disableRotation) {
            case Rotate.locations:
              fetchNextDivision()
              break
            case Rotate.within_region:
              fetchRegionDivisions()
              break
            case Rotate.not:
              refreshData(false)
              break
          }
        } else {
          setCycleTimerProgress((prevProgress) => prevProgress + 1)
        }
      }
    }, 1000)

    return () => {
      clearInterval(cycleTimer)
    }
  }, [playing, cycleTimerProgress, cycleTimeout, disableRotation])

  useEffect(() => {
    const idleTimer = setInterval(() => {
      setCurrentTime(
        DateTime.now().setZone(TIMEZONE[currentCohort.timezone]).toLocaleString({
          hour: 'numeric',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short'
        })
      )
      if (!playing) {
        if ((idleTimerProgress / idleTimeout) * 100 >= 100) {
          setPlaying(true)
        }
        setIdleTimerProgress((prevProgress) => prevProgress + 1)
      }
    }, 1000)

    return () => {
      clearInterval(idleTimer)
    }
  }, [idleTimerProgress, idleTimeout, playing, currentCohort])

  const memoizedSetters = useMemo<TimerContextSetters>(
    () => ({
      setCycleTimerProgress,
      setCycleTimeout,
      setIdleTimerProgress,
      setIdleTimeout,
      setPlaying,
      setDisableRotation
    }),
    [
      setCycleTimerProgress,
      setCycleTimeout,
