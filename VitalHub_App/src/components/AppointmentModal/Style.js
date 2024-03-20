import styled from "styled-components"

export const AppModal = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.6);
`
export const ModalContent = styled.View`
    height: 55%;
    width: 100%;
    gap: 15px;
    position: absolute;
    bottom: 0;
    padding: 30px;
    border-radius: 20px;
    background-color: #fff;
    align-items: center;
    justify-content: center;
`
export const SelectBox = styled.View`
    width: 100%;
    gap: 10px;
`
export const Select = styled.TouchableOpacity`
    height: 53px;
    padding: 16px;
    border: 2px solid #60BFC5;
    border-radius: 5px;
`
export const SelectTitle = styled.Text`
    color: #34898f;
    font-size: 16px;
    font-family: "MontserratAlternates_600SemiBold";
`