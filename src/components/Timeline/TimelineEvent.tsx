import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import PublicIcon from '@mui/icons-material/Public'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import EmailIcon from '@mui/icons-material/Email'
import SmsIcon from '@mui/icons-material/Sms'
import CallIcon from '@mui/icons-material/Call'
import CancelIcon from '@mui/icons-material/Cancel'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import SpeakerNotesOffIcon from '@mui/icons-material/SpeakerNotesOff'
import HouseIcon from '@mui/icons-material/House'
import FlagIcon from '@mui/icons-material/Flag'
import { JourneyArrayItem } from '@/types/sales'
import { DateTime } from 'luxon'
import { useMemo } from 'react'

interface TimelineEventProps {
  event: JourneyArrayItem
  expanded: boolean
}

const icons = {
  text: <SmsIcon />,
  email: <EmailIcon />,
  event_completed: <EventAvailableIcon />,
  call: <CallIcon />,
  // 'Completed live chat': <QuestionAnswerIcon />,
  live_chat: <SpeakerNotesOffIcon />,
  lead_created: <PersonAddAlt1Icon />,
  web_session: <PublicIcon />,
  opp_created: <FlagIcon />,
  cancellation: <CancelIcon />,
  sale: <HouseIcon />
}

const TimelineEvent = ({ event, expanded }: TimelineEventProps) => {
  const colors = {
    black: '#909498',
    blue: '#33A3FF',
    purple: '#AE78D7',
    red: '#E44D4D',
    green: '#1ABB96'
  }

  const formattedDate = useMemo(() => {
    const currentDate = DateTime.now()
    const eventDate = DateTime.fromFormat(event.activity_date, 'yyyy-MM-dd')

    const formattedDate =
      currentDate.year === eventDate.year
        ? eventDate.toFormat('MMM d')
        : eventDate.toFormat('MMM d, yyyy')

    return formattedDate
  }, [event.activity_date])

  return (
    <Stack direction="row">
      <Box
        sx={{
          width: 40,
          height: 40,
