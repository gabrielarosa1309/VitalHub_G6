import { ContainerCardsList, ContentCard, DataDoctorCard, DoctorImg, DoctorName, DoctorSpecialty, ImgColumn } from "./Style";

export const DoctorCard = ({
    doctorImg, 
    doctorName,
    doctorSpecialty,
    selected = true, 
    medico
}) => {
    return (
        // container principal
        <ContainerCardsList >

            <ContentCard >
                {/* conteúdo da direita */}
                <ImgColumn>
                    <DoctorImg source={doctorImg}/>
                </ImgColumn>

                {/* conteúdo da esquerda */}
                <DataDoctorCard>
                    <DoctorName> {doctorName} </DoctorName>
                    <DoctorSpecialty> {doctorSpecialty} </DoctorSpecialty>
                </DataDoctorCard>

            </ContentCard>

        </ContainerCardsList>
    );
};