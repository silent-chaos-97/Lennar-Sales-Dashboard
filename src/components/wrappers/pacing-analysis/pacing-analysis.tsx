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
