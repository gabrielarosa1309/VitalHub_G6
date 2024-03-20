import { Button, View } from "react-native";

export const Navigation = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "Center", gap: 15 }}>
            <Button
                title="Login"
                onPress={() => navigation.navigate("Login")}
            />

            <Button
                title="CreateAccount"
                onPress={() => navigation.navigate("CreateAccount")}
            />


            <Button
                title="ResetPassword"
                onPress={() => navigation.navigate("ResetPassword")}
            />

            <Button
                title="SetPassword"
                onPress={() => navigation.navigate("SetPassword")}
            />

            <Button
                title="VerifyEmail"
                onPress={() => navigation.navigate("VerifyEmail")}
            />

            <Button
                title="HomeMed"
                onPress={() => navigation.navigate("HomeMed")}
            />

            <Button
                title="InsertMedRecord"
                onPress={() => navigation.navigate("InsertMedRecord")}
            />

            <Button
                title="MedPatientRecord"
                onPress={() => navigation.navigate("MedPatientRecord")}
            />

            <Button
                title="Home"
                onPress={() => navigation.navigate("Home")}
            />

            <Button
                title="SelectClinic"
                onPress={() => navigation.navigate("SelectClinic")}
            />

            <Button
                title="SelectDoctor"
                onPress={() => navigation.navigate("SelectDoctor")}
            />

            <Button
                title="SelectDate"
                onPress={() => navigation.navigate("SelectDate")}
            />

            <Button
                title="Localization"
                onPress={() => navigation.navigate("Localization")}
            />

            <Button
                title="PatientProfile"
                onPress={() => navigation.navigate("PatientProfile")}
            />

            <Button
                title="EditPatientProfile"
                onPress={() => navigation.navigate("EditPatientProfile")}
            />

            <Button
                title="PatientVisuRecord"
                onPress={() => navigation.navigate("PatientVisuRecord")}
            />
        </View>
    );
}
export default Navigation;