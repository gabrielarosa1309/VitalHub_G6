import { useEffect, useState } from "react";
import { Container } from "../components/Container/Style";
import FullCalender from "../components/FullCalendar/FullCalendar";
import { Title, Title2, TitleInput, TitleInputDate } from "../components/Title/Style";
import SelectInput from "../components/SelectInput/SelectInput";
import { Button, ButtonTxt } from "../components/EntryButton/Style";
import { LinkCancel } from "../components/Links/Style";
import { SelectBox } from "../components/AppointmentModal/Style";
import AppResumeModal from "../components/AppResumeModal/AppResumeModal";

export const SelectDate = ({ navigation, route }) => {
    const [agendamento, setAgendamento] = useState(null)
    const [selectedDate, setSelectedDate] = useState();
    const [selectedTime, setSelectedTime] = useState();
    
    const [showAppResume, setShowAppResume] = useState(false);

    function handleContinue() {
        setAgendamento({
            ...route.params.agendamento,
            dataConsulta: `${selectedDate} ${selectedTime}`
        })
        setShowAppResume(true)
    }

    useEffect(() => {
		console.log(selectedDate);
		setAgendamento({
			...route.params.agendamento,
			dataConsulta: `${selectedDate} ${selectedTime}`,
		});
	}, [selectedDate]);

    useEffect(() => {
        console.log(route);
    }, [route])

    return (
        <Container>
            <Title2>Selecionar data</Title2>

            <FullCalender
                selectedDate={selectedDate}
                handleSelectedDateFn={setSelectedDate}
            />


            <TitleInputDate> Selecione um horário: </TitleInputDate>

            <SelectInput
                defaultText='Selecionar horário'
                handleSelectedFn={setSelectedTime}
            />

            <AppResumeModal
                agendamento={agendamento}
                visible={showAppResume}
                setShowAppResume={setShowAppResume}
                navigation={navigation}
            />

            <Button onPress={() => handleContinue()}>
                <ButtonTxt> Agendar </ButtonTxt>
            </Button>

            <LinkCancel onPress={() => navigation.replace("Main")}>
                Cancelar
            </LinkCancel>

            <AppResumeModal
                agendamento={agendamento}
                visible={showAppResume}
                setShowAppResume={setShowAppResume}
                navigation={navigation}
                route={route}
            />
        </Container>
    )
}

export default SelectDate;