import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { ChooseGameType } from '../screens/choose.game.type'
import { Game } from '../screens/game'
import { Login } from '../screens/login'
import { Rooms } from '../screens/rooms'

const Stack = createNativeStackNavigator()

export const Navigation: React.FC = () => {
    return <Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}
        initialRouteName='login'
    >
        <Stack.Screen name='login' component={Login} />
        <Stack.Screen name='chooseGameType' component={ChooseGameType} />
        <Stack.Screen name='rooms' component={Rooms} />
        <Stack.Screen name='game' component={Game} />
    </Stack.Navigator>
}
