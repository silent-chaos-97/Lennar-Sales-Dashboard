import debounce from 'lodash.debounce'

const mbStyle = process.env.REACT_APP_MAPBOX_STYLE
const mbAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

interface LMapProps {
  mapViewState: {
    latitude: number
    longitude: number
    zoom: number
  }
  padding?: {
