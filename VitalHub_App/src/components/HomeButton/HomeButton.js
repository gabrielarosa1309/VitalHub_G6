import { ButtonHome, ButtonHomeTxt } from "./Style";

export const HomeButton = ({
    textButton,
    clickButton = false,
    onPress,
}) => {
    return (
        <ButtonHome clickButton={clickButton} onPress={onPress}>
            <ButtonHomeTxt clickButton={clickButton}> {textButton} </ButtonHomeTxt>
        </ButtonHome>
    )
}