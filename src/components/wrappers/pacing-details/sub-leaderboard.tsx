import MemberItem from '@/components/MemberItem/MemberItem'
import Section from '@/components/common/Section/Section'
import Stack from '@mui/material/Stack'
import { LeaderboardObj } from '@/types/leaderboards'
import { Scrollbar } from 'react-scrollbars-custom'

interface SubPacingLeaderBoardProps {
  leaders: LeaderboardObj[] | LeaderboardObj
}
const SubPacingLeaderBoard = ({ leaders }: SubPacingLeaderBoardProps) => {
  return (
    <Stack spacing={2}>
      <Scrollbar
