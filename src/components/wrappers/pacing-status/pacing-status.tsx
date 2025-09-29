import Section from '@/components/common/Section'
import { Marker, MapRef, PointLike } from 'react-map-gl'
import LMap from '@/components/common/LMap'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import BulletChart from '@/components/charts/BulletChart'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { useState, useMemo, useEffect, useRef } from 'react'
import PacingDetails from '../pacing-details/pacing-details'
import { useAppState } from '@/contexts/StateContext'
import { useResizeDetector } from 'react-resize-detector'
import PieChart from '@/components/charts/PieChart'
import { PACING_ZOOM_LEVEL, PACING_MAP_OFFSETS, STATUS_COLORS } from '@/utils/constant'
import { SubCohortItem } from '@/types/pacing'
import { useAppTimerSetters } from '@/contexts/TimerContext'
import CustomTooltip from '@/components/common/CustomTooltip'
import DataAlert from '@/components/common/CustomTooltip/DataAlert'

const MarkerIcon = styled('div', {
  shouldForwardProp: (prop) => !['color', 'active'].includes(prop as string)
})((props: { active: boolean; color: string }) => ({
  backgroundColor: props.color || 'rgba(28,209,161,0.85)',
  borderRadius: '50%',
  boxSizing: 'border-box',
  height: 20,
  width: 20,
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: `rbga(255, 255, 255, 0.7)`,
  opacity: props.active ? 1 : 0.3
}))

const PacingStatus = ({ mapWrapperRef }) => {
  const mapRef = useRef<MapRef>(null)
  const { pacingState, currentCohort } = useAppState()
  const { setPlaying, setIdleTimerProgress } = useAppTimerSetters()
  const { width, height, ref: pieChartRef } = useResizeDetector()
  const [activeDots, setActiveDots] = useState<number[]>([])
  const [activePieName, setActivePieName] = useState('')
  const [selectedPacingItem, setSelectedPacingItem] = useState<SubCohortItem | null>(null)
  const [mapViewState, setMapViewState] = useState({
    latitude: currentCohort.latitude,
    longitude: currentCohort.longitude,
    zoom: PACING_ZOOM_LEVEL[currentCohort.type]
  })
  const pacingCohortArray = pacingState?.SUB_COHORT_MAP?.sub_cohort_array || []

  useEffect(() => {
    if (!pacingState) {
      setActivePieName('')
