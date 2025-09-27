import { useState, useRef, useMemo } from 'react'
import { Marker, MapRef } from 'react-map-gl'
import Box from '@mui/material/Box'
import Sales from '@/components/wrappers/sales'
import SalesDetails from '@/components/wrappers/sales/detail'
import Fade from '@mui/material/Fade'
import { useAppState } from '@/contexts/StateContext'
import { DetailSalesItems, SalesItem } from '@/types/sales'
import { useEffect } from 'react'
import { useAppTimerSetters } from '@/contexts/TimerContext'
import mapboxgl from 'mapbox-gl'
import { ZOOM_LEVELS, LONGITUDE_DELTA } from '@/utils/constant'
import useSupercluster from 'use-supercluster'
import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import LMap from '@/components/common/LMap'
import { DateTime } from 'luxon'
import { TIMEZONE } from '@/utils/constant'

const popupRight = 871
const arrowTopThreshold = 124
const arrowBottomThreshold = 300

const MarkerIcon = styled('div', {
  shouldForwardProp: (prop) => !['color', 'radius'].includes(prop as string)
})((props: { color: string; radius: number }) => ({
  backgroundColor: props.color,
  borderRadius: '50%',
  boxSizing: 'border-box',
  height: props.radius,
  width: props.radius,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer'
}))

const CenterPane = () => {
  const mapWrapperRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<MapRef>(null)
  const { currentCohort, salesTimeframeState } = useAppState()
  const { setPlaying, setIdleTimerProgress } = useAppTimerSetters()
  const firstMarkerRef = useRef<HTMLDivElement>(null)
  const [svgSize, setSvgSize] = useState<{
    width: number
    height: number
    x: number
    y: number
  } | null>(null)
  const [mapViewState, setMapViewState] = useState({
    latitude: currentCohort.latitude,
    longitude: currentCohort.longitude - LONGITUDE_DELTA[currentCohort.type],
    zoom: ZOOM_LEVELS[currentCohort.type]
  })
  const now = DateTime.local().setZone(TIMEZONE[currentCohort.timezone])
  const [salesTimeframe, setSalesTimeframe] = useState('QTD')
  const salesState = salesTimeframeState[salesTimeframe]
  const isBetween7and11 = now.hour > 0 && now.hour < 11 && now.weekday === 1

  useEffect(() => {
    if (isBetween7and11) {
      setSalesTimeframe('QTD')
    } else {
      setSalesTimeframe('WTD')
    }
  }, [isBetween7and11, salesTimeframeState])

