import { useAppTimer, useAppTimerSetters, useAppTimerVariables } from '@/contexts/TimerContext'
import TimerProgress from '../TimerProgress'

const TimeProgress = () => {
  const { playing, cycleTimerProgress } = useAppTimer()
  const { setPlaying } = useAppTimerSetters()

  const handleToggle = () => {
    setPlaying(!playing)
  }

