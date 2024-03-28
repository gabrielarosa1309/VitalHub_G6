import { AlignBoxSelectDoctorComponents, AlignSelectDoctorText, BoxSelectDoctorN, BoxSelectDoctorName, BoxSelectDoctorType, ButtonCard, SelectDoctorImage } from "./Style"



export const DoctorCardSelect = ({nome, especialidade, doctorId, index, onPress, clickButton = false}) => {return(

<ButtonCard clickButton={clickButton} onPress={onPress}>
<BoxSelectDoctorN clickButton={clickButton} doctorId={doctorId} index={index}>
    <AlignBoxSelectDoctorComponents>

        <SelectDoctorImage source={require("../../assets/img/SelectDoctor.png")}/>

        <AlignSelectDoctorText>
            <BoxSelectDoctorName>{nome}</BoxSelectDoctorName>
            <BoxSelectDoctorType>{especialidade}</BoxSelectDoctorType>
        </AlignSelectDoctorText>
    </AlignBoxSelectDoctorComponents>
</BoxSelectDoctorN>
</ButtonCard>

)}
