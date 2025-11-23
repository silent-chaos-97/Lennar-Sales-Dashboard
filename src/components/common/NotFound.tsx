import { Box, Link, Stack, Typography } from '@mui/material'
import WarningRoundIcon from '@mui/icons-material/WarningRounded'
import { LENNAR_LIVE_URL } from '@/utils/constant'

const NotFound = () => {
  return (
    <Box display="flex" justifyContent="center">
      <Stack alignItems="center" sx={{ marginTop: '10px', width: '100%' }}>
        <Stack
          alignItems="center"
          sx={{
            boxShadow: '0px 12px 10px rgba(0, 0, 0, 0.25)',
            height: '76px',
            padding: '25px',
            marginTop: 0
          }}
          width="100%"
        >
          <img src="/logo.svg" alt="Lennar" width="144" />
        </Stack>
        <WarningRoundIcon sx={{ fontSize: '60px', marginTop: '144px', marginBottom: '50px' }} />
        <Typography sx={{ fontSize: '32px', lineHeight: '38px' }}>
          Hmm, no one seems to be home at the moment.
        </Typography>
        <Typography sx={{ fontSize: '32px', lineHeight: '38px', marginTop: '50px' }}>
          Please try this address:
        </Typography>
        <Typography sx={{ fontSize: '32px', lineHeight: '38px' }}>
          <Link href={LENNAR_LIVE_URL}>{LENNAR_LIVE_URL}</Link>
        </Typography>
      </Stack>
