import React, { createContext, useEffect, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import LoadUpScreen from "../views/welcomeScreen";
import LoginScreen from "../views/loginScreen";
import RoleSelectionScreen from "../views/roleSelection";
import SubjectSelectionScreen from "../views/subjectSelection";
import HomeScreen from "../views/homeScreen";
import TutorList from "../views/tutorList";
import TutorDetail from "../views/tutorDetail";
import SessionSelection from "../views/sessionSelection";
import PaymentPage from "../views/paymentPage";
import TopTabNavigator from "./topTabNavigator";
import SessionForm from "../views/sessionForm";
import { ArticleDetailPage } from "../views/articleDetailPage";
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

                <Stack.Screen name="TutorList" component={TutorList}/>
                <Stack.Screen name="TutorDetail" component={TutorDetail}/>
                <Stack.Screen name="SessionSelection" component={SessionSelection}/>
                <Stack.Screen name="PaymentPage" component={PaymentPage}/>
                <Stack.Screen name="SessionForm" component={SessionForm}/>
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="ArticleDetail" component={ArticleDetailPage} />
            </Stack.Navigator>
        </NavigationContainer>

    )
}