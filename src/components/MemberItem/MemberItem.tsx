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
