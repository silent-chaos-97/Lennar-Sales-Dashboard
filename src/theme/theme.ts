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
    h5: {
      fontSize: 24,
      lineHeight: 1.4
    },
    h6: {
      fontSize: 20,
      lineHeight: 1.4,
      fontWeight: 800
    },
    subtitle1: {
      fontSize: 22,
      lineHeight: '24px'
    },
    body1: {
      fontSize: 18,
      lineHeight: 1.5
    },
    caption: {
      fontSize: 16,
      lineHeight: '20px'
    },
    button: {
      textTransform: 'none'
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      @font-face {
        font-family: 'mabry-pro';
        src: url(${MabryLight_WOFF});
        src: url(${MabryLight_WOFF2}) format('woff2'),
             url(${MabryLight_WOFF}) format('woff');
        font-weight: 300;
      }
      @font-face {
        font-family: 'mabry-pro';
        src: url(${MabryRegular_WOFF});
        src: url(${MabryRegular_WOFF2}) format('woff2'),
             url(${MabryRegular_WOFF}) format('woff');
        font-weight: 400;
      }
      @font-face {
        font-family: 'mabry-pro';
        src: url(${MabryMedium_WOFF});
        src: url(${MabryMedium_WOFF2}) format('woff2'),
             url(${MabryMedium_WOFF}) format('woff');
        font-weight: 500;
      }
      @font-face {
        font-family: 'mabry-pro';
        src: url(${MabryBold_OTF}) format('opentype');
        font-weight: 700;
      }
      @font-face {
        font-family: 'reckless';
        src: url(${RecklessLight_WOFF});
        src: url(${RecklessLight_WOFF2}) format('woff2'),
             url(${RecklessLight_WOFF}) format('woff');
        font-weight: 300;
      }
      @font-face {
        font-family: 'reckless';
        src: url(${RecklessRegular_WOFF});
        src: url(${RecklessRegular_WOFF2}) format('woff2'),
             url(${RecklessRegular_WOFF}) format('woff');
        font-weight: 400;
      }
      @font-face {
        font-family: 'reckless';
        src: url(${RecklessMedium_WOFF});
        src: url(${RecklessMedium_WOFF2}) format('woff2'),
             url(${RecklessMedium_WOFF}) format('woff');
        font-weight: 500;
      }

      html, body {
        font-feature-settings: 'salt' on;
        color: #ffffff;
        -webkit-font-smoothing: antialiased;
        -webkit-filter: blur(0px);
        -webkit-perspective: 1000;
        filter: blur(0px);
        backface-visibility: hidden;
        height: 100%;
        min-height: 100%;
        overflow: hidden;
      }

      #root {
        &:fullscreen, &::backdrop {
          background-color: #212936;
        }
      }

      .ScrollbarsCustom-Scroller::-webkit-scrollbar {
        display: none;
      }

      .tooltip {
        position: absolute;
        // background-color: #263041;
        color: #A5CFEF;
        padding: 6px;
        border-radius: 4px;
        white-space: pre-line;
        font-size: 16px;
        font-weight: 700;
        font-family: mabry-pro;
        background-color: #191d26d9;
        box-shadow: 2px 4px 8px 0 rgba(0,0,0,0.25);
        line-height: 1.3;
        &:after {
          content: "";
          position: absolute;
          top: 50%;
          left: 100%;
          transform: translateY(-50%);
          border-width: 20px;
          border-style: solid;
          border-color: transparent transparent transparent #191d26d9;
          filter: drop-shadow(2px 0px 0px #191d26d9);
        }
      }

      .MuiButtonBase-root.MuiButton-root.Mui-disabled {
        background: #E8E8ED;
        border-color: #E8E8ED;
      }

      .pulsatingDot {
        background-color: rgba(28,209,161,0.85);
        border-radius: 50%;
        box-sizing: border-box;
        height: 32px;
        width: 32px;
        opacity: 0.85;
        &.running {
          background-color: #1ABB96;
          box-shadow: 0 4px 12px 0 rgba(0,0,0,0.5);
          border: 4px solid #FFFFFF;
          opacity: 1;
          padding: 4px;
        }
      }

      .dot {
        position: absolute;
        width: 10px;
        height: 10px;
        background-color: black;
        border-radius: 50%;
        z-index: 2;
      }
