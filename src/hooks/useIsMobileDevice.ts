import { useEffect, useState } from 'react'

function getIsMobileDevice() {
  if (typeof window === 'undefined') {
    return false
  }

  const coarsePointerQuery = window.matchMedia('(pointer: coarse)')
  const mobileWidthQuery = window.matchMedia('(max-width: 900px)')

  return coarsePointerQuery.matches || (mobileWidthQuery.matches && navigator.maxTouchPoints > 0)
}

export function useIsMobileDevice() {
  const [isMobileDevice, setIsMobileDevice] = useState(getIsMobileDevice)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const coarsePointerQuery = window.matchMedia('(pointer: coarse)')
    const mobileWidthQuery = window.matchMedia('(max-width: 900px)')
    const updateDeviceState = () => setIsMobileDevice(getIsMobileDevice())

    updateDeviceState()
    coarsePointerQuery.addEventListener('change', updateDeviceState)
    mobileWidthQuery.addEventListener('change', updateDeviceState)
    window.addEventListener('resize', updateDeviceState)

    return () => {
      coarsePointerQuery.removeEventListener('change', updateDeviceState)
      mobileWidthQuery.removeEventListener('change', updateDeviceState)
      window.removeEventListener('resize', updateDeviceState)
    }
  }, [])

  return isMobileDevice
}
