import styled from "styled-components";

export const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    background-color: #FAFAFA;
`

export const ContainerProfileImage = styled.View`

`

export const ContainerLogin = styled(Container)`
    justify-content: center;
    gap: 20px;
`
export const Container2 = styled(Container)`
    justify-content: center;
`
export const ContainerUser = styled(Container)`
    justify-content: baseline;
`
export const ContainerScroll = styled.ScrollView.attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
        // width: 400,
        // height: 200,
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})``

export const Scroll = styled(ContainerScroll)`
    width: 85%;
    margin-top: 20px;
`

export const ContainerImage = styled.View`
    width: 100%;
    height: 280px;
    margin-bottom: 20px;
    position: relative;
    align-items: center;
    justify-content: flex-start;
`