import { Container } from "../components/Container/Style";
import { ImgLocal } from "../components/ImgProfile/Style";
import { BoxInput, BoxInputRow, DirectionRow, InputBlock, InputBodyRow } from "../components/Input/Style";
import { LinkCancel } from "../components/Links/Style";
import { Map } from "../components/Map/Map";
import { Subtitle, Title, TitleInput, TitleLocation } from "../components/Title/Style";

export const Location = ({ navigation }) => {
    return (
        
        <Container>
            <Map/>

            <TitleLocation> Clínica Natureh </TitleLocation>
            <Subtitle> São Paulo, SP </Subtitle>

            <BoxInput>
                <TitleInput> Endereço </TitleInput>
                <InputBlock>Rua Vicenso Silva, 987</InputBlock>
            </BoxInput>

            <DirectionRow>
                <BoxInputRow>
                    <TitleInput> Número </TitleInput>
                    <InputBodyRow>578</InputBodyRow>
                </BoxInputRow>

                <BoxInputRow>
                    <TitleInput> Bairro </TitleInput>
                    <InputBodyRow>Moema-SP</InputBodyRow>
                </BoxInputRow>
            </DirectionRow>

            <LinkCancel onPress={() => navigation.replace("Main")}>
                Cancelar
            </LinkCancel>
        </Container>
    );
}

export default Location;