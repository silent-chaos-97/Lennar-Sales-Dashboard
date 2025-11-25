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

  const firstTextBody = useMemo(() => {
    let idx: number | null = null
    for (let i = 0; i < journeyData.length; i++) {
      if (journeyData[i]?.body) {
        idx = i
        break
      }
    }

    return idx
  }, [journeyData])
  return (
    <Accordion expanded={true} disableGutters sx={{ border: 'none', background: 'transparent' }}>
      <AccordionSummary sx={{ padding: 0 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
          <Chip icon={<PersonIcon />} label={`${journeyDays}-day customer journey`} color="info" />
          <Button onClick={handleChange}>{expanded ? 'Collapse' : 'Expand'} All</Button>
        </Stack>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>
        <Box>
          <Scrollbar noScrollX style={{ height: 1000, width: '100%' }}>
            <Stack
              spacing={1}
              position="relative"
              sx={{
                marginRight: 4
              }}
            >
              <Divider />
              {journeyData.map((item, idx) => (
                <TimelineEvent
                  key={idx}
                  event={item}
                  expanded={idx === firstTextBody || expanded}
                />
              ))}
            </Stack>
          </Scrollbar>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}

export default Timeline
