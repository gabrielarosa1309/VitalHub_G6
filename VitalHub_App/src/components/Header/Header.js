import { View } from "react-native";
import { BoxUser, GradientBackground, HomeHeader, TextHome, TitleWhite, UserIcon } from "../Header/Style";
import { Octicons } from '@expo/vector-icons';
import { userDecodeToken } from "../../utils/Auth";
import { useEffect, useState } from "react";

export const Header = ({
    img,
    navigation
}) => {
    const [name, setName] = useState('');

    async function profileLoad() {
        const token = await userDecodeToken();

        if (token) {
            setName(token.name);
        }
    }

    useEffect(() => {
        profileLoad();
    }, [])

    return (

        <GradientBackground>
            <HomeHeader>
                <BoxUser onPress={() => navigation.navigate("Profile")}>
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