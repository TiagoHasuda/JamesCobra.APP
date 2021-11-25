import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useMemo, useState } from 'react'
import { Keyboard } from 'react-native'
import { Shadow } from '../../components/shadow'
import { useWebsocket } from '../../hooks/websocket.hook'
import { Container, EnterButton, Filler, Inner, NicknameInput, Title } from './styles'

export const Login: React.FC = () => {
    const websocket = useWebsocket()
    const [nickname, setNickname] = useState('')
    const [loading, setLoading] = useState<boolean>(false)
    const loggedIn = useMemo(() => websocket.getLoggedIn(), [websocket])
    const navigation = useNavigation()

    useEffect(() => {
        if (loggedIn)
            navigation.navigate('chooseGameType')
    }, [loggedIn])

    const loginCallback = (event: string, data: string) => {
        if (event === 'newLogin')
            setLoading(false)
    }

    useEffect(() => {
        websocket.changeCallback(() => loginCallback)
    }, [])

    const onEnterPress = () => {
        if (!nickname) return
        websocket.sendEvent('newLogin', nickname)
        setLoading(true)
    }

    const greeting = useMemo(() => {
        const now = new Date().getHours()
        if (now > 6 && now < 12) return 'Bom dia'
        else if (now >= 12 && now < 18) return 'Boa tarde'
        else if (now >= 18 && now < 24) return 'Boa noite'
        else return 'Boa madrugada'
    }, [])

    return <Container onPress={() => Keyboard.dismiss()}>
        <Inner>
            <Filler>
                <Title>{greeting}!</Title>
            </Filler>
            <Shadow
                position='toptobottom'
                size={1}
            />
            <NicknameInput
                value={nickname}
                onValueChanged={setNickname}
                label='Nickname'
            />
            <EnterButton onPress={onEnterPress} loading={loading}>
                Entrar
            </EnterButton>
            <Shadow
                position='bottomtotop'
                size={1}
            />
            <Filler />
        </Inner>
    </Container>
}
