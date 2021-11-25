import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { Container, Label, TextInput } from './styles'

interface InputProps {
    value: string
    onValueChanged: (value: string) => void
    label: string
    placeholder?: string
    style?: StyleProp<ViewStyle>
}

export const Input: React.FC<InputProps> = ({
    value,
    onValueChanged,
    label,
    placeholder,
    style,
}) => {
    return <Container style={style}>
        {!!label && <Label>{label}</Label>}
        <TextInput
            value={value}
            onChangeText={onValueChanged}
            placeholder={placeholder}
        />
    </Container>
}
