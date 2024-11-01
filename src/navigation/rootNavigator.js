import { BrowserRouter as Router , Route , Switch,Redirect, Routes } from "react-router-dom";
import React, { createContext, useEffect, useState, useContext } from "react";
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
import AuthCallback from "../views/authCallback";
import SignInPage from "../views/signInPage";
import TutorUploadsScreen from "../views/tutorViews/fileUpload";

    

const RootNavigator = () => {
    const {currentTab, setCurrentTab} = useContext(UserContext);    

    return (
        <div>
            <TopTabNavigator/>
            <Routes>
                <Route exact path="/" element={<LoadUpScreen/>} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/login" element={<LoginScreen/>} />
                <Route path="/roleSelection" element={<RoleSelectionScreen/>} />
                <Route path="/subjectSelection" element={<SubjectSelectionScreen/>} />
                <Route path="/tutorDetail" element={<TutorDetail/>} />
                <Route path="/sessionSelection" element={<SessionSelection/>} />
                <Route path="/payment" element={<PaymentPage/>} />
                <Route path="/sessionForm" element={<SessionForm/>} />
                <Route path="/home" element={<TopTabNavigator/>} />
                <Route path="/article-detail" element={<ArticleDetailPage/>} />
                <Route path="/auth/callback" element={<AuthCallback/>} />
                <Route path="/fileUpload" element={<TutorUploadsScreen/>} />
                <Route path="/article/:id" element={<ArticleDetailPage/>} />
            </Routes>
        </div>
    );
}

export default RootNavigator;