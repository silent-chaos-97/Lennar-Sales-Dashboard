import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { suffixTheNumber } from '@/utils/helper'
import { Grid } from '@mui/material'

interface KPIWidgetProps {
  title: string
  firstValue: number
  firstLabel: string
