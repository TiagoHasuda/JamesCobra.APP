import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useMemo, useState } from 'react'
import { useWebsocket } from '../../hooks/websocket.hook'
import { Container, ExitText, ExitTextContainer, OptionButton, Separator, TopBar } from './styles'

export const ChooseGameType: React.FC = () => {
    const websocket = useWebsocket()
    const [first, setFirst] = useState<boolean>(true)
    const rooms = useMemo(() => websocket.getRooms(), [websocket])
    const navigation = useNavigation()

    useEffect(() => {
        if (first) {
            setFirst(false)
            return
        }
        navigation.navigate('rooms')
    }, [rooms])

    const onOptionPress = (option: 'Separate' | 'Split') => {
        websocket.sendEvent(`get${option}Rooms`, '')
    }

    const onExit = () => {
        websocket.sendEvent('removeLogin', '')
        navigation.goBack()
    }

    return <Container>
        <TopBar>
            <ExitTextContainer onPress={onExit}>
                <ExitText>Sair</ExitText>
            </ExitTextContainer>
        </TopBar>
        <OptionButton onPress={() => onOptionPress('Split')}>
            Comandos divididos
        </OptionButton>
        <Separator />
        <OptionButton onPress={() => onOptionPress('Separate')}>
            Um de cada vez
        </OptionButton>
    </Container>
}
