import { createContext, PropsWithChildren, useContext, useState } from 'react'

export enum ScreenMode {
  desktop,
  triple_monitor
}

export enum ScreenPanes {
  leads,
  sales,
  pacing
}

