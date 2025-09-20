import debounce from 'lodash.debounce'
import Map, { MapRef, ViewStateChangeEvent } from 'react-map-gl'

const mbStyle = process.env.REACT_APP_MAPBOX_STYLE
const mbAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
interface LMapProps {
