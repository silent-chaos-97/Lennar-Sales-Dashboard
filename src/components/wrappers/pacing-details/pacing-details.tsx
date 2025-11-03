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
                <Typography variant="h6" fontWeight={400}>
                  {el.name.length > 27 ? el.name.slice(0, 25) + '...' : el.name}
                </Typography>
              </Stack>
              <Stack width="30%">
                <Stack direction="column" alignItems="flex-start">
                  <Typography
                    sx={{
                      backgroundColor: STATUS_COLORS[el.status],
                      py: 0.3,
                      px: 1,
                      borderRadius: 4
                    }}
                    variant="body1"
                    fontWeight={700}
                  >
                    {STATUS_TEXT_BY_KEY[el.status]}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          ))}
        </Scrollbar>
      </Stack>
    </Box>
  )
}

const PacingDetails = ({
  subPacingData,
  pacingCohortsList,
  onClose,
  onSelect
}: SalesDetailsProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  useClickAway(wrapperRef, () => onClose())
  const [showList, setShowList] = useState(false)

  return (
    <Fade in={true}>
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          right: 0,
          bgcolor: 'rgba(33,41,54,0.67)',
          zIndex: 99
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 80,
            width: 1500,
            left: '50%',
            transform: 'translate(-50%)',
            bgcolor: 'background.paper',
            zIndex: 20,
            px: 3,
            py: 2.5,
            borderRadius: 2,
            boxShadow: '0 8px 16px 0 rgba(0,0,0,0.5)'
          }}
          ref={wrapperRef}
        >
          <Stack direction="row" sx={{ mb: 5 }} alignItems="center" justifyContent="space-between">
            <Stack>
              <Stack
                onClick={() => setShowList((prev) => !prev)}
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{
                  cursor: 'pointer',
                  zIndex: 100
                }}
              >
                <Typography variant="h3" fontWeight={700}>
                  {subPacingData.name}
                </Typography>
                <Typography
                  sx={{
