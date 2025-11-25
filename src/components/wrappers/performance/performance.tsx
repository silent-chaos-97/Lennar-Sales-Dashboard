import { useState } from 'react'
import Section from '@/components/common/Section/Section'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { ResponsiveRadialBar } from '@nivo/radial-bar'
import { RadialAxisTickProps } from '@nivo/polar-axes'
import PerformanceBar from '@/components/charts/PerformanceBar'
import { useAppState } from '@/contexts/StateContext'
import { useMemo } from 'react'
import { PERFORMANCE_COLORS } from '@/utils/constant'
import CustomTooltip from '@/components/common/CustomTooltip'
import DataAlert from '@/components/common/CustomTooltip/DataAlert'
import { PerformanceProvider, usePerformanceContext } from './context'
import { PERFORMANCE_TIMEFRAMES } from '@/types/performance'

const AxisXStartTickComponent = (props: RadialAxisTickProps) => {
  const { performanceState } = usePerformanceContext()
  const value = performanceState?.[props.label].percent_value || 0
  const labels = {
    BEBACKS_WITH_FOLLOWUP: 'Be-backs with follow-up',
    LEADS_WITH_FOLLOWUP: 'Leads with follow-up',
    LEADS_WITH_TRIFECTA: 'Leads with trifecta'
  }

  return (
    <g transform={`translate(${props.y}, 0) rotate(${props.rotation})`}>
      <CustomTooltip elementName={`label-${props.label.toString().toLowerCase()}`}>
        <text
          dx={props.textX}
          dy={-24}
          textAnchor={props.textAnchor}
          fill="#fff"
          fillOpacity="0.67"
          fontSize={16}
          fontFamily="mabry-pro"
        >
          <DataAlert
            elementName={`label-${props.label.toString().toLowerCase()}`}
            truncateSize={0}
            isSvg
          >
            {labels[props.label]}
          </DataAlert>
        </text>
      </CustomTooltip>
      <text
        dx={props.textX}
        textAnchor={props.textAnchor}
        dy={22}
        fontSize={56}
        fontWeight={500}
        fill="#A5CFEF"
        fontFamily="mabry-pro"
      >
        {value}%
      </text>
    </g>
  )
}

const AxisXEndTickComponent = (props: RadialAxisTickProps) => {
  const { performanceState } = usePerformanceContext()
  const goal = performanceState?.[props.label].goal_value || 0

  return (
    <g transform={`translate(${props.y}, 0) rotate(180)`}>
      <text
        dx={-12}
        dy={-12}
        textAnchor={props.textAnchor}
        fill="#fff"
        fillOpacity="0.67"
        fontSize={16}
        fontFamily="mabry-pro"
      >
        {goal}%
      </text>
    </g>
  )
}

