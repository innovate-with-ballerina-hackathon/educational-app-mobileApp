import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView , ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For the floating plus icon
import UploadForm from '../../components/uploadForm'; // Import the form component you'll create
import axios from 'axios';
import { BACKEND_URL } from '../../helpers/constants';


const TutorUploadsScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const tutor_id = sessionStorage.getItem('id');
    console.log(">>>tutor_id", tutor_id);

    // Function to toggle the modal visibility
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const fetchUploadedFiles = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/users/tutor/${tutor_id}/documents`);
            setUploadedFiles(response.data);
        } catch (error) {
            console.error('Error fetching uploaded files:', error);
            alert('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUploadedFiles();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Your Uploaded Files</Text>

            {/* List of uploaded files */}
            {loading ? (
                <ActivityIndicator size="large" color="#007BFF" />
            ) : (
                <ScrollView>
                    {uploadedFiles.map((file) => (
                        <View key={file.id} style={styles.fileCard}>
                            <Text style={styles.fileTitle}>{file.title}</Text>
                            <Text style={styles.fileTags}>Tags: {file.category}</Text>
                            <Text style={styles.fileDate}>Description: {file.description}</Text>
                        </View>
                    ))}
                </ScrollView>
            )}

            {/* Floating Plus Button */}
            <TouchableOpacity style={styles.fab} onPress={toggleModal}>
                <Ionicons name="add-outline" size={32} color="white" />
            </TouchableOpacity>

            {/* Modal for Uploading Files */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={toggleModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {/* Pass handleFileUpload as a prop to the UploadForm */}
                        <UploadForm closeModal={toggleModal} authToken={"dfasfsdfsf"} onFileUpload={fetchUploadedFiles} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        width: '100vw',
        height: '95vh',
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    fileCard: {
        padding: 15,
        backgroundColor: '#f9f9f9',
        marginBottom: 10,
        borderRadius: 8,
        width: '50%',
        alignSelf: 'center'
    },
    fileTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    fileTags: {
        fontSize: 14,
        color: '#555',
        marginVertical: 5,
    },
    fileDate: {
        fontSize: 12,
        color: '#888',
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: '#007BFF',
        borderRadius: 50,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        width: '90%',
        borderRadius: 10,
        padding: 20,
    },
});

export default TutorUploadsScreen;
