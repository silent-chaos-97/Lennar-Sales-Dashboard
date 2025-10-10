import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { useClickAway } from 'react-use'
import { useRef, useState } from 'react'
import { SubCohortItem } from '@/types/pacing'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { STATUS_COLORS, STATUS_TEXT_BY_KEY } from '@/utils/constant'
import SubPacingLeaderBoard from './sub-leaderboard'
import SubPacingAnalysis from './sub-pacing-analysis'
import PricingAnalysis from '../pricing-analysis/pricing-analysis'
import Fade from '@mui/material/Fade'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import Scrollbar from 'react-scrollbars-custom'

interface SalesDetailsProps {
  subPacingData: SubCohortItem
  pacingCohortsList: { idx: number; name: string; status: string }[]
  onClose: () => void
  onSelect: (id: number) => void
}
interface SalesDetailsListProps {
  idx: number
  name: string
  status: string
}
interface ListProps {
  list: SalesDetailsListProps[]
  choose: (idx: number) => void
  showList: (show: boolean) => void
}

const List = ({ list, choose, showList }: ListProps) => {
  const handleChoose = (idx: number) => {
    choose(idx)
    showList(false)
  }
  return (
    <Box
      sx={{
        position: 'absolute',
        px: 2,
        py: 2,
        top: 80,
        zIndex: 100,
        borderRadius: '8px',
        backgroundColor: '#212936',
        width: 460,
        boxShadow: '0 8px 16px 0 rgba(0,0,0,0.80)',
        cursor: 'pointer',
        color: '#ddd'
      }}
    >
      <Stack>
        <Scrollbar
          style={{
            maxHeight: 1040,
            height: `${list.length * 44}px`,
            width: '100%',
            paddingRight: 24
          }}
          contentProps={{ style: { paddingRight: '25px' } }}
        >
          {list.map((el) => (
            <Stack
              key={`list_${el.name.replace(' ', '')}`}
              onClick={() => handleChoose(el.idx)}
              direction="row"
              sx={{ mb: 1.5, '&:hover': { color: '#fff' } }}
            >
              <Stack width="70%">
