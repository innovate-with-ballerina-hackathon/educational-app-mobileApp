import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For the floating plus icon
import UploadForm from '../../components/uploadForm'; // Import the form component you'll create

const TutorUploadsScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const uploadedFiles = [
        { id: 1, title: 'Physics Notes', tags: ['Physics', 'Electromagnetism'], date: '2024-01-12' },
        { id: 2, title: 'Math Worksheets', tags: ['Math', 'Algebra'], date: '2024-02-05' },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Your Uploaded Files</Text>

            {/* List of uploaded files */}
            <ScrollView>
                {uploadedFiles.map((file) => (
                    <View key={file.id} style={styles.fileCard}>
                        <Text style={styles.fileTitle}>{file.title}</Text>
                        <Text style={styles.fileTags}>Tags: {file.tags.join(', ')}</Text>
                        <Text style={styles.fileDate}>Uploaded on: {file.date}</Text>
                    </View>
                ))}
            </ScrollView>

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
                        <UploadForm closeModal={toggleModal} />
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
