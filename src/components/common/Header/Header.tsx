import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import RefreshIcon from '@mui/icons-material/Refresh'
import { styled } from '@mui/material/styles'
import SettingsIcon from '@mui/icons-material/Settings'
import { useAppState } from '@/contexts/StateContext'
import Button from '@mui/material/Button'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import RegionSelectMenu from './RegionSelectMenu'
import { Division } from '@/types/cohort'
import Fade from '@mui/material/Fade'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { useAppTimerSetters } from '@/contexts/TimerContext'
import { useClickAway } from 'react-use'
import SettingsMenu from './SettingsMenu'
import { ScreenMode, useScreen } from '@/contexts/ScreenContext'
import TimeProgress from './TimeProgress'
import CurrentTime from './CurrentTime'
import { Alert, Typography } from '@mui/material'
import WarningRoundIcon from '@mui/icons-material/WarningRounded'
import { HTTP_STATUS_CODES } from '@/utils/constant'

const Wrapper = styled('header')(({ theme }) => ({
  height: 104,
  display: 'flex',
  background: theme.palette.background.secondary,
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.5)',
  position: 'absolute',
  left: 0,
  top: 0,
  margin: '0 auto',
  width: '100%',
  zIndex: 9
}))

const Screen = styled('div')({
  position: 'relative',
  paddingTop: 104
})

