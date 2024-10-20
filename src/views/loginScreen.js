import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ResponseType } from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const navigation = useNavigation();
  const { role, subject , accessToken, setAccessToken } = useContext(UserContext);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '222895958736-8k1pnc7jq9qqj7d36h2ta6rov24e15cp.apps.googleusercontent.com', // replace with your own webClientId
    redirectUri: 'http://localhost:8081',
    scopes: [
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
    ]
  });


  const checkIfLoggedIn = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    console.log('>>>>>token',token);
    if(token){
      setAccessToken(token);
      navigation.navigate('Home');
    }
  };

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      console.log('>>>>',authentication.accessToken);

      AsyncStorage.setItem('accessToken', authentication.accessToken);
      setAccessToken(authentication.accessToken);
      navigation.navigate('Home'); 
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login with Google</Text>
      <Button
        disabled={!request}
        title="Login with Google"
        onPress={() => {
          promptAsync();
        }}
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
});

export default LoginScreen;
