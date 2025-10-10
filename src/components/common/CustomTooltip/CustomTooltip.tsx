import { ReactElement, useMemo } from 'react'
import { Tooltip, Typography } from '@mui/material'
import { useAppState } from '@/contexts/StateContext'

export interface CustomTooltipProps {
  elementName: string
  children: ReactElement
}

const CustomTooltip = ({ elementName, children }: CustomTooltipProps) => {
  const { metrics } = useAppState()
  const { showTooltips } = useScreen()

  const metric = useMemo(() => {
    if (!metrics?.METRICS) return
    return metrics?.METRICS?.find((m) => m.element_name === elementName)
