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
