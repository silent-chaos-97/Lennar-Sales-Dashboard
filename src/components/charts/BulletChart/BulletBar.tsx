import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import CustomTooltip from '@/components/common/CustomTooltip'
import { PacingBulletBarColors } from '@/types/pacing'

interface BulletBarProps {
  id: string
  value: number
  label?: string
  maxValue?: number
  color?: PacingBulletBarColors
}

const BulletBar = ({
  id,
  value,
  label,
  maxValue = 100,
  color = PacingBulletBarColors.white
}: BulletBarProps) => {
  return (
    <CustomTooltip elementName={id}>
      <Stack height="100%" justifyContent="flex-end">
        <Box
          height="calc(100% - 20%)"
          display="flex"
          sx={{ justifyContent: 'flex-end', flexFlow: 'column' }}
        >
          <Box
            height={`calc(${(value / maxValue) * 100}% + 32px)`}
            sx={{ position: 'relative', background: '#2B3648', width: 48, pb: 4 }}
          >
            <Typography
              variant="caption"
              fontWeight={500}
              sx={{ position: 'absolute', top: -24, left: '50%', transform: 'translateX(-50%)' }}
            >
              {value.toLocaleString()}
            </Typography>
            <Box
              sx={{
                position: 'absolute',
                height: 8,
                borderRadius: 1,
                background: color,
                border: '2px solid #fff',
                top: 0,
                left: 0,
                width: '100%'
              }}
            />
            {label && (
              <Typography
                variant="caption"
                color="grey.600"
                fontWeight={500}
                sx={{
                  position: 'absolute',
                  bottom: -30,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  whiteSpace: 'nowrap'
                }}
              >
                {label}
