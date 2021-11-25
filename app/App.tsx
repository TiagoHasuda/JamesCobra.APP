import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Navigation } from './navigation'
import { WebsocketProvider } from './providers/websocket.provider'
import { ThemeProvider } from './providers/theme.provider'
import { ModalProvider } from './providers/modal.provider'
import { BackHandler } from 'react-native'

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      login: undefined
      chooseGameType: undefined
      rooms: undefined
      game: undefined
    }
  }
}

const App = () => {
  const handleHardwareBackPress = () => {
    return true
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleHardwareBackPress)

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleHardwareBackPress)
    }
  }, [])

  return <ThemeProvider>
    <NavigationContainer>
      <WebsocketProvider>
        <ModalProvider>
          <Navigation />
        </ModalProvider>
      </WebsocketProvider>
    </NavigationContainer>
  </ThemeProvider>
}

export default App
