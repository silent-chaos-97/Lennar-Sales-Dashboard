import { useAppTimer, useAppTimerSetters, useAppTimerVariables } from '@/contexts/TimerContext'
import TimerProgress from '../TimerProgress'

const TimeProgress = () => {
  const { setPlaying } = useAppTimerSetters()
  const { cycleTimeout } = useAppTimerVariables()

  const handleToggle = () => {
    setPlaying(!playing)
