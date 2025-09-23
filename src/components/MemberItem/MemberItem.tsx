import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import { getRandomColor } from '@/utils/helper'

interface MemberItemProps {
  cohort_rank: number
  national_rank: number
  divisionName?: string
  imageSrc: string
  name: string
  summary: string
