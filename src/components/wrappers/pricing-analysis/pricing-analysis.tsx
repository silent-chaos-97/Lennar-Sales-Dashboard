import Stack from '@mui/material/Stack'
import Section from '@/components/common/Section'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import BoxPlot from '@/components/charts/BoxPlot'
import SouthEastIcon from '@mui/icons-material/SouthEast'
import NorthEastIcon from '@mui/icons-material/NorthEast'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useResizeDetector } from 'react-resize-detector'
import { PricingData } from '@/types/pacing'
import CustomTooltip from '@/components/common/CustomTooltip'
import DataAlert from '@/components/common/CustomTooltip/DataAlert'
import { useAppState } from '@/contexts/StateContext'
import { truncateText } from '@/utils/helper'

interface PricingAnalysisProps {
  chartId: string
  data: PricingData
  divisionName?: string
}

const PricingAnalysis = ({ data, chartId, divisionName }: PricingAnalysisProps) => {
  const { width, height, ref } = useResizeDetector()

  const { currentCohort } = useAppState()

  const priceChanges = {
    lennar: data?.lennar_prices?.percentile_50_percent_change || 0,
    new: data?.new_construction_prices?.percentile_50_percent_change || 0,
    resale: data?.resale_prices?.percentile_50_percent_change || 0
  }

  const diffColor = (diffPercent: number) => {
    if (diffPercent === 0) return 'text.primary'
    else if (diffPercent > 0) return 'success.main'
    return 'error'
  }

  return (
    <Section
      title="Pricing Analysis"
      timestamp="Last 1W"
      more={
        <Stack direction="row" alignItems="center" spacing={1} color="text.secondary">
          <ArrowForwardIcon color="inherit" />
          <Typography variant="caption" color="text.secondary">
            vs prior 1W
          </Typography>
        </Stack>
      }
    >
      <Stack>
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 4 }}>
          <Box flex={1}>
            <CustomTooltip elementName="pacing-national-median-price">
              <Typography variant="caption" color="text.secondary" fontWeight={500}>
                <DataAlert elementName="pacing-national-median-price">
                  {truncateText(
                    `${divisionName ? divisionName : currentCohort.name} median price`,
                    35
                  )}
                </DataAlert>
              </Typography>
            </CustomTooltip>
            <Stack direction="row" alignItems="flex-end" spacing={0.5}>
              <Typography variant="h3" fontWeight={700}>
                ${(data?.lennar_prices?.percentile_50 || 0).toLocaleString()}
              </Typography>
              {priceChanges.lennar !== 0 && (
                <>
                  {priceChanges.lennar > 0 ? (
                    <NorthEastIcon color="success" />
                  ) : (
                    <SouthEastIcon color="error" />
                  )}
                </>
              )}
              <Typography
                variant="subtitle1"
                color={diffColor(priceChanges.lennar)}
                fontWeight={700}
              >
                {priceChanges.lennar}%
              </Typography>
            </Stack>
          </Box>
          <Box flex={1}>
            <CustomTooltip elementName="pacing-new-construction-median-price">
              <Typography variant="caption" color="text.secondary" fontWeight={500}>
                <DataAlert elementName="pacing-new-construction-median-price">
                  New construction median price
                </DataAlert>
