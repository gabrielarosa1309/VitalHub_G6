import { ContentIcon, TextIcon } from './Style'

//Importar o recurso do bottom tabs
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
const BottomTab = createBottomTabNavigator();

//Importar as telas
import Home from "../Home";
import PatientProfile from "../PatientProfile";

export const Main = () => {
    return (
        <BottomTab.Navigator 
            //Definindo rota inicial
            initialRouteName="Home"
            screenOptions={ ({ route }) => ({
                tabBarStyle:{ backgroundColor: "#FFFFFF", height: 80, borderRadius: 30 },
                tabBarActiveBackgroundColor: "transparent",
                tabBarShowLabel: false,
                headerShown: false,

                tabBarIcon: ({ focused }) => {
                    if( route.name === "Home" ) {
                        return (
                            <ContentIcon 
                                tabBarActiveBackgroundColor={ focused ? "#ECF2FF" : "transparent"}
                            >
                                <FontAwesome
                                    name='calendar-check-o'
                                    size={22}
                                    color="#4E4B59"
                                />
                                { focused && <TextIcon>Agenda</TextIcon> }
                            </ContentIcon>
                        )
                    }else {
                        return (
                            <ContentIcon 
                                tabBarActiveBackgroundColor={ focused ? "#ECF2FF" : "transparent"}
                            >
                                <FontAwesome5
                                    name="user-circle"
                                    size={22}
                                    color="#4E4B59"
                                />
                                { focused && <TextIcon>Perfil</TextIcon> }
                            </ContentIcon>
                        )
                    }
                }
            }) }
        >

            <BottomTab.Screen
                name="Home"
                component={Home}
            />
            
            <BottomTab.Screen
                name="Perfil"
                component={PatientProfile}
            />

        </BottomTab.Navigator>
    )
}