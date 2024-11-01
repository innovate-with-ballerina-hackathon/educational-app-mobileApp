import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import { UserContext } from '../../App';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ProfileTab = () => {
    const userId = sessionStorage.getItem('id'); 
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const role = sessionStorage.getItem('role');

    console.log(role);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const endpoint = role === 'student'
                    ? `http://localhost:9091/users/student/${userId}`
                    : `http://localhost:9091/users/tutor/${userId}`;

                console.log(endpoint);
                
                const response = await axios.get(endpoint);
                setProfileData(response.data);
            } catch (error) {
                console.error("Error fetching profile data: ", error);
                Alert.alert("Error", "Unable to fetch profile data.");
            } finally {
                setLoading(false);
            }
        };
        
        fetchProfile();
    }, [role]);

    if (loading) {
        return <ActivityIndicator size="large" color="#4c8bf5" style={styles.loading} />;
    }

    if (!profileData) {
        return <Text style={styles.noData}>No profile data available.</Text>;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Profile Details</Text>
            </View>
            <View style={styles.card}>
                <MaterialIcons name="account-circle" size={80} color="#4c8bf5" style={styles.icon} />
                <Text style={styles.label}>First Name:</Text>
                <Text style={styles.value}>{profileData.firstName}</Text>
                <Text style={styles.label}>Last Name:</Text>
                <Text style={styles.value}>{profileData.lastName}</Text>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{profileData.email}</Text>
                
                {role === 'student' && profileData.subscribedCategory && (
                    <>
                        <Text style={styles.label}>Subscribed Category:</Text>
                        <Text style={styles.value}>{profileData.subscribedCategory}</Text>
                    </>
                )}
                {role === 'tutor' && (
                    <>
                        <Text style={styles.label}>Subject ID:</Text>
                        <Text style={styles.value}>{profileData.subjectSubjectId}</Text>
                        {profileData.experienceYears && (
                            <>
                                <Text style={styles.label}>Experience:</Text>
                                <Text style={styles.value}>{profileData.experienceYears} years</Text>
                            </>
                        )}
                        {profileData.price && (
                            <>
                                <Text style={styles.label}>Price:</Text>
                                <Text style={styles.value}>${profileData.price}</Text>
                            </>
                        )}
                    </>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingVertical: 30,
        backgroundColor: '#f0f9ff',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
    },
    header: {
        marginBottom: 20,
        padding: 15,
        borderRadius: 12,
        backgroundColor: 'linear-gradient(90deg, #6a11cb, #2575fc)',
        width: '100%',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
    },
    card: {
        width: '100%',
        padding: 20,
        borderRadius: 20,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 8,
    },
    icon: {
        alignSelf: 'center',
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        color: '#333333',
        fontWeight: '600',
        marginVertical: 5,
    },
    value: {
        fontSize: 18,
        color: '#4c8bf5',
        fontWeight: '500',
        marginBottom: 15,
    },
    loading: {
        marginTop: '50%',
    },
    noData: {
        fontSize: 16,
        color: '#888',
        alignSelf: 'center',
    },
});

export default ProfileTab;
