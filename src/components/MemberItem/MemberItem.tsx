import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import { getRandomColor } from '@/utils/helper'
import { useAppState } from '@/contexts/StateContext'

interface MemberItemProps {
  cohort_rank: number
  national_rank: number
  divisionName?: string
  imageSrc: string
  name: string
  summary: string
  onOpenDetail?: () => void
  active?: boolean
  type?: string
}

const MemberItem = ({
  cohort_rank,
  national_rank,
  imageSrc,
  name,
  divisionName,
  summary,
  onOpenDetail,
  active
}: MemberItemProps) => {
  const { currentCohort } = useAppState()
  return (
    <Stack
      direction="row"
      spacing={1.5}
      alignItems="center"
      py={2}
      role="button"
      tabIndex={-1}
      sx={{
        cursor: onOpenDetail ? 'pointer' : 'default',
        color: active ? '#AF0' : '#fff'
      }}
      onClick={onOpenDetail && onOpenDetail}
    >
      <Stack alignItems="center" sx={{ width: 44 }}>
        <Typography variant="h4" fontWeight={700} color="#A5CFEF">
          {currentCohort.type === 'all' ? national_rank : cohort_rank}
