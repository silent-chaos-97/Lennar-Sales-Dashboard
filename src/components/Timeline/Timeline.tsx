import { useMemo, useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import PersonIcon from '@mui/icons-material/Person'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import TimelineEvent from './TimelineEvent'
import { JourneyArrayItem } from '@/types/sales'
import { DateTime } from 'luxon'
import { Scrollbar } from 'react-scrollbars-custom'

const Divider = styled('div')(({ theme }) => ({
  background: theme.palette.secondary.main,
  position: 'absolute',
  left: 19,
  top: -4,
  height: '100%',
  width: 2,
  zIndex: -1
}))

interface TimelineProps {
