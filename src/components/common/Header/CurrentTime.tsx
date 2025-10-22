import { useAppTimer } from '@/contexts/TimerContext'

const CurrentTime = () => {
  const { currentTime } = useAppTimer()

  return (
