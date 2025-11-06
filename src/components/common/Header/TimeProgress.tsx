import { useAppTimer, useAppTimerSetters, useAppTimerVariables } from '@/contexts/TimerContext'

const TimeProgress = () => {
  const { playing, cycleTimerProgress } = useAppTimer()
  const { setPlaying } = useAppTimerSetters()
  const { cycleTimeout } = useAppTimerVariables()

  const handleToggle = () => {
    setPlaying(!playing)
  }

  return (
    <TimerProgress
      value={(cycleTimerProgress / cycleTimeout) * 100}
