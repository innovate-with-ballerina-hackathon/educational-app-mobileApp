import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Box, Typography, Card, CardContent } from '@mui/material';
import { AUTH_URL } from '../helpers/constants';
import { UserContext } from '../../App';

const AuthCallback = () => {
    const navigate = useNavigate();
    const { setRole , setSubject } = useContext(UserContext);
    const role = sessionStorage.getItem('role');
    const subject = sessionStorage.getItem('subject');
    console.log(">>>role", role , ">>>subject", subject);

    useEffect(() => {
        const handleAuth = async () => {
            const code = new URLSearchParams(window.location.search).get('code');
            console.log(">>>code", code);

            if (code) {
                try {
                    // Send the authorization code to your backend
                    const response = await axios.post(`${AUTH_URL}/token`, null, {
                        params: {
                            code: code,
                            role: role,
                            redirect_uri: 'http://localhost:8081/auth/callback',
                            subject: subject
                        }
                    });

                    console.log(response.data); // Save the user data/token if needed
                    sessionStorage.setItem('id', response.data['user_id']);
                    navigate('/home'); // Redirect to the dashboard or another page
                } catch (error) {
                    console.error('Error during Google authentication', error);
                }
            }
        };
        handleAuth();
    }, [navigate]);

    useEffect(() => {
        const timer = setTimeout(() => {
                navigate('/home');            
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <Box sx={styles.container}>
            <Card sx={styles.card}>
                <CardContent>
                    <Typography variant="h5" sx={styles.title}>
                        Authenticating...
                    </Typography>
                    <CircularProgress sx={styles.spinner} />
                    <Typography variant="body2" sx={styles.description}>
                        Please wait while we authenticate your account.
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#f0f4f8', // Light background color
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '30px',
        width: '350px',
        borderRadius: '10px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    },
    title: {
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '20px',
    },
    spinner: {
        margin: '20px 0',
    },
    description: {
        color: '#666',
        textAlign: 'center',
    },
};

export default AuthCallback;
