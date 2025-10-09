import Stack from '@mui/material/Stack'
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
