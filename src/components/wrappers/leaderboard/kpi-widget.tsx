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
  secondLabel: string
  thirdValue: number
  thirdLabel: string
}
const KPIWidget = ({
  title,
  firstValue,
  firstLabel,
  secondValue,
  secondLabel,
  thirdValue,
  thirdLabel
}: KPIWidgetProps) => {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary">
        {title}
      </Typography>
      <Grid container direction="row">
        <Grid item minWidth={75}>
          <Typography variant="h5" lineHeight={2} fontWeight={700} color="grey.300">
            {suffixTheNumber(firstValue)}
          </Typography>
          <Typography variant="h5" lineHeight={2} fontWeight={700} color="grey.300">
            {suffixTheNumber(secondValue)}
          </Typography>
          <Typography variant="h5" lineHeight={2} fontWeight={700} color="grey.300">
            {suffixTheNumber(thirdValue)}
