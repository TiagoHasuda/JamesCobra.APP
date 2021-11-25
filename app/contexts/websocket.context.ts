import { createContext } from "react"
import { Room, RoomType } from "../models/room.model"

interface WebsocketContextProps {
    changeCallback: (cb: (event: string, data: string) => void) => void
    getLoggedIn: () => boolean
    getRoom: () => Room | undefined
    getRooms: () => Room[]
    getRoomType: () => RoomType
    getRoomPlace: () => 'one' | 'two'
    sendEvent: (event: string, data: string) => void
}

export const WebsocketContext = createContext({} as WebsocketContextProps)
