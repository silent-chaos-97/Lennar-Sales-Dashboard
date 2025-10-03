import { useEffect, useState, useMemo, useCallback } from 'react'
import MemberItem from '@/components/MemberItem/MemberItem'
import Section from '@/components/common/Section/Section'
import { useAppState } from '@/contexts/StateContext'
import { LeaderboardItemValue, LeaderboardObj } from '@/types/leaderboards'
import LeaderboardDetail from './leaderboard-detail'
import { Scrollbar } from 'react-scrollbars-custom'

interface IscLeaderBoardProps {
  leaderboardData: LeaderboardObj
  categoryList: Record<string, string>
}

const LeaderboardItems = ({
  leaderboardItems,
  leaderboardData,
  currentCohort,
  activeIdx,
  handleClickDetail
}) => (
  <>
    {leaderboardItems.map((leader, idx) => (
      <MemberItem
        key={`${leader.name.split(' ').join('-').toLowerCase()}-${idx}`}
        cohort_rank={leader.cohort_rank}
        imageSrc={leader.image_url}
        name={leader.name}
        national_rank={leader.national_rank}
        summary={leader.summary}
        divisionName={currentCohort.type === 'division' ? undefined : leader.division_name}
        onOpenDetail={() => handleClickDetail(idx)}
        active={activeIdx === idx}
        type={`${leaderboardData.type.split(' ').join('-').toLowerCase()}`}
      />
    ))}
  </>
)
