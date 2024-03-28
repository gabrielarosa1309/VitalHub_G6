import { Text } from "react-native";
import { ContainerCardsList, ContentCard, DataDoctorCard, DoctorImg, DoctorName, DoctorSpecialty, ImgColumn } from "./Style";

export const DoctorCard = ({
    img,
    nome,
    speciality
}) => {
    return (
        // container principal
     
        <ContainerCardsList>

            <ContentCard>
                {/* conteúdo da direita */}
                <ImgColumn>
                    <DoctorImg source={img}/>
                </ImgColumn>

                {/* conteúdo da esquerda */}
                <DataDoctorCard>
                    <DoctorName> {nome} </DoctorName>
                    <DoctorSpecialty> Especialidade {speciality} </DoctorSpecialty>
                </DataDoctorCard>

           

            </ContentCard>

        </ContainerCardsList>
    );
};