import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet , TouchableOpacity } from 'react-native';
import MultiSelect from 'react-native-multiple-select'; // A popular library for multiple tag selection
import Icon from 'react-native-vector-icons/MaterialIcons'; // For the close icon
const availableTags = [
    { id: '1', name: 'Math' },
    { id: '2', name: 'Science' },
    { id: '3', name: 'Physics' },
    { id: '4', name: 'Chemistry' },
    { id: '5', name: 'Biology' },
];

const UploadForm = ({ closeModal }) => {
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

            {/* Tag Selection */}
            <MultiSelect
                items={availableTags}
                uniqueKey="id"
                onSelectedItemsChange={setSelectedTags}
                selectedItems={selectedTags}
                selectText="Pick Tags"
                searchInputPlaceholderText="Search Tags..."
                tagRemoveIconColor="#CCC"
                tagBorderColor="#CCC"
                selectedItemTextColor="#CCC"
                selectedItemIconColor="#CCC"
                itemTextColor="#000"
                displayKey="name"
                styleDropdownMenuSubsection={styles.multiSelectDropdown}
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
