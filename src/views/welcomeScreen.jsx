import React, { useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { MotiText, MotiView } from 'moti';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';

const LoadUpScreen = () => {

    const {isLoggedIn } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            if(isLoggedIn){
                navigate('/home');
            }else{
                navigate('/roleSelection');
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [isLoggedIn, navigate]);

    
    return (
        <ImageBackground 
            source={{ uri: 'https://png.pngtree.com/thumb_back/fh260/background/20210814/pngtree-educational-mathematical-formulas-on-white-background-image_763079.jpg' }} 
            style={styles.container} 
            resizeMode="cover"
        >
            <MotiView
                from={{ opacity: 0, translateY: -50 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'timing', duration: 2000 }}
                style={styles.welcomeContainer}
            >
                <MotiText
                    from={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0, duration: 1000 }}
                    style={styles.welcomeText}
                >
                    Welcome to EduApp
                </MotiText>

                <MotiText
                    from={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 500, duration: 2000 }}
                    style={styles.subtitleText}
                >
                    Find the best tutors for your subjects
                </MotiText>
            </MotiView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw', // Full width
        height: '100vh', // Full height
    },
    marqueeContainerBottom: {
        position: 'absolute',
        bottom: 20, // Adjusted to fit better in the screen
        height: 50,
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly transparent white background
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        elevation: 3, // Add shadow for better visibility
    },
    marquee: {
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    equationText: {
        fontSize: 20,
        marginHorizontal: 10,
        color: '#4BA8F0', // Sky Blue
        fontWeight: 'bold', // Bold text for emphasis
    },
    welcomeContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.9)', // Semi-transparent background for text
        borderRadius: 15,
        elevation: 5, // Add shadow effect
    },
    welcomeText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#2A7DE1', // Royal Blue
    },
    subtitleText: {
        fontSize: 20,
        color: '#FFFFFF', // Charcoal Gray
        marginTop: 10, // Spacing between title and subtitle
        textAlign: 'center', // Center align the subtitle
    },
});

export default LoadUpScreen;
