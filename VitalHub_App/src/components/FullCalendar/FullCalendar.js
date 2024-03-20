import { Calendar, LocaleConfig } from 'react-native-calendars';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { DayContainer, DayText } from './Style';

LocaleConfig.locales['br'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ],
  dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
  dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.'],
  today: "Hoje"
};
LocaleConfig.defaultLocale = 'br';

export default function FullCalender({ selectedDate = '', handleSelectedDateFn = null }) {
    const currentDate = new Date().toUTCString();

    return (
        <Calendar 
            minDate={currentDate} 
            monthFormat='MMMM yyyy'
            enableSwipeMonths={true}
            hideArrows={true}
            style={styles.calendar}
            theme={{
                dotColor: '#60BFC5',
                calendarBackground: '#FBFBFB',
                'stylesheet.calendar.header': {
                    monthText: {
                        fontFamily: 'MontserratAlternates_600SemiBold',
                        color: '#5F5C6B',
                        fontSize: 18,
                        marginBottom: 18
                    }
                }
            }}
            dayComponent={({ date, state }) =>
                <TouchableOpacity onPress={() => {
                    if (state == 'disabled')
                        return;

                    handleSelectedDateFn(date.dateString)
                }}>
                    <DayContainer isSelected={date.dateString == selectedDate}>
                        <DayText isSelected={date.dateString == selectedDate} isDisabled={state == 'disabled'}>{ date.day }</DayText>
                    </DayContainer>
                </TouchableOpacity>
            }
        />
    )
}

const styles = StyleSheet.create({
    calendar: {
        width: 380,
    }
});