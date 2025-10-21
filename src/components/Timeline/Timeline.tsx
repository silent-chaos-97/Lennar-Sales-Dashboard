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
  journeyData: JourneyArrayItem[]
}

const Timeline = ({ journeyData }: TimelineProps) => {
  const [expanded, setExpanded] = useState(false)
  const handleChange = () => {
    setExpanded((prev) => !prev)
  }

  const journeyDays = useMemo(() => {
    const startDate = DateTime.fromFormat(journeyData[0].activity_date, 'yyyy-MM-dd')
    const endDate = DateTime.fromFormat(
      journeyData[journeyData.length - 1].activity_date,
      'yyyy-MM-dd'
    )

    const diffInDays = endDate.diff(startDate, 'days').days
    return diffInDays + 1
  }, [journeyData])

