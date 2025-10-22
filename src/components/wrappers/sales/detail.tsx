import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Timeline from '@/components/Timeline'
import AssociateMemberCard from './accociate-member-card'
import PhotoHouseImg from '@/assets/images/photo-house.png'
import { RefObject, useRef } from 'react'
import { useClickAway } from 'react-use'
import IconButton from '@mui/material/IconButton'
import { SalesItem } from '@/types/sales'
import CloseIcon from '@mui/icons-material/Close'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Scrollbar } from 'react-scrollbars-custom'
import { truncateText } from '@/utils/helper'

interface SalesDetailsProps {
  svgSize: {
    width: number
    height: number
    x: number
    y: number
  }
  onClose: () => void
  salesDetail: SalesItem
  mapWrapperRef: RefObject<HTMLDivElement>
  onPrev: () => void
  onNext: () => void
  scrollProgress: [boolean, boolean]
}

const SalesDetails = ({
  svgSize,
  onClose,
  salesDetail,
  mapWrapperRef,
  onPrev,
  onNext,
  scrollProgress
}: SalesDetailsProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  useClickAway(wrapperRef, (event) => {
    if (mapWrapperRef.current && mapWrapperRef.current.contains(event.target as Node)) {
      onClose()
    }
  })

  return (
    <>
      {svgSize.width > 0 && (
        <svg
          id="triangleSvg"
          width={svgSize.width}
          height={svgSize.height}
          style={{
            position: 'absolute',
            top: svgSize.y,
            right: svgSize.x,
            zIndex: 0,
            filter: 'drop-shadow(0 0 16px rgba(0,0,0,0.5))'
          }}
        ></svg>
      )}
      <Box
        sx={{
          position: 'absolute',
          top: 24,
          width: 860,
          right: 12,
          height: 1180,
          zIndex: 2,
          px: 2.5,
          py: 2,
          borderRadius: '8px',
          backgroundColor: 'rgba(38,54,81,0.85)',
          boxShadow: '16px 8px 16px 0 rgba(0,0,0,0.5)'
        }}
        ref={wrapperRef}
      >
        <Stack direction="row" sx={{ mb: 3 }} alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h3" mb={2.5}>
              {truncateText(salesDetail.sale_title, 44)}
            </Typography>
          </Stack>
          <Stack direction="row">
            <IconButton onClick={onPrev}>
              <ChevronLeftIcon htmlColor="#dde3f6" opacity={scrollProgress[0] ? 0.25 : 1} />
            </IconButton>
            <IconButton onClick={onNext}>
              <ChevronRightIcon htmlColor="#dde3f6" opacity={scrollProgress[1] ? 0.25 : 1} />
            </IconButton>
            <IconButton onClick={onClose} size={'large'}>
              <CloseIcon htmlColor="#fff" />
            </IconButton>
          </Stack>
        </Stack>
        <Grid container spacing={5}>
          <Grid item lg={6}>
            <Box
              borderRadius={1}
              sx={{
                boxShadow: '6px 2px 4px 0 rgba(0,0,0,0.25)',
                height: '218px',
                overflow: 'hidden',
                mb: 5
              }}
            >
              <img
                src={salesDetail.homesite_image_url || PhotoHouseImg}
                alt={salesDetail.sale_title}
                width="100%"
                height="218px"
