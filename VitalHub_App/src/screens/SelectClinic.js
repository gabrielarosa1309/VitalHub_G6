import { Container, ContainerScroll } from "../components/Container/Style"; import { Button, ButtonTxt } from "../components/EntryButton/Style";
import { LinkCancel } from "../components/Links/Style";
import { SelectCard } from "../components/SelectCard/SelectCard";
import { Title2 } from "../components/Title/Style";

export const SelectClinic = ({ navigation }) => {
    return (
        <Container>
            <Title2> Selecionar clínica </Title2>

                <SelectCard
                    clinicName="Clínica Natureh"
                    clinicAddress="São Paulo, SP"
                    rate="4,5"
                    disponibility="Seg-Sex"
                />

                <SelectCard
                    clinicName="Diamond Pró-Mulher"
                    clinicAddress="São Paulo, SP"
                    rate="4,8"
                    disponibility="Seg-Sex"
                />

                <SelectCard
                    clinicName="Clinica Villa Lobos"
                    clinicAddress="Taboão, SP"
                    rate="4,2"
                    disponibility="Seg-Sab"
                />

                <SelectCard
                    clinicName="SP Oncologia Clínica"
                    clinicAddress="Taboão, SP"
                    rate="4,2"
                    disponibility="Seg-Sab"
                />

            <Button onPress={() => navigation.navigate("SelectDoctor")}>
                <ButtonTxt> CONTINUAR </ButtonTxt>
            </Button>

            <LinkCancel onPress={() => navigation.replace("Main")}>Cancelar</LinkCancel>

        </Container>
    );
}
export default SelectClinic;