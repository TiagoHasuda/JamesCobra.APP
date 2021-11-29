import { Dimensions } from "react-native"
import styled from "styled-components/native"
import { blockTypes, gridSide } from "."
import { Button } from "../../components/button"

const screenWidth = Dimensions.get('screen').width
const spacing = 2
const side = (screenWidth - (gridSide + 1) * spacing) / gridSide

export const Container = styled.View`
    flex: 1;
    background-color: ${props => props.theme.colors.white};
`

export const TopBar = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: ${props => props.theme.colors.primary};
`

export const ExitTextContainer = styled.TouchableOpacity`
    margin-vertical: 20px;
    margin-left: 20px;
`

export const ExitText = styled.Text`
    font-size: 20px;
    color: ${props => props.theme.colors.white};
`

export const PauseButtonContainer = styled.TouchableOpacity`
    margin-vertical: 20px;
    margin-right: 20px;
    border-radius: 20px;
`

export const PauseButton = styled.Text`
    font-size: 20px;
    color: ${props => props.theme.colors.white};
`

export const GameContainer = styled.View`
    justify-content: space-between;
    width: ${screenWidth}px;
    height: ${screenWidth}px;
    padding: ${spacing / 2}px;
    background-color: ${props => props.theme.colors.primaryLight};
`

export const BlockLine = styled.View`
    flex-direction: row;
    justify-content: space-between;
`

interface BlockProps {
    color: blockTypes
}

export const Block = styled.View<BlockProps>`
    width: ${side}px;
    height: ${side}px;
    background-color: ${props => {
        switch (props.color) {
            case 'background':
                return props.theme.colors.white
            case 'body':
                return props.theme.colors.secondaryLight
            case 'head':
                return props.theme.colors.secondary
            case 'food':
                return props.theme.colors.green
            default:
                return props.theme.colors.white
        }
    }};
`

export const UserContainer = styled.View`
    flex-direction: row;
`

export const UserNickname = styled.Text`
    flex: 1;
    text-align: center;
    padding-vertical: 10px;
    border: 1px solid ${props => props.theme.colors.darkGreen};
    color: ${props => props.theme.colors.black};
`

export const ReadyContainer = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    background-color: ${props => props.theme.colors.primary};
`

export const ReadyText = styled.Text`
    font-size: 25px;
    text-align: center;
    font-weight: bold;
    color: ${props => props.theme.colors.white};
`

export const ControlsContainer = styled.View`
    flex: 1;
    margin: 20px;
`

export const Line = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

export interface ButtonContainerProps {
    disabled?: boolean
    isMiddle?: boolean
}

export const ButtonContainer = styled.TouchableOpacity<ButtonContainerProps>`
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100px;
    border-radius: 10px;
    background-color: ${props => props.disabled ? props.theme.colors.gray : props.theme.colors.primary};
    ${props => props.isMiddle && `
        margin-horizontal: 50px;
    `}
`

export const ButtonText = styled.Text`
    font-size: 20px;
    text-align: center;
    font-weight: bold;
    color: ${props => props.theme.colors.white};
`

export const EndGameContainer = styled.View`

`

export const EndGamePoints = styled.Text`
    text-align: center;
    font-size: 30px;
    margin-vertical: 20px;
    line-height: 40px;
`

export const EndGameText = styled.Text`
    font-size: 30px;
    text-align: center;
`

export const PauseContainer = styled.View`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.colors.black}70;
`

export const PauseBox = styled.View`
    width: 80%;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: ${props => props.theme.colors.white};
`

export const PauseText = styled.Text`
    font-size: 25px;
    color: ${props => props.theme.colors.black};
`

export const ContinueGameButton = styled(Button)`
    width: 80%;
    margin-top: 20px;
`
