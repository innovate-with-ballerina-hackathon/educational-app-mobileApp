import React, { createContext, useEffect, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import LoadUpScreen from "../views/welcomeScreen";
import LoginScreen from "../views/loginScreen";
import RoleSelectionScreen from "../views/roleSelection";
import SubjectSelectionScreen from "../views/subjectSelection";
import HomeScreen from "../views/homeScreen";
import TopTabNavigator from "./topTabNavigator";
import { ArticleDetailPage } from "../views/articleDetailPage";
import AuthCallback from "../helpers/authCallback";
import { UserContext } from "../../App";


const Stack = createNativeStackNavigator();

export default function RootNavigator(){
    const [isLoading, setIsLoading] =  useState(true);
    const {currentTab, setCurrentTab} = useContext(UserContext);    

    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName="LoadUpScreen" >
                <Stack.Screen name="Home" component={TopTabNavigator} options={{headerShown:false}}/>
                <Stack.Screen name="LoadUpScreen" component={LoadUpScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
                <Stack.Screen name="SubjectSelection" component={SubjectSelectionScreen} />
                <Stack.Screen name="AuthCallback" component={AuthCallback} />
                {/* <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}
                <Stack.Screen name="ArticleDetail" component={ArticleDetailPage} />
            </Stack.Navigator>
        </NavigationContainer>

    )
}