import { useIsFocused, useNavigation } from "@react-navigation/core"
import React, { useEffect, useMemo, useState } from "react"
import { useModal } from "../../hooks/modal.hook"
import { useWebsocket } from "../../hooks/websocket.hook"
import { Direction } from "../../models/cobra.model"
import { Block, BlockLine, ButtonContainer, ButtonText, Container, ContinueGameButton, ControlsContainer, EndGameContainer, EndGamePoints, EndGameText, ExitText, ExitTextContainer, GameContainer, Line, PauseBox, PauseButton, PauseButtonContainer, PauseContainer, PauseText, ReadyContainer, ReadyText, TopBar, UserContainer, UserNickname } from "./styles"

export const gridSide = 15
export type blockTypes = 'background' | 'head' | 'body' | 'food'

export const Game: React.FC = () => {
    const websocket = useWebsocket()
    const room = useMemo(() => websocket.getRoom(), [websocket])
    const roomPlace = useMemo(() => websocket.getRoomPlace(), [websocket])
    const [grid, setGrid] = useState<blockTypes[][]>([])
    const navigation = useNavigation()
    const modal = useModal()
    const isFocused = useIsFocused()

    useEffect(() => {
        if (!room) return
        const newGrid: blockTypes[][] = []
        if (room.cobra.head.x < 0
            || room.cobra.head.x > gridSide - 1
            || room.cobra.head.y < 0
            || room.cobra.head.y > gridSide - 1)
            return
        for (let i = 0; i < gridSide; i++) {
            newGrid[i] = []
            for (let j = 0; j < gridSide; j++)
                newGrid[i][j] = 'background'
        }
        newGrid[room.food.x][room.food.y] = 'food'
        newGrid[room.cobra.head.x][room.cobra.head.y] = 'head'
        room.cobra.body.forEach(coord => {
            newGrid[coord.x][coord.y] = 'body'
        })
        setGrid(newGrid)
    }, [room?.food, room?.cobra])

    const getUsersReady = (): number => {
        let ready = 0
        if (room?.userOne.ready) ready++
        if (room?.userTwo?.ready) ready++
        return ready
    }

    const onExitRoom = () => {
        if (!!room)
            websocket.sendEvent('leaveRoom', room.id.toString())
        navigation.goBack()
    }

    const onCallbackEvent = (event: string, data: string) => {
        if (event === 'winGame' || event === 'loseGame')
            modal.show({
                content: <EndGameContainer>
                    {event === 'winGame' ?
                        <EndGameText>Voce ganhou!</EndGameText> :
                        <EndGameText>Voce perdeu :c</EndGameText>
                    }
                    <EndGamePoints>Seu score:{'\n'}{room?.points.toString()} pontos</EndGamePoints>
                </EndGameContainer>
            })
    }

    useEffect(() => {
        if (isFocused)
            websocket.changeCallback(() => onCallbackEvent)
    }, [isFocused])

    const onSetReady = () => {
        websocket.sendEvent('setReady', '')
    }

    const onMoveCobra = (direction: Direction) => {
        websocket.sendEvent('moveCobra', direction)
    }

    const onPauseGame = () => {
        websocket.sendEvent('pauseGame', '')
    }

    const onContinueGame = () => {
        websocket.sendEvent('unpauseGame', '')
    }

    return <Container>
        <TopBar>
            <ExitTextContainer onPress={onExitRoom}>
                <ExitText>Sair da sala</ExitText>
            </ExitTextContainer>
            <PauseButtonContainer onPress={onPauseGame}>
                <PauseButton>Pausar o jogo</PauseButton>
            </PauseButtonContainer>
        </TopBar>
        <GameContainer>
            {grid.map((line, lineIndex) =>
                <BlockLine key={lineIndex}>
                    {line.map((coordinate, index) => <Block key={index} color={coordinate} />)}
                </BlockLine>
            )}
        </GameContainer>
        <UserContainer>
            <UserNickname>{room?.userOne.nickname}</UserNickname>
            <UserNickname>{room?.userTwo?.nickname}</UserNickname>
        </UserContainer>
        {!room?.started ? <ReadyContainer onPress={onSetReady}>
            <ReadyText>
                Pronto ({getUsersReady()}/2)
            </ReadyText>
        </ReadyContainer> : <ControlsContainer>
            <Line>
                <ButtonContainer onPress={() => onMoveCobra('up')} disabled={(room.type === 'separate' && room.turn !== roomPlace) || (room.type === 'split' && roomPlace === 'two')}>
                    <ButtonText>/\</ButtonText>
                </ButtonContainer>
            </Line>
            <Line>
                <ButtonContainer isMiddle onPress={() => onMoveCobra('left')} disabled={(room.type === 'separate' && room.turn !== roomPlace) || (room.type === 'split' && roomPlace === 'one')}>
                    <ButtonText>{'<'}</ButtonText>
                </ButtonContainer>
                <ButtonContainer isMiddle onPress={() => onMoveCobra('right')} disabled={(room.type === 'separate' && room.turn !== roomPlace) || (room.type === 'split' && roomPlace === 'one')}>
                    <ButtonText>{'>'}</ButtonText>
                </ButtonContainer>
            </Line>
            <Line>
                <ButtonContainer onPress={() => onMoveCobra('down')} disabled={(room.type === 'separate' && room.turn !== roomPlace) || (room.type === 'split' && roomPlace === 'two')}>
                    <ButtonText>\/</ButtonText>
                </ButtonContainer>
            </Line>
        </ControlsContainer>}
        {(room?.paused && room.started) && <PauseContainer>
            <PauseBox>
                <PauseText>O jogo está pausado{!room.userTwo && `\nEsperando jogador...`}</PauseText>
                <ContinueGameButton onPress={onContinueGame}>Continuar</ContinueGameButton>
            </PauseBox>
        </PauseContainer>}
    </Container>
}
