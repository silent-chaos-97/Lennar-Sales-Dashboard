import { useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useAppTimerVariables, useAppTimerSetters, Rotate } from '@/contexts/TimerContext'
import { ScreenMode, useScreen } from '@/contexts/ScreenContext'
import { useAppState } from '@/contexts/StateContext'

interface SettingsMenuProps {
  onClose: () => void
}

const SettingsMenu = ({ onClose }: SettingsMenuProps) => {
  const { mode, setScreenMode, showTooltips, setShowTooltips } = useScreen()
  const { cycleTimeout, idleTimeout, disableRotation } = useAppTimerVariables()
  const { setCycleTimeout, setIdleTimeout, setDisableRotation } = useAppTimerSetters()
