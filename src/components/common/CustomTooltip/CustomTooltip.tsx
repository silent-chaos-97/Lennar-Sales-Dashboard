import { ReactElement, useMemo } from 'react'
import { Tooltip, Typography } from '@mui/material'
import { useScreen } from '@/contexts/ScreenContext'

export interface CustomTooltipProps {
  elementName: string
  children: ReactElement
}

const CustomTooltip = ({ elementName, children }: CustomTooltipProps) => {
  const { metrics } = useAppState()
