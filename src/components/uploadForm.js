import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import MultiSelect from 'react-native-multiple-select'; // A popular library for multiple tag selection
import Icon from 'react-native-vector-icons/MaterialIcons'; // For the close icon
const availableTags = [
    { id: '1', name: 'Math' },
    { id: '2', name: 'Science' },
    { id: '3', name: 'Physics' },
    { id: '4', name: 'Chemistry' },
    { id: '5', name: 'Biology' },
];

const UploadForm = ({ closeModal, onFileUpload }) => {
    const [title, setTitle] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [file, setFile] = useState(null);

    const pickDocument = async () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/pdf';

        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                console.log('Selected file:', file);
                setFile(file);
            }
        };

        input.click();
    };

    const handleUpload = () => {
        // Your logic for uploading to FTP server
        console.log("Title:", title);
        console.log("Tags:", selectedTags);
        console.log("File:", file);

        const newFile = {
            title: title,
            tags: selectedTags.map((tagId) => availableTags.find((tag) => tag.id === tagId).name),
            file: file,
            date: new Date().toISOString().split('T')[0]
        };

        onFileUpload(newFile); // Pass the new file to the parent component

        closeModal(); // Close modal after upload
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

            <MultiSelect
                items={availableTags}
                uniqueKey="id"
                onSelectedItemsChange={setSelectedTags}
                selectedItems={selectedTags}
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
});

export default UploadForm;
