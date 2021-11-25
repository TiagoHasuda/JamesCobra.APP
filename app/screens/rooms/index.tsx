import { useIsFocused, useNavigation } from '@react-navigation/core'
import React, { useEffect, useMemo } from 'react'
import { NewRoom } from '../../components/new.room'
import { Room } from '../../components/room'
import { useModal } from '../../hooks/modal.hook'
import { useWebsocket } from '../../hooks/websocket.hook'
import { BackText, BackTextContainer, Container, NewRoomContainer, NewRoomText, NoRoomsText, RoomsList, RoomsListInnerContainer, TopBar } from './styles'

export const Rooms: React.FC = () => {
    const websocket = useWebsocket()
    const rooms = useMemo(() => websocket.getRooms(), [websocket])
    const navigation = useNavigation()
    const modal = useModal()
    const isFocused = useIsFocused()

    const onJoinRoom = (event: string, data: string) => {
        if (event === 'joinRoom')
            navigation.navigate('game')
    }

    useEffect(() => {
        if (isFocused)
            websocket.changeCallback(() => onJoinRoom)
    }, [isFocused])

    const onBackPress = () => {
        navigation.goBack()
    }

    const onNewRoomPress = () => {
        modal.show({
            content: <NewRoom />
        })
    }

    const onRoomPress = (roomId: number) => {
        websocket.sendEvent('joinRoom', roomId.toString())
    }

    return <Container>
        <TopBar>
            <BackTextContainer onPress={onBackPress}>
                <BackText>Voltar</BackText>
            </BackTextContainer>
        </TopBar>
        <RoomsList>
            <RoomsListInnerContainer>
                {rooms.length === 0 ?
                    <NoRoomsText>Nenhuma sala encontrada</NoRoomsText> :
                    rooms.map((room, index) => <Room key={index} room={room} onPress={onRoomPress} />)
                }
            </RoomsListInnerContainer>
        </RoomsList>
        <NewRoomContainer onPress={onNewRoomPress}>
            <NewRoomText>+</NewRoomText>
        </NewRoomContainer>
    </Container>
}
