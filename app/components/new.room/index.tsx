import React, { useState } from 'react'
import { useModal } from '../../hooks/modal.hook'
import { useWebsocket } from '../../hooks/websocket.hook'
import { ConfirmButton, Container, NameInput } from './styles'

export const NewRoom: React.FC = () => {
    const websocket = useWebsocket()
    const [newRoomName, setNewRoomName] = useState('')
    const modal = useModal()

    const onNewRoomConfirmPress = () => {
        if (!newRoomName) return
        const req = {
            name: newRoomName,
            type: websocket.getRoomType(),
        }
        websocket.sendEvent('newRoom', JSON.stringify(req))
        modal.close()
    }

    return <Container>
        <NameInput
            label='Nome da sala'
            value={newRoomName}
            onValueChanged={setNewRoomName}
        />
        <ConfirmButton onPress={onNewRoomConfirmPress}>
            Criar
        </ConfirmButton>
    </Container>
}
