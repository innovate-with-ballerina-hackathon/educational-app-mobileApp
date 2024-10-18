import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const navigation = useNavigation();
  const {role, subject} = useContext(UserContext);
  const [accessToken, setAccessToken] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: '222895958736-8k1pnc7jq9qqj7d36h2ta6rov24e15cp.apps.googleusercontent.com',
    selectAccount: true,
    offlineAccess: true,
  });

  const checkIfLoggedIn = async () => {
    const token = await AsyncStorage.getItem('accessToken');
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
      console.log(authentication);

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
