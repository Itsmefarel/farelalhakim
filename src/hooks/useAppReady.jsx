import { createContext, useContext } from 'react'

/**
 * True once the preloader has finished.
 *
 * The hero's entrance sequence waits on this so the two animations run one
 * after the other rather than both playing behind the loading curtain.
 */
const AppReadyContext = createContext(true)

export const AppReadyProvider = AppReadyContext.Provider
export const useAppReady = () => useContext(AppReadyContext)
