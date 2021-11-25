import LinearGradient from "react-native-linear-gradient"
import styled from "styled-components/native"

interface ContainerProps {
    size: number
    direction: 'vertical' | 'horizontal'
}

export const Container = styled(LinearGradient) <ContainerProps>`
    ${props => props.direction === 'horizontal' ? `
        width: ${props.size * 20}px;
        height: 100%;
    ` : `
        height: ${props.size * 20}px;
        width: 100%;
    `}
`
