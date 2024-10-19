import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import LoadUpScreen from "../views/welcomeScreen";
import LoginScreen from "../views/loginScreen";
import RoleSelectionScreen from "../views/roleSelection";
import SubjectSelectionScreen from "../views/subjectSelection";
import HomeScreen from "../views/homeScreen";
import BottomTabNavigator from "./bottomTabNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ArticleDetailPage } from "../views/articleDetailPage";

const Stack = createNativeStackNavigator();

export default function RootNavigator(){
    const [isLoading, setIsLoading] =  useState(true);
    const [initialState, setInitialState] = useState();

    const loadNavigationState = async () => {
        try {
            const savedState = await AsyncStorage.getItem('NAVIGATION_STATE');
            if(savedState){
                setInitialState(JSON.parse(savedState));
                console.log(savedState);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    };

    const saveNavigationState = async (state) => {
        try {
            await AsyncStorage.setItem('NAVIGATION_STATE', JSON.stringify(state));
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        loadNavigationState();
    }, []);

    if (isLoading) {
        return null;
    }

    return (
        <NavigationContainer initialState={initialState} onStateChange={saveNavigationState}>
            <Stack.Navigator initialRouteName="LoadUpScreen">
                <Stack.Screen name="Home" component={BottomTabNavigator} options={{headerShown:false}}/>
                <Stack.Screen name="LoadUpScreen" component={LoadUpScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
                <Stack.Screen name="SubjectSelection" component={SubjectSelectionScreen} />
                {/* <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}
                <Stack.Screen name="ArticleDetail" component={ArticleDetailPage} />
            </Stack.Navigator>
        </NavigationContainer>

    )
}