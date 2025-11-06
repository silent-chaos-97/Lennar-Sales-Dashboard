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

  const handleClickCategoryItem = (category: string) => {
    setShowCategoryDropdown(false)
    if (typeof onSelectCategory === 'function') onSelectCategory(category)
  }

  const alignmentStyle = useMemo(() => {
    if (dropdownAlignment === 'left') {
      return { left: 0 }
    }

    if (dropdownAlignment === 'center') {
      return { left: '50%', transform: 'translateX(-50%)' }
    }

    return { right: 0 }
  }, [dropdownAlignment])

  return (
    <Box>
      <Stack
        direction="row"
        alignItems={categoryList ? 'flex-end' : 'baseline'}
        justifyContent="space-between"
      >
        <Stack alignItems="flex-start">
          <Typography variant="h3" fontWeight={500}>
            {title}
          </Typography>
          {category && categoryList && (
            <Box position="relative">
              <Stack
                direction="row"
                alignItems="center"
                onClick={() => setShowCategoryDropdown(true)}
                sx={{
                  cursor: categoryList ? 'pointer' : 'default',
                  pointerEvents: categoryList ? 'auto' : 'none'
                }}
              >
                <Typography variant="caption" color="textSecondary" lineHeight="28px">
                  {categoryList[category]}
                </Typography>
                <ArrowDropDownIcon htmlColor="#dde3f6" />
              </Stack>
              {showCategoryDropdown && (
                <ClickAwayListener onClickAway={() => setShowCategoryDropdown(false)}>
                  <Box
                    sx={{
                      position: 'absolute',
                      px: 2,
                      pt: 2,
                      left: 0,
                      zIndex: 100,
                      borderRadius: '8px',
                      backgroundColor: '#212936',
                      boxShadow: '0 8px 16px 0 rgba(0,0,0,0.80)',
                      cursor: 'pointer',
                      color: '#ddd'
                    }}
                  >
                    {Object.entries(categoryList).map(([key, name]) => (
                      <Typography
                        key={key}
                        variant="h6"
                        fontWeight={400}
                        sx={{ mb: 1.5, whiteSpace: 'nowrap', '&:hover': { color: '#fff' } }}
                        onClick={() => handleClickCategoryItem(key)}
                      >
                        {name}
                      </Typography>
                    ))}
                  </Box>
                </ClickAwayListener>
              )}
            </Box>
          )}
        </Stack>
        <Stack direction="row" spacing={4} alignItems="center">
          <Box position="relative">
            <Stack
              direction="row"
              alignItems="center"
              onClick={() => setShowTimestampDropdown(true)}
              sx={{
                cursor: timestampList ? 'pointer' : 'default',
