import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { AssociateArrayItem } from '@/types/sales'
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
