import { AlignBoxSelectDoctorComponents, AlignSelectDoctorText, BoxSelectDoctorN, BoxSelectDoctorName, BoxSelectDoctorType, ButtonCard, ClinicAddress, ClinicName, ClockCard, ContentCard, DataClinicCard, IconsColumn, Rate, SelectDoctorImage, TextBold, TextBoldRate } from "./Style"
import { AntDesign, Entypo } from '@expo/vector-icons';


export const ClinicCardSelect = ({name, adress, rate, disponibility, clinicId, index, onPress, clickButton = false}) => {return(

<ButtonCard clickButton={clickButton} onPress={onPress}>
<BoxSelectDoctorN clickButton={clickButton} clinicId={clinicId} index={index}>
    <AlignBoxSelectDoctorComponents>

        <ContentCard>
                {/* conteúdo da direita */}
                <DataClinicCard>
                    <ClinicName>{name}</ClinicName>
                    <ClinicAddress>{adress}</ClinicAddress>
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
    </AlignBoxSelectDoctorComponents>
</BoxSelectDoctorN>
</ButtonCard>

)}
