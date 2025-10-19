import Stack from '@mui/material/Stack'
import Section from '@/components/common/Section'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IndicatorBarChart from '@/components/charts/IndicatorBarChart/IndicatorBarChart'
import { useAppState } from '@/contexts/StateContext'
import CustomTooltip from '@/components/common/CustomTooltip'
import DataAlert from '@/components/common/CustomTooltip/DataAlert'

const PacingAnalysis = () => {
  const { pacingState } = useAppState()

  return (
    <Section
      title="Pacing Analysis"
      timestamp="WTD"
      more={
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Box width={24} height={4} borderRadius={2} bgcolor="#1ABB96" />
          <Typography variant="caption" color="textSecondary">
            Prediction
          </Typography>
        </Stack>
      }
    >
      <Stack sx={{ mb: 14 }}>
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 4 }}>
          <Box flex={1}>
            <CustomTooltip elementName="pacing-past-3w-sales">
              <Typography variant="caption" color="text.secondary" fontWeight={500}>
                <DataAlert elementName="pacing-past-3w-sales">Past 3W sales</DataAlert>
              </Typography>
            </CustomTooltip>

