import { LeaderboardMemberDetail } from '@/types/leaderboards'
import ISCDetail from './isc-detail'
import NHSDetail from './nhs-detail'

  open: boolean
  name: string
  imageUrl: string
  cohortRank: number
  nationalRank: number
  data?: LeaderboardMemberDetail
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  disablePrevNext: [boolean, boolean]
  type?: string
  activeTimestamp?: string
}

const LeaderboardDetail = ({
  open,
  name,
  onPrev,
  onNext,
  onClose,
  data,
  imageUrl,
  cohortRank,
  nationalRank,
  disablePrevNext,
  type,
  activeTimestamp
}: LeaderboardDetailProps) => {
  const isISC = type === 'isc-leaderboard'

