import debounce from 'lodash.debounce'
import Map, { MapRef, ViewStateChangeEvent } from 'react-map-gl'

const mbStyle = process.env.REACT_APP_MAPBOX_STYLE
const mbAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

interface LMapProps {
  mapViewState: {
    latitude: number
    longitude: number
    zoom: number
  }
  padding?: {
    top: number
    bottom: number
    left: number
    right: number
  }
  style?: React.CSSProperties
  mapRef?: React.RefObject<MapRef>
  setMapViewState: (viewState: { latitude: number; longitude: number; zoom: number }) => void

  children?: React.ReactNode
}

const LMap: React.FC<LMapProps> = ({
  mapViewState,
  padding,
  style,
  setMapViewState,
  mapRef,
  children
}) => {
  const debouncedHandleMoveMap = debounce((e: ViewStateChangeEvent) => {
    setMapViewState({
      latitude: e.viewState.latitude,
      longitude: e.viewState.longitude,
      zoom: e.viewState.zoom
    })
  }, 100)

  const handleMoveMap = (e: ViewStateChangeEvent) => debouncedHandleMoveMap(e)

  return (
    <Map
      initialViewState={{
        ...mapViewState
      }}
      padding={padding}
      style={style}
      ref={mapRef}
      onMove={handleMoveMap}
      mapStyle={mbStyle}
      mapboxAccessToken={mbAccessToken}
