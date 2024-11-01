import React from 'react';
import { GOOGLE_CLIENT_ID } from '../helpers/constants';
import { View, Text, Button, StyleSheet } from 'react-native';

const REDIRECT_URI = 'http://localhost:8081/auth/callback';
const RESPONSE_TYPE = 'code';
const SCOPE = [
    'openid',
    'profile',
    'email',
    'https://mail.google.com/',
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/gmail.send',
    'https://www.googleapis.com/auth/gmail.compose',
    'https://www.googleapis.com/auth/gmail.modify',
    'https://www.googleapis.com/auth/gmail.labels',
    'https://www.googleapis.com/auth/gmail.addons.current.message.readonly',
    'https://www.googleapis.com/auth/gmail.addons.current.message.metadata',
    'https://www.googleapis.com/auth/gmail.addons.current.action.compose',
    'https://www.googleapis.com/auth/gmail.addons.current.message.action',
    'https://www.googleapis.com/auth/gmail.settings.sharing',
    'https://www.googleapis.com/auth/gmail.insert',
    'https://www.googleapis.com/auth/gmail.settings.basic',
    'https://www.googleapis.com/auth/drive.metadata.readonly'
];

const SignInPage = () => {
    const handleGoogleSignIn = () => {
        const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE.join(' ')}&prompt=select_account`;
        window.location.href = url;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login with Google</Text>
            <Button
                title="Login with Google"
                onPress={handleGoogleSignIn}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#fff',
        width: '100vw',
        height: '100vh',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 24,
    },
});

export default SignInPage;

