import { createContext, PropsWithChildren, useContext, useState } from 'react'

export enum ScreenMode {
  panorama,
  desktop,
}

export enum ScreenPanes {
  leads,
  sales,
  pacing
