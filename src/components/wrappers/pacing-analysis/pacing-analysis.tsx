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

            <Typography variant="h1" color="success.light">
              {Math.round(pacingState?.PAST_3W_SALES || 0).toLocaleString()}/week
            </Typography>
          </Box>
          <Box flex={1}>
            <CustomTooltip elementName="pacing-next-3w-sales">
              <Typography variant="caption" color="text.secondary" fontWeight={500}>
                <DataAlert elementName="pacing-next-3w-sales">Next 3W pace</DataAlert>
              </Typography>
            </CustomTooltip>
            <Typography variant="h1" color="success.dark">
              {Math.round(pacingState?.NEXT_3W_PACE || 0).toLocaleString()}/week
            </Typography>
          </Box>
          <Box flex={1}>
            <CustomTooltip elementName="pacing-need-to-meet-pace">
              <Typography variant="caption" color="text.secondary" fontWeight={500}>
                <DataAlert elementName="pacing-need-to-meet-pace">
                  Change needed to meet pace
                </DataAlert>
              </Typography>
            </CustomTooltip>
            <Typography variant="h1">{pacingState?.CHANGE_NEEDED_TO_MEET_PACE}%</Typography>
