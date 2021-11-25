import React, { ReactFragment } from 'react'
import { Animated } from 'react-native'
import { BackgroundTouchable, BackgroundTouchableInner, Container, ContentContainer } from './styles'

interface ModalProps {
    show: boolean
    callback?: () => void
    content: ReactFragment
    animationValue: Animated.Value
}

export const Modal: React.FC<ModalProps> = ({
    show,
    callback,
    content,
    animationValue,
}) => {
    const onBackgroundPress = () => {
        if (!!callback)
            callback()
    }

    return <Container show={show} style={{
        backgroundColor: animationValue.interpolate({
            inputRange: [0, 100],
            outputRange: ['#00000000', '#00000080'],
        })
    }}>
        <BackgroundTouchable onPress={onBackgroundPress}>
            <BackgroundTouchableInner />
        </BackgroundTouchable>
        <ContentContainer style={{
            marginBottom: animationValue.interpolate({
                inputRange: [0, 100],
                outputRange: ['-100%', '0%'],
            })
        }}>
            {content}
        </ContentContainer>
    </Container>
}
