import { AntDesign } from "@expo/vector-icons";
import {
  ButtonCard,
  ButtonText,
  ClockCard,
  ContainerCardsList,
  ContentCard,
  DataProfileCard,
  ProfileData,
  ProfileImage,
  ProfileName,
  TextAge,
  TextBold,
  ViewRow,
} from "./Style";
import MedModal from "../MedModal/MedModal";
import { useState } from "react";

export const PatientAppCard = ({
  situacao,
  onPressCancel,
  onPressMedModal,
  navigation,
  roleUsuario,
  prioridade,
  usuarioConsulta
}) => {
  const [showMedModal, setShowMedModal] = useState(false);

  

  return (
    // container principal
    <ContainerCardsList>
      {/* imagem de perfil */}
      <ButtonCard onPress={onPressMedModal}>
        <ProfileImage
          source={require("../../assets/img/medico4.jpg")}
          onPressMedModal={() => setShowMedModal(true)}
        />
      </ButtonCard>

      <MedModal
        visible={showMedModal}
        setShowMedModal={setShowMedModal}
      />

      {/* conteúdo ao lado da imagem de perfil */}
      <ContentCard>
        <DataProfileCard>
          <ProfileName>Dr. Claudio</ProfileName>

          <ProfileData>
            <TextAge>{roleUsuario == "Medico" ? usuarioConsulta.dataNascimento : usuarioConsulta.crm}</TextAge>
            <TextBold>{prioridade == 0 ? "Rotina" : prioridade == 1 ? "Exame" : "Rotina"}</TextBold>
          </ProfileData>
        </DataProfileCard>

        <ViewRow>
          <ClockCard situacao={situacao}>
            <AntDesign
              name="clockcircle"
              size={14}
              color={situacao == "Pendentes" ? "#49B3BA" : "#8C8A97"}
            />

            <TextBold situacao={situacao} color={"#49B3BA"}>
              14:00
            </TextBold>
          </ClockCard>

          {/* valida e mostra o tipo de botão conforme a situação */}

          {
            situacao == "Cancelados" ? (
              <>
              </>
            ) : situacao == "Pendentes" ? (
              <ButtonCard onPress={onPressCancel}>
                <ButtonText situacao={situacao}>Cancelar</ButtonText>
              </ButtonCard>
            ) : (
              <ButtonCard onPress={() => navigation.navigate("PatientVisuRecord")}>
                <ButtonText situacao={situacao}>Ver Prontuário</ButtonText>
              </ButtonCard>
            )
          }
        </ViewRow>
      </ContentCard>
    </ContainerCardsList>
  );
};