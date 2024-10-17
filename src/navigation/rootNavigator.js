import React from "react";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import LoadUpScreen from "../views/welcomeScreen";
import LoginScreen from "../views/loginScreen";
import RoleSelectionScreen from "../views/roleSelection";
import SubjectSelectionScreen from "../views/subjectSelection";
import HomeScreen from "../views/homeScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator(){

    const navigateToHome = () => {
        navigation.navigate('Home');
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="LoadUpScreen">
                <Stack.Screen name="LoadUpScreen" component={LoadUpScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
                <Stack.Screen name="SubjectSelection" component={SubjectSelectionScreen} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>

    )
}