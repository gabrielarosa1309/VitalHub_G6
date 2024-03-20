import styled from "styled-components";

export const ContentIcon = styled.View`
    border-radius: 18px;
    padding: 15px 21px;
    background-color: ${props => `${props.tabBarActiveBackgroundColor}`};

    gap: 10px;
    flex-direction: row;
    justify-content: center;
    align-items: center;

`
export const TextIcon = styled.Text`
    font-size: 18px;
    font-family: 'Quicksand_500Medium';
`