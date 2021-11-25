import styled from "styled-components/native"
import { Button } from "../../components/button"

export const Container = styled.View`
    flex: 1;
`

export const TopBar = styled.View`
    flex-direction: row;
    background-color: ${props => props.theme.colors.green};
`

export const ExitTextContainer = styled.TouchableOpacity`
    margin-vertical: 20px;
    margin-left: 20px;
`

export const ExitText = styled.Text`
    font-size: 20px;
    color: ${props => props.theme.colors.white};
`

export const Separator = styled.View`
    height: 2px;
    width: 100%;
    background-color: ${props => props.theme.colors.darkGreen};
`

export const OptionButton = styled(Button)`
    flex: 1;
`
