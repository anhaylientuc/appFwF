// KeyboardContext.js
import React, { createContext, useEffect, useState } from 'react'
import { Keyboard } from 'react-native'

export const KeyboardContext = createContext()

export const KeyboardProvider = ({ children }) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false)

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true)
    })
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false)
    })

    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [])

  return <KeyboardContext.Provider value={isKeyboardVisible}>{children}</KeyboardContext.Provider>
}
