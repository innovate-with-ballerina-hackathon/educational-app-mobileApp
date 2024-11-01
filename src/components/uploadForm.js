import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity , ActivityIndicator } from 'react-native';
import MultiSelect from 'react-native-multiple-select'; // A popular library for multiple tag selection
import Icon from 'react-native-vector-icons/MaterialIcons'; // For the close icon
import axios from 'axios';
import { BACKEND_URL } from '../helpers/constants';

const availableTags = [
    { id: '1', name: 'ASTRO' },
    { id: '2', name: 'PHYSICS' },
    { id: '3', name: 'CHEMISTRY' },
    { id: '4', name: 'GEOMETRY' },
    { id: '5', name: 'ENGLISH' },
    { id: '6', name: 'FRENCH' },
    { id: '7', name: 'GERMAN' },
    { id: '8', name: 'BIOLOGY' },
];

const UploadForm = ({ closeModal, authToken , onFileUpload }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedTag, setSelectedTag] = useState([]);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);


    const pickDocument = async () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/pdf';

        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                setFile(file);
            }
        };

        input.click();
    };

    const handleUpload = async () => {
        if (!title || !file || !description || !selectedTag) {
            
            alert('Please fill all fields and select a file');
            return;
        }

        const selected = availableTags.find((tag) => tag.id === selectedTag[0])
        const formData = new FormData();
        formData.append('text_file', file);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', selected.name);	 //put date as well

        setLoading(true);
        
        try{
            const response = await axios.post(`${BACKEND_URL}/users/uploadFile`, formData, {
                headers: {
                    'Authorization': authToken,
                    "Content-Type": "multipart/form-data",
                },
                params: {
                    tutorId: 1, 
                },
            });

            onFileUpload();
            closeModal();
        } catch(error){
            console.log(error);
            alert('Error uploading file');
        } finally {
            setLoading(false);
        }

    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Upload New File</Text>

            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Icon name="close" size={24} color="black" />
            </TouchableOpacity>

            {/* Title Input */}
            <TextInput
                style={styles.input}
                placeholder="Enter Title"
                value={title}
                onChangeText={setTitle}
            />

            <TextInput style={styles.input} placeholder="Enter Description" value={description} onChangeText={setDescription} />

            <MultiSelect
                items={availableTags}
                uniqueKey="id"
                onSelectedItemsChange={setSelectedTag}
                selectedItems={selectedTag}
                single={true}
                selectText="Pick Tags"
                searchInputPlaceholderText="Search Tags..."
                tagRemoveIconColor="#FF4D4D" // Light Red for remove icon
                tagBorderColor="#4CAF50" // Green for tag border
                selectedItemTextColor="#007BFF" // Blue for selected item text
                selectedItemIconColor="#4CAF50" // Green for selected item checkmark
                itemTextColor="#333" // Dark Gray for item text
                displayKey="name"
                styleDropdownMenuSubsection={styles.multiSelectDropdown}
                searchInputStyle={{ color: '#333' }} // Dark gray for the search input
                submitButtonColor="#007BFF" // Blue for submit button
                submitButtonText="Confirm"
            />


            {/* PDF Upload */}
            <View style={styles.fileUploadSection}>
                <Button title="Pick a PDF file" onPress={pickDocument} />
                {file && <Text>Selected File: {file.name}</Text>}
            </View>

            {/* Submit Button */}
            <Button title="Upload" onPress={handleUpload} />

            {loading &&  (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#007BFF" />
                    <Text style={styles.loadingText}>Uploading file...</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 15,
        borderRadius: 8,
    },
    multiSelectDropdown: {
        padding: 10,
        marginBottom: 15,
    },
    fileUploadSection: {
        marginBottom: 15,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    loadingContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
    },
});

export default UploadForm;
