import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { AssociateArrayItem } from '@/types/sales'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import { getRandomColor, truncateText } from '@/utils/helper'
import { useAppState } from '@/contexts/StateContext'

interface AssociateMemberCard {
  member: AssociateArrayItem
}

const AssociateMemberCard = ({ member }: AssociateMemberCard) => {
  const { currentCohort } = useAppState()
  return (
    <Stack
      direction="row"
      borderRadius={2}
      sx={{ backgroundColor: 'background.default', px: 2, pt: 1, pb: 2.5, boxShadow: 3 }}
      spacing={1.5}
    >
      {currentCohort.type !== 'all' ? (
        <Stack spacing={0.5} mt={2}>
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{ width: 44, textAlign: 'center' }}
            color="grey.300"
          >
            {member.cohort_rank}
          </Typography>
          <Typography
            variant="body1"
            fontWeight={300}
            sx={{ width: 44, textAlign: 'center' }}
            color="grey.300"
          >
            {member.national_rank}
