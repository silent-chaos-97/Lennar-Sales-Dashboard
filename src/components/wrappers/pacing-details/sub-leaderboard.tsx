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
        style={{ height: 1040, width: '100%', paddingRight: 24 }}
        contentProps={{ style: { paddingRight: '25px' } }}
      >
        {Array.isArray(leaders) ? (
          leaders.map((leaderboard) => (
            <Section title={leaderboard.type} key={leaderboard.type}>
              {leaderboard.values.map((leader) => (
                <MemberItem
                  key={leader.name.toLowerCase().replaceAll(' ', '-')}
                  cohort_rank={leader.cohort_rank}
                  imageSrc={leader.image_url}
                  name={leader.name}
                  national_rank={leader.national_rank}
                  summary={leader.summary}
                />
              ))}
            </Section>
          ))
        ) : (
