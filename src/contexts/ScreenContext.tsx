import { createContext, PropsWithChildren, useContext, useState } from 'react'

export enum ScreenMode {
  panorama,
  desktop,
  triple_monitor
}
export enum ScreenPanes {
  leads,
  sales,
  pacing
}

interface ScreenContextValues {
  mode: ScreenMode
  currentScreen: number
  setScreenMode: (mode: ScreenMode) => void
  setCurrentScreen: (current: number) => void
  showTooltips: boolean
  setShowTooltips: React.Dispatch<React.SetStateAction<boolean>>
}
