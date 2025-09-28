import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { AssociateArrayItem } from '@/types/sales'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import { getRandomColor, truncateText } from '@/utils/helper'

interface AssociateMemberCard {
  member: AssociateArrayItem
}

const AssociateMemberCard = ({ member }: AssociateMemberCard) => {
  const { currentCohort } = useAppState()
  return (
    <Stack
      direction="row"
