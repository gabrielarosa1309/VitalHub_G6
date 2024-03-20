import { View } from "react-native";
import { BoxUser, GradientBackground, HomeHeader, TextHome, TitleWhite, UserIcon } from "../Header/Style";
import { Octicons } from '@expo/vector-icons';

export const Header = ({
    img,
    name,
    navigation
}) => {
    return (

        <GradientBackground>
            <HomeHeader>
                <BoxUser onPress={() => navigation.navigate("PatientProfile")}>
                    <UserIcon source={img} />
                    <View>
                        <TextHome>Bem-vindo</TextHome>
                        <TitleWhite>{name}</TitleWhite>
                    </View>
                </BoxUser>

                <Octicons
                    name="bell-fill"
                    size={22}
                    color="white"
                />
            </HomeHeader>
        </GradientBackground>

    );
}
export default Header;