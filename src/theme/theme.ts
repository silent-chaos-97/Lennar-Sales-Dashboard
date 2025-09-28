import { createTheme } from '@mui/material/styles'
import LinkBehavior from './MuiLink'

import MabryLight_WOFF from '@/assets/fonts/mabry/light/mabry-light-pro.woff'
import MabryLight_WOFF2 from '@/assets/fonts/mabry/light/mabry-light-pro.woff2'
import MabryRegular_WOFF from '@/assets/fonts/mabry/regular/mabry-regular-pro.woff'
import MabryRegular_WOFF2 from '@/assets/fonts/mabry/regular/mabry-regular-pro.woff2'
import MabryMedium_WOFF from '@/assets/fonts/mabry/medium/mabry-medium-pro.woff'
import MabryMedium_WOFF2 from '@/assets/fonts/mabry/medium/mabry-medium-pro.woff2'
import MabryBold_OTF from '@/assets/fonts/mabry/bold/mabry-bold-pro.otf'
import RecklessLight_WOFF from '@/assets/fonts/reckless/reckless-light.woff'
import RecklessLight_WOFF2 from '@/assets/fonts/reckless/reckless-light.woff2'
import RecklessRegular_WOFF from '@/assets/fonts/reckless/reckless-regular.woff'
import RecklessRegular_WOFF2 from '@/assets/fonts/reckless/reckless-regular.woff2'
import RecklessMedium_WOFF from '@/assets/fonts/reckless/reckless-medium.woff'
import RecklessMedium_WOFF2 from '@/assets/fonts/reckless/reckless-medium.woff2'

declare module '@mui/material/styles' {
  interface TypographyVariants {
    title: React.CSSProperties
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    title?: React.CSSProperties
  }

  interface TypeBackground {
    secondary: string
    tertiary: string
  }

  interface TypeText {
    tertiary: string
    quaternary: string
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    title: true
  }
}

export const theme = createTheme({
  typography: {
    fontFamily: 'mabry-pro',
    title: {
      fontSize: 42,
      lineHeight: '50px',
      fontWeight: 400
    },
    h1: {
      fontSize: 56,
      lineHeight: '68px',
      fontWeight: 700,
      letterSpacing: '-0.66px'
    },
    h2: {
      fontSize: 42,
      lineHeight: '50px',
      letterSpacing: '-0.66px',
      fontWeight: 700
    },
    h3: {
      fontSize: 32,
      lineHeight: '38px'
    },
    h4: {
      fontSize: 28,
      lineHeight: '34px',
      fontWeight: 800
    },
