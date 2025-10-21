import { ReactElement, useMemo } from 'react'
import { Tooltip, Typography } from '@mui/material'
import { useAppState } from '@/contexts/StateContext'
import { useScreen } from '@/contexts/ScreenContext'

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
  }, [metrics?.METRICS, elementName])

  if (!showTooltips) return children

  return (
    <Tooltip
      title={<Typography sx={{ fontSize: '12px' }}>{metric?.definition_tooltip}</Typography>}
      followCursor
