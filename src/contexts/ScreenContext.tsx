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
  setShowTooltips: React.Dispatch<React.SetStateAction<boolean>>
}

const ScreenContext = createContext<ScreenContextValues>({
  mode: ScreenMode.triple_monitor,
  currentScreen: 0,
  setScreenMode: () => null,
  setCurrentScreen: () => null,
  showTooltips: true,
  setShowTooltips: () => null
})

export const ScreenContextProvider = (props: PropsWithChildren) => {
  const [screenMode, setScreenMode] = useState(ScreenMode.desktop)
  const [currentScreen, setCurrentScreen] = useState(0)
  const [showTooltips, setShowTooltips] = useState<boolean>(true)

  return (
    <ScreenContext.Provider
      value={{
        mode: screenMode,
        currentScreen,
