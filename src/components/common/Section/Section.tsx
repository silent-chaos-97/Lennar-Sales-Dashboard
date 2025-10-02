import { PropsWithChildren, useMemo, useState } from 'react'
import ClickAwayListener from '@mui/base/ClickAwayListener'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

interface SectionProps {
  title: string
  timestamp?: string
  more?: React.ReactNode
  timestampList?: Record<string, string>
  categoryList?: Record<string, string>
  onSelectTimestamp?: (timestamp: string) => void
  onSelectCategory?: (category: string) => void
  dropdownAlignment?: 'left' | 'right' | 'center'
}

export const Section = ({
  title,
  timestamp,
  category,
  more,
  timestampList,
  categoryList,
  onSelectTimestamp,
  onSelectCategory,
  dropdownAlignment = 'right',
  children
}: PropsWithChildren<SectionProps>) => {
  const subtitle = timestamp || 'Today'
  const [showTimestampDropdown, setShowTimestampDropdown] = useState(false)
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const handleClickTimestampItem = (timestamp: string) => {
    setShowTimestampDropdown(false)
    if (typeof onSelectTimestamp === 'function') onSelectTimestamp(timestamp)
  }

