import styled from 'styled-components/native'

export const Container = styled.View`
    width: 100%;
    border-top-width: 1px;
    border-bottom-width: 1px;
    border-top-color: ${props => props.theme.colors.darkGreen};
    border-bottom-color: ${props => props.theme.colors.darkGreen};
`

export const Label = styled.Text`
    padding-top: 5px;
    padding-left: 10px;
    margin-bottom: -5px;
`

export const TextInput = styled.TextInput`
    padding-horizontal: 20px;
`
