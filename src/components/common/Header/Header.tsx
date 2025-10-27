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

const InnerScreen = styled('div')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  padding: '0 46px',
  display: 'flex'
})

const ScreenWrapper = ({ children, padding = 0, justifyContent = 'flex-start' }) => {
  const { mode } = useScreen()
  return (
    <Screen
      sx={{
        width:
          mode === ScreenMode.desktop ? 'auto' : mode === ScreenMode.triple_monitor ? '100%' : 2400
      }}
    >
      <InnerScreen style={{ padding, justifyContent }}>{children}</InnerScreen>
    </Screen>
  )
}

const Header = () => {
  const { setPlaying, setCycleTimerProgress } = useAppTimerSetters()
  const { mode, currentScreen, setCurrentScreen } = useScreen()
  const menuRef = useRef<HTMLDivElement>(null)
  const { cohorts, setCurrentCohort, currentCohort, setPrevSelectedDivisionType, dataStatus } =
    useAppState()
  const [openSettings, setOpenSettings] = useState(false)
  const [openRegionSelectMenu, setOpenRegionSelectMenu] = useState(false)
  const [alert, setAlert] = useState<boolean>(false)

  useClickAway(menuRef, () => {
    setOpenRegionSelectMenu(false)
  })

  const handleMenuClick = () => {
    setOpenRegionSelectMenu((prev) => !prev)
  }

  const handleSelectMenu = (menu: Division) => {
    setOpenRegionSelectMenu(false)
    setPlaying(false)
    setCurrentCohort(menu)
    setPrevSelectedDivisionType('')
  }

  const handleRefreshTimer = () => {
    setCycleTimerProgress(0)
    setPlaying(true)
    setCurrentCohort(cohorts[0])
  }

  const handleClickSettings = () => {
    setOpenSettings(true)
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentScreen(newValue)
  }

  const isDesktop = mode === ScreenMode.desktop
  const isTriple = mode === ScreenMode.triple_monitor

  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    if (!timeoutRef.current && dataStatus === undefined) {
      timeoutRef.current = window.setTimeout(() => {
        setAlert(true)
      }, 20000)
    } else {
      if (timeoutRef.current) {
        timeoutRef.current && clearTimeout(timeoutRef.current)
        timeoutRef.current = window.setTimeout(() => {
          setAlert(dataStatus !== HTTP_STATUS_CODES.OK)
        }, 20000)
      }
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [dataStatus])

  return (
    <Wrapper>
      {alert && (
        <Alert
          variant="filled"
          severity="error"
          icon={<WarningRoundIcon sx={{ fontSize: 80 }} />}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            justifyContent: 'center',
            zIndex: 1000,
            height: '104px'
          }}
        >
          <Typography variant="h3">Data connection is down.</Typography>
          <Typography variant="h5">We are working to fix it right now.</Typography>
        </Alert>
      )}
      <Box
        sx={{
          width: isDesktop || isTriple ? '100%' : 6420,
          display: isTriple ? 'flex' : 'grid',
          gridTemplateColumns:
            '[left-start] 67fr [left-end center-start] 80fr [center-end right-start] 67fr [right-end]',
          placeContent: isDesktop || isTriple ? 'unset' : 'center',
          margin: '0 auto'
        }}
      >
        <ScreenWrapper justifyContent={isDesktop || isTriple ? 'center' : 'flex-end'}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            width={isDesktop || isTriple ? '100%' : 2010}
          >
            {!isDesktop && <img src="/logo.svg" alt="Lennar" width="144" />}
            <Stack
              sx={{ position: 'absolute', left: 56 }}
              alignItems="center"
              spacing={2}
              direction="row"
            >
              <TimeProgress />
              {!isDesktop && <CurrentTime />}

              {isDesktop && (
                <Stack
                  alignItems="center"
                  sx={{ py: 2 }}
                  position="relative"
                  width={isDesktop ? '100%' : 2400}
                >
                  <Button
                    sx={{
                      fontSize: 48,
                      color: '#fff',
                      lineHeight: '56px',
                      fontFamily: 'reckless',
                      fontWeight: 500,
                      borderRadius: 2
                    }}
                    endIcon={<KeyboardArrowDownIcon sx={{ width: 40, height: 40 }} />}
                    onClick={handleMenuClick}
                  >
                    {currentCohort.name === 'all' ? 'Lennar National' : currentCohort.name}
                  </Button>
                  <Fade in={openRegionSelectMenu} timeout={500} mountOnEnter unmountOnExit>
                    <Box sx={{ position: 'relative' }}>
                      <Box
                        sx={{
                          position: 'absolute',
                          left: -225,
                          top: 20,
                          overflow: 'hidden'
                        }}
                        boxShadow={1}
                        borderRadius={1}
                        ref={menuRef}
                      >
                        <RegionSelectMenu onSelectMenu={handleSelectMenu} />
