import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import PauseIcon from '@mui/icons-material/Pause'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

interface TimerProgressProps {
  value: number
  playing: boolean
  onToggle: () => void
}

const TimerProgress = ({ value, playing, onToggle }: TimerProgressProps) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" value={value} sx={{ color: '#939BA8' }} />
        sx={{
