import { useMemo } from 'react'
import { useAppState } from '@/contexts/StateContext'
import Icon from '@mui/material/Icon'
import WarningRoundIcon from '@mui/icons-material/WarningRounded'
import { DataStatus } from '@/types/metrics'
import { truncateText } from '@/utils/helper'

interface DataAlertProps {
  elementName: string
  truncateSize?: number
