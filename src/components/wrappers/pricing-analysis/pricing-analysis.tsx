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
