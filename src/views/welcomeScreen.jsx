import React, { useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MotiText, MotiView, AnimatePresence } from 'moti';
import { TextMarquee } from '../components/textMarquee';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../../App';



const equations = ['E = mc^2', 'F = ma', 'a^2 + b^2 = c^2', 'V = IR', 'd = vt', 'pV = nRT'];

const LoadUpScreen = () => {
    const navigation = useNavigation();
    const { setAccessToken, setRole, setSubject } = useContext(UserContext);

    const checkIfLoggedIn = async () => {
        const token = await AsyncStorage.getItem('accessToken');
        const role = await AsyncStorage.getItem('role');
        const subject = await AsyncStorage.getItem('subject');

        if (token && role) {
            setAccessToken(token);
            setRole(role);
            if (role === 'tutor') {
                setSubject(subject);
            }
            const timeoutId = setTimeout(() => {
                navigation.navigate('Home');
            }, 5000);
        } else {
            const timeoutId = setTimeout(() => {
                navigation.navigate('RoleSelection');
            }, 5000);

            return () => clearTimeout(timeoutId);
        }
    };

    useEffect(() => {
        checkIfLoggedIn();
    }, []);


    const renderMarquee = () => {
        return equations.map((equation, index) => (
            <Text key={index} style={styles.equationText}>{equation}</Text>
        ));
    };

    return (
        <View style={styles.container}>

            <MotiView
                from={{ opacity: 0, translateY: -50 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'timing', duration: 2000 }}
                style={styles.welcomeContainer}
            >
                <MotiText
                    from={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1000, duration: 2000 }}
                    style={styles.welcomeText}
                >
                    Welcome to EduFind
                </MotiText>

                <MotiText
                    from={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3000, duration: 2000 }}
                    style={styles.subtitleText}
                >
                    Find the best tutors for your subjects
                </MotiText>
            </MotiView>

            {/* Marquee of equations at the bottom */}
            <View style={styles.marqueeContainerBottom}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.marquee}>
                    {renderMarquee()}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF', // White background
        justifyContent: 'center',
        alignItems: 'center',
    },
    marqueeContainer: {
        position: 'absolute',
        top: 50,
        height: 50,
        width: '100%',
    },
    marqueeContainerBottom: {
        position: 'absolute',
        bottom: 50,
        height: 50,
        width: '100%',
    },
    marquee: {
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
    equationText: {
        fontSize: 20,
        marginHorizontal: 10,
        color: '#4BA8F0', // Sky Blue
    },
    welcomeContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2A7DE1', // Royal Blue
    },
    subtitleText: {
        fontSize: 18,
        color: '#4A4A4A', // Charcoal Gray
    },
});

export default LoadUpScreen;
