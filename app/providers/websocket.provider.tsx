import React, { useEffect, useState } from 'react'
import { WebsocketContext } from '../contexts/websocket.context'
import io, { Socket } from 'socket.io-client'
import { Room, RoomType } from '../models/room.model'
import { useNavigation } from '@react-navigation/core'

const connectionTimeout = 10000

export const WebsocketProvider: React.FC = ({ children }) => {
    const [socket, setSocket] = useState<Socket>()
    const [socketTime, setSocketTime] = useState<number>(0)
    const [callback, setCallback] = useState<(event: string, data: string) => void>()
    const [loggedIn, setLoggedIn] = useState<boolean>(false)
    const [rooms, setRooms] = useState<Room[]>([])
    const [roomType, setRoomType] = useState<RoomType>('separate')
    const [room, setRoom] = useState<Room>()
    const [roomPlace, setRoomPlace] = useState<'one' | 'two'>('one')
    const navigation = useNavigation()

    useEffect(() => {
        let currSocket = (!!socket && (socket.connected || new Date().getTime() - socketTime < connectionTimeout)) ? socket : io(
            'http://snake.api.jameswebserver.com',
            {
                reconnection: true,
            }
        )

        if (!socket || (!socket.connected && new Date().getTime() - socketTime >= connectionTimeout)) {
            setSocketTime(new Date().getTime())
            setSocket(currSocket)
        } else
            socket.removeAllListeners()

        currSocket.on('connect', () => {
            console.log('Connected')
            navigation.navigate('login')
        })

        currSocket.on('newLogin', (data) => {
            if (data === 'true')
                setLoggedIn(true)
            if (!!callback)
                callback('newLogin', data)
        })

        currSocket.on('getSeparateRooms', (data) => {
            const rooms = JSON.parse(data)
            setRoomType('separate')
            setRooms(rooms)
        })

        currSocket.on('getSplitRooms', (data) => {
            const rooms = JSON.parse(data)
            setRoomType('split')
            setRooms(rooms)
        })

        currSocket.on('joinRoom', (data) => {
            const room: Room = JSON.parse(data)
            setRoom(room)
            if (!room.userTwo)
                setRoomPlace('one')
            else
                setRoomPlace('two')

            if (!!callback)
                callback('joinRoom', data)
        })

        currSocket.on('gameUpdate', (data) => {
            const room: Room = JSON.parse(data)
            setRoom(room)
            if (!room.userTwo)
                setRoomPlace('one')
        })

        currSocket.on('winGame', (data) => {
            const room: Room = JSON.parse(data)
            setRoom(room)
            if (!!callback)
                callback('winGame', data)
        })

        currSocket.on('loseGame', (data) => {
            const room: Room = JSON.parse(data)
            setRoom(room)
            if (!!callback)
                callback('loseGame', data)
        })

    }, [callback])

    const sendEvent = (event: string, data: string) => {
        if (!socket || !socket.connected) return
        socket.emit(event, data)
        if (event === 'removeLogin')
            setLoggedIn(false)
    }

    const changeCallback = (cb: (event: string, data: string) => void) => {
        setCallback(cb)
    }

    const getLoggedIn = (): boolean => {
        return loggedIn
    }

    const getRooms = (): Room[] => {
        return rooms
    }

    const getRoomType = (): RoomType => {
        return roomType
    }

    const getRoom = (): Room | undefined => {
        return room
    }

    const getRoomPlace = (): 'one' | 'two' => {
        return roomPlace
    }

    return <WebsocketContext.Provider value={{
        changeCallback,
        getLoggedIn,
        getRoom,
        getRooms,
        getRoomType,
        getRoomPlace,
        sendEvent,
    }}>
        {children}
    </WebsocketContext.Provider>
}
