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
