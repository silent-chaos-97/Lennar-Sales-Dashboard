import { PropsWithChildren, useMemo, useState } from 'react'
import ClickAwayListener from '@mui/base/ClickAwayListener'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

interface SectionProps {
  title: string
  timestamp?: string
  category?: string
  more?: React.ReactNode
  timestampList?: Record<string, string>
  categoryList?: Record<string, string>
  onSelectTimestamp?: (timestamp: string) => void
  onSelectCategory?: (category: string) => void
  dropdownAlignment?: 'left' | 'right' | 'center'
}