const Performance = () => {
  const { performanceTimeframeState } = useAppState()
  const [performanceTimeframe, setPerformanceTimeframe] = useState('t7d')
  const performanceState = performanceTimeframeState[performanceTimeframe]

  const radialData = useMemo(() => {
    return [
      {
        id: 'BEBACKS_WITH_FOLLOWUP',
        data: [
          {
            x: 'Be-backs with follow-up',
            y: Math.min(
              ((performanceState?.BEBACKS_WITH_FOLLOWUP.percent_value || 0) /
                (performanceState?.BEBACKS_WITH_FOLLOWUP.goal_value || 100)) *
                100,
              100
            )
          }
        ]
      },
      {
        id: 'LEADS_WITH_FOLLOWUP',
        data: [
          {
            x: 'Leads with follow-up',
            y: Math.min(
              100,
              ((performanceState?.LEADS_WITH_FOLLOWUP.percent_value || 0) /
                (performanceState?.LEADS_WITH_FOLLOWUP.goal_value || 100)) *
                100
            )
          }
        ]
      },
      {
        id: 'LEADS_WITH_TRIFECTA',
        data: [
          {
            x: 'Leads with trifecta',
            y: Math.min(
              ((performanceState?.LEADS_WITH_TRIFECTA.percent_value || 0) /
                (performanceState?.LEADS_WITH_TRIFECTA.goal_value || 100)) *
                100,
              100
            )
          }
        ]
      }
    ]
  }, [performanceState])

  return (
    <PerformanceProvider timeframe={performanceTimeframe}>
      <Section
        title="ISC Performance"
        timestamp={PERFORMANCE_TIMEFRAMES[performanceTimeframe]}
        timestampList={PERFORMANCE_TIMEFRAMES}
        onSelectTimestamp={setPerformanceTimeframe}
        more={
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Box width={24} height={4} borderRadius={2} bgcolor="rgba(255,255,255,0.5)" />
            <Typography variant="caption" color="textSecondary">
              Goal
            </Typography>
          </Stack>
        }
        dropdownAlignment="left"
      >
        <Grid container>
          <Grid item lg={3}>
            <Stack sx={{ height: '100%', justifyContent: 'space-between' }} spacing={8}>
              <PerformanceBar
                title="Inbound calls answered"
                color={performanceState?.INBOUND_CALLS_ANSWERED.color}
                value={performanceState?.INBOUND_CALLS_ANSWERED.percent_value || 0}
                goal={performanceState?.INBOUND_CALLS_ANSWERED.goal_value}
              />
              <PerformanceBar
                title="Inbound chats answered"
                color={performanceState?.INBOUND_CHATS_ANSWERED.color}
                value={performanceState?.INBOUND_CHATS_ANSWERED.percent_value}
                goal={performanceState?.INBOUND_CHATS_ANSWERED.goal_value}
              />
            </Stack>
          </Grid>
          <Grid item lg={6} sx={{ height: 560 }}>
            <ResponsiveRadialBar
              data={radialData}
              maxValue={100}
              valueFormat=">-.2f"
              innerRadius={0.05}
              padding={0.6}
              cornerRadius={20}
              enableRadialGrid={false}
              enableCircularGrid={false}
              radialAxisStart={{
                tickSize: 0,
                tickPadding: 12,
                tickRotation: 0,
                tickComponent: AxisXStartTickComponent
              }}
              radialAxisEnd={{
                tickSize: 0,
                tickPadding: 12,
                tickRotation: 0,
                tickComponent: AxisXEndTickComponent
              }}
              circularAxisOuter={null}
              tracksColor="#000000"
              colors={[
                PERFORMANCE_COLORS[performanceState?.BEBACKS_WITH_FOLLOWUP.color || 'green'],
                PERFORMANCE_COLORS[performanceState?.LEADS_WITH_FOLLOWUP.color || 'green'],
                PERFORMANCE_COLORS[performanceState?.LEADS_WITH_TRIFECTA.color || 'green']
              ]}
              isInteractive={false}
            />
          </Grid>
          <Grid item lg={3}>
            <Stack sx={{ height: '100%', justifyContent: 'space-between' }} spacing={5}>
              <PerformanceBar
                title="Leads with appointment set"
                color={performanceState?.LEADS_WITH_APPOINTMENT_SET.color}
                value={performanceState?.LEADS_WITH_APPOINTMENT_SET.percent_value}
                goal={performanceState?.LEADS_WITH_APPOINTMENT_SET.goal_value}
              />
              <PerformanceBar
                title="Appointments kept"
                color={performanceState?.APPOINTMENTS_KEPT.color}
                value={performanceState?.APPOINTMENTS_KEPT.percent_value}
                goal={performanceState?.APPOINTMENTS_KEPT.goal_value}
                missed={performanceState?.APPOINTMENTS_KEPT.missed}
              />
              <PerformanceBar
                title="Sales with ISC attached"
                color={performanceState?.SALES_WITH_ISC_ATTACHED.color}
                value={performanceState?.SALES_WITH_ISC_ATTACHED.percent_value}
                goal={performanceState?.SALES_WITH_ISC_ATTACHED.goal_value}
              />
            </Stack>
          </Grid>
        </Grid>
      </Section>
    </PerformanceProvider>
  )
}

export default Performance
