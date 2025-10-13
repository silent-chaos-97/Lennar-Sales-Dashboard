import TimerProgress from '../TimerProgress'

const TimeProgress = () => {
  const { playing, cycleTimerProgress } = useAppTimer()
  const { setPlaying } = useAppTimerSetters()
  const { cycleTimeout } = useAppTimerVariables()

