import styled from 'styled-components/native'
import { Button } from '../../components/button'
import { Input } from '../../components/input'

export const Container = styled.TouchableWithoutFeedback`
    flex: 1;
`

export const Inner = styled.View`
    flex: 1;
    justify-content: center;
    background-color: ${props => props.theme.colors.white};
`

export const Title = styled.Text`
    font-size: 50px;
    font-weight: bold;
    text-align: center;
    margin: auto;
    color: white;
`

interface FillerProps {
    color?: string
}

export const Filler = styled.View<FillerProps>`
    flex: 1;
    background-color: ${props => !!props.color ? props.color : props.theme.colors.green};
`

export const NicknameInput = styled(Input)`
    margin-top: 30px;
    margin-bottom: 20px;
`

export const EnterButton = styled(Button)`
    margin-bottom: 30px;
`
