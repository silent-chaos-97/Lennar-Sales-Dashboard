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
