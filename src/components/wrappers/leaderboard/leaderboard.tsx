import { useEffect, useState, useMemo, useCallback } from 'react'
import MemberItem from '@/components/MemberItem/MemberItem'
import Section from '@/components/common/Section/Section'
import { useAppState } from '@/contexts/StateContext'
import { LeaderboardItemValue, LeaderboardObj } from '@/types/leaderboards'
import LeaderboardDetail from './leaderboard-detail'
import { Scrollbar } from 'react-scrollbars-custom'
import { LEADERBOARD_TIMEFRAMES } from '@/types/leaderboards'

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

const Leaderboard = ({ leaderboardData, categoryList }: IscLeaderBoardProps) => {
  const { currentCohort } = useAppState()
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const [disablePrevNext, setDisablePrevNext] = useState<[boolean, boolean]>([false, false])
  const [activeTimestamp, setActiveTimestamp] = useState('QTD')
  const [activeCategory, setActiveCategory] = useState(Object.keys(categoryList)[0])

  useEffect(() => {
    setActiveIdx(null)
  }, [currentCohort])

  const handleClickDetail = (idx: number) => {
    setActiveIdx(idx)
  }

  const leaderboardItems: LeaderboardItemValue[] = useMemo(() => {
    if (!leaderboardData) return []

