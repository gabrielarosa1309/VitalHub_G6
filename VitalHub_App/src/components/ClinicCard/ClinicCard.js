import { ClinicAddress, ClinicName, ClockCard, ContainerCardsList, ContentCard, DataClinicCard, IconsColumn, Rate, TextBold, TextBoldRate } from './Style';
import { AntDesign, Entypo } from '@expo/vector-icons';


export const ClinicCardSelect = ({
    name,
    address,
    rate,
    disponibility
}) => {
    return (
        // container principal
        <ContainerCardsList>

            <ContentCard>
                {/* conteúdo da direita */}
                <DataClinicCard>
                    <ClinicName> {name} </ClinicName>
                    <ClinicAddress> {address} </ClinicAddress>
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