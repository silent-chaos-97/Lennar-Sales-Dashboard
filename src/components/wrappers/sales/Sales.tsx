import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import Section from '@/components/common/Section/Section'
import DailyAnalyticsBox from '@/components/daily-analytics-box'
import { Typography } from '@mui/material'
import { useAppState } from '@/contexts/StateContext'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CustomDailyAnalyticsBox from '@/components/custom-daily-analytics-box'
import { SALES_TIMEFRAMES, SalesState } from '@/types/sales'

const Wrapper = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  width: 648,
  zIndex: 2,
  background: 'linear-gradient(to right, #191D26, rgba(33, 42, 54, 0))',
  padding: '32px 24px'
})

const StrongText = styled('span')({
  fontWeight: 700
})

interface SalesProps {
  data: SalesState
  salesTimeframe: string
  setSalesTimeframe: (salesTimeframe: string) => void
}

const Sales = ({ data: salesState, salesTimeframe, setSalesTimeframe }: SalesProps) => {
  const { insightState } = useAppState()
  const colors = {
    green: '#009d4f',
    orange: '#ec9628',
    red: '#e44d4d'
  }

  return (
    <Wrapper>
      <Section
        title="Sales"
        timestamp={SALES_TIMEFRAMES[salesTimeframe]}
        onSelectTimestamp={setSalesTimeframe}
        timestampList={SALES_TIMEFRAMES}
        more={
          <Stack direction="row" alignItems="center" spacing={1} color="text.secondary">
            <ArrowForwardIcon color="inherit" />
            <Typography variant="caption" color="text.secondary">
              vs same point last period
            </Typography>
          </Stack>
        }
        dropdownAlignment="center"
      >
        <DailyAnalyticsBox
          isLargeSize
          title="Gross sales"
          value={salesState?.GROSS_SALES?.value || 0}
          grossValue={salesState?.GROSS_SALES?.value || 0}
          diffPercent={salesState?.GROSS_SALES?.percent_change || 0}
          graphData={salesState?.GROSS_SALES?.graph}
        />
        <CustomDailyAnalyticsBox
          title="retail"
          value={salesState?.RETAIL_SALES?.value || 0}
          diffPercent={salesState?.RETAIL_SALES?.percent_change || 0}
        />
        <DailyAnalyticsBox
          title="Net sales"
          value={salesState?.NET_SALES?.value || 0}
          grossValue={salesState?.GROSS_SALES?.value || 0}
          diffPercent={salesState?.NET_SALES?.percent_change || 0}
          graphData={salesState?.NET_SALES?.graph}
        />
        <DailyAnalyticsBox
          title="Average net price"
          value={salesState?.AVG_PRICE?.value || 0}
          grossValue={salesState?.GROSS_SALES?.value || 0}
          diffPercent={salesState?.AVG_PRICE?.percent_change || 0}
          unit="$"
          graphData={salesState?.AVG_PRICE?.graph}
        />
        <DailyAnalyticsBox
          title="Average incentives as percent of price"
          value={salesState?.AVG_INCENTIVE?.value || 0}
          grossValue={salesState?.GROSS_SALES?.value || 0}
          diffPercent={salesState?.AVG_INCENTIVE?.percent_change || 0}
          unit="%"
          graphData={salesState?.AVG_INCENTIVE?.graph}
          isDecreaseBenefit
        />
        <DailyAnalyticsBox
          title="Average realtor commission as percent of price"
          value={salesState?.AVG_REALTOR_COMMISSION?.value || 0}
          grossValue={salesState?.GROSS_SALES?.value || 0}
          diffPercent={salesState?.AVG_REALTOR_COMMISSION?.percent_change || 0}
