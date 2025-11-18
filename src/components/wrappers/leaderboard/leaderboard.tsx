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

    return leaderboardData[activeCategory][activeTimestamp]
  }, [leaderboardData, categoryList, activeTimestamp, activeCategory])

  useEffect(() => {
    setDisablePrevNext([!activeIdx, activeIdx === leaderboardItems.length - 1])
  }, [activeIdx, leaderboardItems])

  const handleClickPrev = () => {
    setActiveIdx((prev) => Math.max(0, (prev || 0) - 1))
  }

  const handleClickNext = useCallback(() => {
    setActiveIdx((prev) => Math.min(leaderboardItems.length - 1, (prev || 0) + 1))
  }, [leaderboardItems])

  const handleSelectTimestamp = (timestamp: string) => {
    setActiveTimestamp(timestamp)
  }

  const handleSelectCategory = (category: string) => {
    setActiveCategory(category)
  }

  return (
    <>
      <Section
        title={leaderboardData.type}
        timestamp={activeTimestamp}
        category={activeCategory}
        timestampList={LEADERBOARD_TIMEFRAMES}
        categoryList={categoryList}
        onSelectTimestamp={handleSelectTimestamp}
        onSelectCategory={handleSelectCategory}
      >
        {currentCohort.type === 'division' ? (
          <Scrollbar
            style={{
              height: 1040,
              width: '100%'
            }}
            noScrollX={true}
          >
            <LeaderboardItems
              leaderboardItems={leaderboardItems}
              leaderboardData={leaderboardData}
              currentCohort={currentCohort}
              activeIdx={activeIdx}
              handleClickDetail={handleClickDetail}
            />
          </Scrollbar>
        ) : (
          <LeaderboardItems
            leaderboardItems={leaderboardItems}
            leaderboardData={leaderboardData}
            currentCohort={currentCohort}
            activeIdx={activeIdx}
            handleClickDetail={handleClickDetail}
          />
        )}
