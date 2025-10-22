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
import { Checkbox } from '@mui/material'

interface SettingsMenuProps {
  onClose: () => void
}

const SettingsMenu = ({ onClose }: SettingsMenuProps) => {
  const { mode, setScreenMode, showTooltips, setShowTooltips } = useScreen()
  const { cycleTimeout, idleTimeout, disableRotation } = useAppTimerVariables()
  const { setCycleTimeout, setIdleTimeout, setDisableRotation } = useAppTimerSetters()
  const { currentCohort } = useAppState()

  const [cycleTimeValue, setCycleTimeValue] = useState(cycleTimeout)
  const [idleTimeValue, setIdleTimeValue] = useState(idleTimeout)

  const handleDisableRotation = (value: number) => {
    setDisableRotation(value)
  }

  const handleChangeMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +(event.target as HTMLInputElement).value as unknown as ScreenMode
    setScreenMode(value)
  }

  const handleClickSave = () => {
    setCycleTimeout(cycleTimeValue)
    setIdleTimeout(idleTimeValue)
    onClose()
  }

  const handleToggleTooltips = () => {
    setShowTooltips((prev) => !prev)
  }

  return (
    <Box sx={{ position: 'relative', px: 2 }}>
      <Stack
        sx={{
          position: 'absolute',
          right: 0,
          borderRadius: '8px',
          px: 3,
          py: 2,
          backgroundColor: '#191D26',
          width: 460,
          boxShadow: '0 8px 16px 0 rgba(0,0,0,0.25)'
        }}
      >
        <Typography variant="h3" fontWeight={500} mb={3}>
          Hub settings
          {/* ({window.innerWidth}px) */}
        </Typography>
        <Stack alignItems="flex-start" spacing={1} mb={3.5}>
          <Typography variant="caption" color="text.secondary">
            Region display duration
          </Typography>
          <Stack direction="row" alignItems="center" spacing={3}>
            <Select
              native={true}
              defaultValue={cycleTimeout}
              onChange={(evt) => {
                setCycleTimeValue(+evt.target.value)
              }}
              variant="outlined"
              sx={{
                background: '#F2F2F2',
                color: '#000',
                height: 32,
                padding: 0,
                px: 1,
                width: 112
              }}
            >
              <option value={60}>1 min</option>
              <option value={120}>2 min</option>
              <option value={180}>3 min</option>
              <option value={240}>4 min</option>
              <option value={300}>5 min</option>
              <option value={360}>6 min</option>
              <option value={420}>7 min</option>
              <option value={480}>8 min</option>
              <option value={540}>9 min</option>
              <option value={600}>10 min</option>
            </Select>
          </Stack>
        </Stack>

        <Stack alignItems="flex-start" spacing={1} mb={3.5}>
          <Typography variant="caption" color="text.secondary">
            Locations rotate settings
          </Typography>
          <Select
            native={true}
            defaultValue={disableRotation}
            onChange={(e) => {
              handleDisableRotation(+e.target.value)
            }}
            variant="outlined"
            sx={{
              background: '#F2F2F2',
              color: '#000',
              height: 32,
              padding: 0,
              px: 1,
              width: '100%'
            }}
          >
            <option value={Rotate.locations}>Rotate locations</option>
            {currentCohort.type === 'region' || currentCohort.type === 'sub_region' ? (
              <option value={Rotate.within_region}>
                Rotate locations within current region (subregion)
              </option>
            ) : null}
            <option value={Rotate.not}>Do not rotate locations</option>
