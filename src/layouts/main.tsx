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
