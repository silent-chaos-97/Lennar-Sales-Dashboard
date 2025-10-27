import { useAppTimer } from '@/contexts/TimerContext'
import Typography from '@mui/material/Typography'

const CurrentTime = () => {
  const { currentTime } = useAppTimer()

  return (
    <Typography variant="caption" color="grey.500">
