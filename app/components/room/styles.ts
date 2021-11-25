import styled from "styled-components/native"

export const Container = styled.TouchableOpacity`
    width: 100%;
    padding: 10px;
    margin-vertical: 10px;
    flex-direction: row;
    background-color: ${props => props.theme.colors.green};
`

export const RoomId = styled.Text`
    flex: 1;
    font-size: 30px;
    color: ${props => props.theme.colors.white};
`

export const RoomName = styled.Text`
    flex: 4;
    font-size: 30px;
    color: ${props => props.theme.colors.white};
`

export const RoomPlayers = styled.Text`
    font-size: 30px;
    color: ${props => props.theme.colors.white};
`
