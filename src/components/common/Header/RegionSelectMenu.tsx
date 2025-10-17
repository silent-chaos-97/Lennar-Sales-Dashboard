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
      >
        <g id="lennar-logo-copy-3" transform="translate(558.000000, 115.000000)">
          <path
            id="Shape"
          ></path>
          <path
            d="M142.467392,2.80134972 C143.169201,2.80134972 143.737862,2.2342053 143.737862,1.53269608 C143.737862,0.829624486 143.169201,0.262480063 142.467392,0.262480063 C141.766969,0.262480063 141.198309,0.831186867 141.198309,1.53269608 C141.198309,2.2342053 141.766969,2.80134972 142.467392,2.80134972 Z M142.467392,3.06382979 C143.313447,3.06382979 144,2.37794438 144,1.53269608 C144,0.685885404 143.313447,0 142.467392,0 C141.621336,0 140.93617,0.685885404 140.93617,1.5311337 C140.93617,2.37794438 141.621336,3.06382979 142.467392,3.06382979 Z"
            id="Shape"
          ></path>
        </g>
      </g>
    </g>
