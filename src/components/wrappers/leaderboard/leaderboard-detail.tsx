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
