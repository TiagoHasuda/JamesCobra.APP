import React from "react"
import { Room as RoomModel } from "../../models/room.model"
import { Container, RoomId, RoomName, RoomPlayers } from "./styles"

interface RoomProps {
    room: RoomModel
    onPress: (roomId: number) => void
}

export const Room: React.FC<RoomProps> = ({
    room,
    onPress,
}) => {
    return <Container onPress={() => onPress(room.id)}>
        <RoomId>{room.id}</RoomId>
        <RoomName numberOfLines={1}>{room.name}</RoomName>
        <RoomPlayers>{!!room.userTwo ? '2 / 2' : '1 / 2'}</RoomPlayers>
    </Container>
}
