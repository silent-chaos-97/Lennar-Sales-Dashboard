import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
// import Stack from '@mui/material/Stack'
import { suffixTheNumber } from '@/utils/helper'
import { Grid } from '@mui/material'

interface KPIWidgetProps {
  title: string
  firstValue: number
  firstLabel: string
  secondValue: number
  thirdValue: number
  thirdLabel: string
}
const KPIWidget = ({
  title,
