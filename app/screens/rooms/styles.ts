import styled from "styled-components/native"

export const Container = styled.View`
    flex: 1;
    background-color: ${props => props.theme.colors.white};
`

export const TopBar = styled.View`
    flex-direction: row;
    background-color: ${props => props.theme.colors.primary};
`

export const BackTextContainer = styled.TouchableOpacity`
    margin-vertical: 20px;
    margin-left: 20px;
`

export const BackText = styled.Text`
    font-size: 20px;
    color: ${props => props.theme.colors.white};
`

export const RoomsList = styled.ScrollView`
    flex: 1;
`

export const RoomsListInnerContainer = styled.View`
    width: 100%;
    align-items: center;
    margin-vertical: 10px;
`

export const NoRoomsText = styled.Text`
    text-align: center;
    margin-top: 20px;
    color: ${props => props.theme.colors.black}80;
`

export const NewRoomContainer = styled.TouchableOpacity`
    position: absolute;
    width: 60px;
    height: 60px;
    border-radius: 30px;
    right: 20px;
    bottom: 20px;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.colors.primary};
`

export const NewRoomText = styled.Text`
    font-size: 30px;
    text-align: center;
    color: ${props => props.theme.colors.white};
`
