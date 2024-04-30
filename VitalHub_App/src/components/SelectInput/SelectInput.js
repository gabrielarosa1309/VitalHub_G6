import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { AntDesign } from '@expo/vector-icons';
import { InputLabel } from '../InputLabel/Style';
import moment from 'moment'
export default function SelectInput({ data = [], defaultText = '', handleSelectedFn = null, labelText = '', setHoraConsulta }) {
 
  const dataAtual = moment().format("YYYY-MM-DD")
  const [arrayOptions, setArrayOptions] = useState()
 

  function LoadOptions(params) {
    
//Conferir quantas horas faltam ate meia noite
const horasRestantes = moment(dataAtual).add(24, 'hours').diff(moment(), 'hours')



//Criar um laco que rode a quantidade de horas que faltam
const options = Array.from({length : horasRestantes}, (_, index) => {

  let valor = new Date().getHours() + (index + 1)

  //retorno para a bibliotreca rnpicker
  // return {label : `${valor}:00`, value : valor}

  return `${valor}:00`
})



//Devolver para cada hora, uma nova opcao no select 
setArrayOptions(options)
  }

  useEffect(() => {
    
    LoadOptions()}, [])


  return (
    <View>
      <InputLabel>{ labelText }</InputLabel>
      <SelectDropdown 
          data={arrayOptions}
          defaultButtonText={defaultText}
          buttonStyle={styles.button}
          buttonTextStyle={styles.buttonText}
          renderDropdownIcon={() => <AntDesign name="caretdown" size={24} color="#34898F" />}
          dropdownIconPosition='right'
          rowTextStyle={styles.rowText}
          dropdownOverlayColor='transparent'
          dropdownStyle={styles.dropdown}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    borderColor: '#60BFC5',
    borderWidth: 2,
    width: '90%',
    height: 54,
    paddingLeft: 16,
    paddingRight: 16
  },
  buttonText: {
    color: '#34898F',
    fontSize: 14,
    fontFamily: 'MontserratAlternates_600SemiBold',
    textAlign: 'left'
  },
  dropdown: {
    backgroundColor: '#FBFBFB',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderWidth: 2,
    borderColor: '#60BFC5',
    marginTop: -30,
    borderTopWidth: 2,
    borderBottomWidth: 0
  },
  rowText: {
    fontFamily: 'MontserratAlternates_600SemiBold',
    fontSize: 16,
    color: '#34898F'
  }
});