import styled from "styled-components/native"

export const Container = styled.TouchableOpacity`
    width: 100%;
    height: 50px;
    justify-content: center;
    background-color: ${props => props.theme.colors.lightGreen};
`

export const ButtonText = styled.Text`
    padding: 10px;
    text-align: center;
    font-size: 20px;
`
