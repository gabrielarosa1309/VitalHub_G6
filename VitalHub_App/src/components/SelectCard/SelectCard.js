import { AntDesign, Entypo } from '@expo/vector-icons';
import { ClinicAddress, ClinicName, ClockCard, ContainerCardsList, ContentCard, DataClinicCard, IconsColumn, Rate, TextBold, TextBoldRate } from './Style';

export const SelectCard = ({
    clinicName,
    clinicAddress,
    rate,
    disponibility
}) => {
    return (
        // container principal
        <ContainerCardsList>

            <ContentCard>
                {/* conteúdo da direita */}
                <DataClinicCard>
                    <ClinicName> {clinicName} </ClinicName>
                    <ClinicAddress> {clinicAddress} </ClinicAddress>
                </DataClinicCard>

                {/* conteúdo da esquerda */}
                <IconsColumn>
                    <Rate>
                        <Entypo
                            name="star"
                            size={14}
                            color={"#F9A620"}
                        />

                        <TextBoldRate> {rate} </TextBoldRate>
                    </Rate>

                    <ClockCard>
                        <AntDesign
                            name="calendar"
                            size={14}
                            color={"#49B3BA"}
                        />

                        <TextBold> {disponibility} </TextBold>
                    </ClockCard>
                </IconsColumn>
            </ContentCard>

        </ContainerCardsList>
    );
};