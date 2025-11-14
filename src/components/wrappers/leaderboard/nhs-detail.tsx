import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Section from '@/components/common/Section/Section'
import PercentValueText from '@/components/common/PercentValueText'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import CloseIcon from '@mui/icons-material/Close'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { getRandomColor } from '@/utils/helper'
import GrossSalesBarChart from '@/components/charts/GrossSalesChart/GrossSalesBarChart'
import { LeaderboardDetailProps } from './leaderboard-detail'
import KPIWidget from './kpi-widget'
import { useClickAway } from 'react-use'
import { useRef } from 'react'
import { pluralize } from '@/utils/helper'
import CustomTooltip from '@/components/common/CustomTooltip'

const NHSDetail = ({
  open,
  name,
  onPrev,
  onNext,
  onClose,
  data,
  imageUrl,
  cohortRank,
  nationalRank,
  disablePrevNext,
  activeTimestamp
}: LeaderboardDetailProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  useClickAway(wrapperRef, () => onClose())

  return (
    <Fade in={open}>
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: 60,
          bottom: 0,
          right: 0,
          bgcolor: 'rgba(33,41,54,0.67)',
          zIndex: 3
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 1420,
            bgcolor: 'background.paper',
            boxShadow: 24,
            px: 3,
            py: 2.5,
            borderRadius: 2
          }}
          ref={wrapperRef}
        >
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h3" fontWeight={700}>
              {name}
            </Typography>
            <Stack direction="row">
              <IconButton onClick={onPrev}>
                <ChevronLeftIcon htmlColor="#dde3f6" opacity={disablePrevNext[0] ? 0.25 : 1} />
              </IconButton>
              <IconButton onClick={onNext}>
                <ChevronRightIcon htmlColor="#dde3f6" opacity={disablePrevNext[1] ? 0.25 : 1} />
              </IconButton>
              <IconButton size="large" onClick={onClose}>
                <CloseIcon htmlColor="#dde3f6" />
              </IconButton>
            </Stack>
          </Stack>
          <Box sx={{ mb: 5 }}>
            <Section
              title="Activity"
              timestamp={activeTimestamp}
              more={
                <Stack direction="row" alignItems="center" spacing={1} color="text.secondary">
                  <ArrowForwardIcon color="inherit" />
                  <Typography variant="caption" color="text.secondary">
                    vs same point last period
                  </Typography>
                </Stack>
              }
            >
              <Grid container>
                <Grid item xs={2.5}>
                  <Stack direction="row" spacing={1.5} alignItems="center" py={2}>
                    <Stack alignItems="center" sx={{ width: 44 }}>
                      <Typography variant="h4" fontWeight={700} color="#A5CFEF">
                        {cohortRank}
                      </Typography>
                      <Typography variant="body1" color="#A5CFEF">
                        {nationalRank}
                      </Typography>
                    </Stack>
                    <Avatar
                      sx={{
                        width: 96,
                        height: 96,
                        bgcolor: getRandomColor(name),
                        color: 'primary.contrastText'
                      }}
                      imgProps={{ width: 300, height: 300 }}
                      alt={name}
                      src={imageUrl}
                    >
                      <Typography fontSize={28} fontWeight={700}>
                        {name.split(' ')[0][0] + name.split(' ')[1][0]}
                      </Typography>
                    </Avatar>
                  </Stack>
                </Grid>
                <Grid item xs={4.65} sx={{ ml: 8 }}>
                  <CustomTooltip elementName="label-nhc-net-revenue">
                    <Typography variant="caption" color="text.secondary" fontWeight={500}>
                      Net revenue
                    </Typography>
                  </CustomTooltip>
                  <PercentValueText
                    value={data?.net_revenue || 0}
                    change={data?.net_revenue_percent_change || 0}
                    prefix="$"
                  />
                </Grid>
                <Grid item xs={2.45}>
                  <CustomTooltip elementName="label-nhc-incentives">
                    <Typography variant="caption" color="text.secondary" fontWeight={500}>
                      Incentives
                    </Typography>
                  </CustomTooltip>
                  <PercentValueText value={data?.incentive_rate || 0} hideChange suffix="%" />
                </Grid>
                <Grid item xs={1.5}>
                  <CustomTooltip elementName="label-nhc-realtor-commission">
                    <Typography variant="caption" color="text.secondary" fontWeight={500}>
                      Realtor commisions
                    </Typography>
                  </CustomTooltip>
                  <PercentValueText
                    value={data?.realtor_commission_rate || 0}
                    hideChange
                    suffix="%"
                  />
                </Grid>
              </Grid>
            </Section>
          </Box>

          <Grid container wrap="nowrap" direction="row">
            <Grid container item xl={3} sx={{ mr: 2 }}>
              <Stack sx={{ height: '100%' }} spacing={10}>
                <KPIWidget
                  title="Division KPI rank QTD"
                  firstValue={data?.gross_sales_division_rank || 0}
                  firstLabel="Gross sales"
                  secondValue={data?.net_revenue_division_rank || 0}
                  secondLabel="Net revenue"
                  thirdValue={data?.realtor_attachment_rate_division_rank || 0}
                  thirdLabel="Realtor attachment"
                />
                <KPIWidget
                  title="National KPI rank QTD"
                  firstValue={data?.gross_sales_national_rank || 0}
                  firstLabel="Gross sales"
                  secondValue={data?.net_revenue_national_rank || 0}
                  secondLabel="Net revenue"
                  thirdValue={data?.realtor_attachment_rate_national_rank || 0}
                  thirdLabel="Realtor attachment"
                />
              </Stack>
            </Grid>

            <Grid container item direction="column" lg>
              <Grid container item justifyContent="space-between" mb={3}>
                <Grid item xs={1}>
                  <CustomTooltip elementName="label-nhc-gross-sale">
                    <Typography variant="caption" color="textSecondary">
                      {pluralize('Gross sale', data?.gross_sales || 0)}
                    </Typography>
                  </CustomTooltip>
                  <PercentValueText value={data?.gross_sales || 0} hideChange />
                </Grid>
                <Grid item xs={1}>
                  <CustomTooltip elementName="label-nhc-net-sale">
                    <Typography variant="caption" color="textSecondary">
                      {pluralize('Net sale', data?.net_sales || 0)}
                    </Typography>
                  </CustomTooltip>
                  <Box>
                    <PercentValueText value={data?.net_sales || 0} hideChange fontWeight="500" />
                  </Box>
                </Grid>
                <Grid item xs={2}>
                  <CustomTooltip elementName="label-nhc-days-since-last-sale">
                    <Typography variant="caption" color="textSecondary">
                      {pluralize('Day', data?.days_since_last_sale || 0)} since last sale
                    </Typography>
                  </CustomTooltip>
                  <PercentValueText
                    value={data?.days_since_last_sale || 0}
                    hideChange
                    fontWeight="500"
                  />
                </Grid>
                <Grid item xs={2.5}>
                  <CustomTooltip elementName="label-nhc-appts-kept">
                    <Typography variant="caption" color="textSecondary">
                      Appointments kept
