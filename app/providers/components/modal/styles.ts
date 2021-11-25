import { Animated } from "react-native"
import styled from "styled-components/native"

interface ContainerProps {
    show: boolean
}

export const Container = styled(Animated.View) <ContainerProps>`
    width: ${props => props.show ? '100%' : '0px'};
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
`

export const BackgroundTouchable = styled.TouchableWithoutFeedback``

export const BackgroundTouchableInner = styled.View`
    flex: 1;
`

export const ContentContainer = styled(Animated.View)`
    margin-top: auto;
    padding-top: 20px;
    border-top-width: 2px;
    border-top-color: ${props => props.theme.colors.darkGreen};
    background-color: ${props => props.theme.colors.white};
`
