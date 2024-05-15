import api from "../Service/Service";
import { Container } from "../components/Container/Style";
import { DefaultText, DefaultTextBlue, TextBox } from "../components/DefaultText/Style";
import { ButtonReset, ButtonTxt } from "../components/EntryButton/Style";
import { InputBoxVerify, InputVerify } from "../components/Input/Style";
import { LinkCancel } from "../components/Links/Style";
import { Logo } from "../components/Logo/Style";
import { Title } from "../components/Title/Style";
import { useEffect, useRef, useState } from "react";


export const VerifyEmail = ({ navigation, route }) => {
const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)];
const [codigo, setCodigo] = useState('');


function focusNextInput(index) {

    if(index < inputs.length -1) 
    {inputs[index + 1].current.focus()}
}

function focusPrevInput(index) {

    if(index > 0) 
    {inputs[index - 1].current.focus()}
}

async function ValidarCod()
{
   
    await api.post(`/RecuperarSenha/ValidarCodigoRecuperacaoSenha?email=${route.params.email}&codigo=${codigo}`)
    .then(() => {navigation.replace("SetPassword", {emailP: route.params.email}) })
    .catch(error => {console.log(error)})



}

useEffect(() => {

inputs[0].current.focus()

}, [])

    return (
        <Container>
            <Logo source={require("../assets/img/VitalHub_Logo1.png")} />
    

            <TextBox>
                <DefaultText> Digite o código de 4 dígitos enviado para </DefaultText>
                <DefaultTextBlue>{route.params.email}</DefaultTextBlue>
            </TextBox>

            <InputBoxVerify>
              

                  {[0,1,2,3].map((index) =>(

                    <InputVerify
                    key={index}
                    ref={inputs[index]}
                    keyboardType="numeric"
                    placeholder="0"
                    maxLength={1}
                    caretHidden={true}
                    onChangeText={(txt) => {


                        if( txt === "" ) {

                            focusPrevInput(index)
                        }
                        else {

                            const novoCodigo = [... codigo]
                            novoCodigo[index] = txt

                            setCodigo(novoCodigo.join(''))
                             focusNextInput(index)
                        }
                    }}
                    />
                  ))}
            </InputBoxVerify>

          
            <ButtonReset onPress={() => ValidarCod()}>
                <ButtonTxt> Continuar </ButtonTxt>
            </ButtonReset>

            <LinkCancel>Reenviar código</LinkCancel>
        </Container>
    )}
                
export default VerifyEmail;