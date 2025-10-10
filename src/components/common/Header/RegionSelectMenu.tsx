import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import { useAppState } from '@/contexts/StateContext'
import { Division } from '@/types/cohort'
import SelectMenuItem from './SelectMenuItem'

const NATIONAL_DIVISION = {
  name: 'National',
  type: 'all',
  latitude: 35.86,
  longitude: -98.26,
  timezone: 'US/Eastern'
}

interface RegionSelectMenuProps {
  onSelectMenu: (menu: Division) => void
}

const LogoSvg = () => (
  <svg
    width="144px"
    height="13.0212766px"
    viewBox="0 0 144 13.0212766"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>E0D4AAAD-8141-49E4-A287-03057C5D244C</title>
    <g id="Sketches" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g
        id="menu-logo"
        transform="translate(-558.000000, -115.000000)"
        fill="#A5CFEF"
        fillRule="nonzero"
