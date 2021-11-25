import React from "react"
import { ActivityIndicator, StyleProp, ViewStyle } from "react-native"
import { ButtonText, Container } from "./styles"

interface ButtonProps {
    children: string
    onPress: () => void
    loading?: boolean
    style?: StyleProp<ViewStyle>
}

export const Button: React.FC<ButtonProps> = ({
    children,
    onPress,
    loading,
    style,
}) => {
    return <Container style={style} onPress={() => !loading && onPress()}>
        {loading ? <ActivityIndicator color='black' /> :
            <ButtonText>
                {children}
            </ButtonText>
        }
    </Container>
}
