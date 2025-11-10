import CustomTooltip from '@/components/common/CustomTooltip'
import DataAlert from '@/components/common/CustomTooltip/DataAlert'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

interface TrackProps {
  color?: string
  percent: number
}

interface GoalLineProps {
  color?: string
  percent: number
  goal: number
}

const Track = styled('div', {
  shouldForwardProp: (prop) => !['color', 'percent'].includes(prop as string)
})(({ color, percent }: TrackProps) => ({
  width: 48,
  borderRadius: '4px 4px 0 0',
  background: color || '#fff',
  height: `${percent}%`,
  transform: 'height 0.2s ease-in'
}))

const GoalLine = styled('div', {
  shouldForwardProp: (prop) => !['color', 'percent', 'goal'].includes(prop as string)
})(({ color, percent, goal }: GoalLineProps) => ({
  width: 48,
  background: color || '#fff',
  height: 4,
  position: 'absolute',
  top: `${100 - percent}%`,
  transform: `translateY(-${100 - percent}%)`,
  borderRadius: 2,
  '&:before': {
    content: `"${goal}%"`,
    position: 'absolute',
    left: 'calc(100% + 4px)',
    top: -9,
    fontSize: 16,
    lineHeight: '20px',
    color: 'rgba(255, 255, 255, 0.67)'
  }
}))

interface PerformanceBarProps {
  color?: string
  title: string
  value?: number
  goal?: number
  missed?: number
}

const PerformanceBar = ({
  color = 'red',
  title,
  value = 0,
  goal = 0,
  missed = 0
}: PerformanceBarProps) => {
  const colors = {
    red: '#DF5347',
    green: '#009D4F',
    yellow: '#EC9628'
  }

  // Align Goal line with Value text

  return (
    <Stack
      direction="row"
      borderBottom={1}
      flex={1}
      borderColor="rgba(255, 255, 255, 0.18)"
      spacing={2}
      position="relative"
    >
      <Stack justifyContent="space-between" sx={{ height: '100%' }}>
        <Box>
          <CustomTooltip elementName={`label-${title.replaceAll(' ', '-').toLowerCase()}`}>
            <Typography typography="caption" color="rgba(255, 255, 255, 0.67)">
              <DataAlert elementName={`label-${title.replaceAll(' ', '-').toLowerCase()}`}>
                {title}
              </DataAlert>
            </Typography>
          </CustomTooltip>
          <Typography variant="h1" color="#a5cfef" fontWeight={500}>
