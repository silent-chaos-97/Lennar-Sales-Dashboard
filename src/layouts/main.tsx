import { styled } from '@mui/material/styles'
import LeftPane from './left-pane'
import CenterPane from './center-pane'
import RightPane from './right-pane'
import Header from '@/components/common/Header'
import { useResizeDetector } from 'react-resize-detector'
import { useCallback, useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import { ScreenMode, ScreenPanes, useScreen } from '@/contexts/ScreenContext'
import { useSearchParams } from 'react-router-dom'
import { useAppState } from '@/contexts/StateContext'
import { useAppTimerSetters } from '@/contexts/TimerContext'

const Main = styled('main')({
  width: '100%'
})

const DashboardLayout = styled('div')({
  display: 'grid',
  gridTemplateColumns:
    '[left-start] 65fr [left-end center-start] 84fr [center-end right-start] 65fr [right-end]',
  width: 6420,
  columnGap: 0,
  margin: '0 auto'
})

const Screen = styled('div')({
  width: 2400,
  height: 0,
  paddingTop: 1350,
  position: 'relative'
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

const ScreenWrapper = ({ children, padding, justifyContent = 'flex-start', width }) => {
  const { mode } = useScreen()
  const renderContent = () => {
    return (
      <Screen>
        <InnerScreen style={{ padding, justifyContent }}>{children}</InnerScreen>
      </Screen>
    )
  }

  if (width > 2400 && mode !== ScreenMode.panorama) {
    return (
      <Box display="flex" justifyContent="center" width={width}>
        {renderContent()}
      </Box>
    )
  }

  return renderContent()
}
