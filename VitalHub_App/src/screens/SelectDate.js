import { useState } from "react";
import { Container } from "../components/Container/Style";
import FullCalender from "../components/FullCalendar/FullCalendar";
import { Title, Title2, TitleInput, TitleInputDate } from "../components/Title/Style";
import SelectInput from "../components/SelectInput/SelectInput";
import { Button, ButtonTxt } from "../components/EntryButton/Style";
import { LinkCancel } from "../components/Links/Style";
import { SelectBox } from "../components/AppointmentModal/Style";
import AppResumeModal from "../components/AppResumeModal/AppResumeModal";

export const SelectDate = ({ navigation, route }) => {
    const [selectedDate, setSelectedDate] = useState();
    const [horaSelecionada, setHoraSelecionada] = useState(null);
    const [selectedTime, setSelectedTime] = useState();
    const [showAppResume, setShowAppResume] = useState(false);
    const [agendamento, setAgendamento] = useState(null)

    const [avaliableTimesData, setAvaliableTimesData] = useState(['12:30', '14:00', '15:30', '16:00', '17:00']);


    function HandleContinue(params) {
        
        setAgendamento(...route.params.agendamento, DataConsulta)

    }


    return (
        <Container>
            <Title2>Selecionar data</Title2>

            <FullCalender
                selectedDate={selectedDate}
                handleSelectedDateFn={setSelectedDate}
            />


            <TitleInputDate> Selecione um horário: </TitleInputDate>

            <SelectInput
                setHoraSelecionada={setHoraSelecionada}
                defaultText='Selecionar horário'
            />

            <AppResumeModal
                agendamento={agendamento}
                visible={showAppResume}
                setShowAppResume={setShowAppResume}
                navigation={navigation}
            />

            <Button onPress={() => setShowAppResume(true)}>
                <ButtonTxt> Agendar </ButtonTxt>
            </Button>

            <LinkCancel onPress={() => navigation.navigate("SelectDoctor")}>
                Cancelar
            </LinkCancel>
        </Container>
    )
}

export default SelectDate;