// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // For icons

// const tasksData = [
//     { id: '1', title: 'Math Homework', type: 'homework', checked: false },
//     { id: '2', title: 'Science Revision', type: 'revision', checked: false },
//     { id: '3', title: 'English Task', type: 'task', checked: false },
// ];

// const TaskSection = () => {
//     const [tasks, setTasks] = useState(tasksData);

//     const toggleTask = (id) => {
//         const updatedTasks = tasks.map(task =>
//             task.id === id ? { ...task, checked: !task.checked } : task
//         );
//         setTasks(updatedTasks);
//     };

//     const renderIcon = (type) => {
//         switch (type) {
//             case 'homework':
//                 return <MaterialIcons name="assignment" size={28} color="#4A90E2" />;
//             case 'revision':
//                 return <MaterialIcons name="refresh" size={28} color="#F5A623" />;
//             case 'task':
//                 return <MaterialIcons name="task-alt" size={28} color="#7ED321" />;
//             default:
//                 return null;
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.heading}>Tasks</Text>
//             <FlatList
//                 data={tasks}
//                 keyExtractor={(item) => item.id}
//                 renderItem={({ item }) => (
//                     <View style={styles.taskItem}>
//                         <View style={styles.iconContainer}>
//                             {renderIcon(item.type)}
//                         </View>
//                         <Text style={[styles.taskText, item.checked && styles.checkedText]}>
//                             {item.title}
//                         </Text>
//                         <TouchableOpacity onPress={() => toggleTask(item.id)}>
//                             <MaterialIcons
//                                 name={item.checked ? 'check-box' : 'check-box-outline-blank'}
//                                 size={28}
//                                 color={item.checked ? '#7ED321' : '#BDBDBD'}
//                             />
//                         </TouchableOpacity>
//                     </View>
//                 )}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         padding: 15,
//         backgroundColor: '#fff',
//         borderRadius: 12,
//         elevation: 3, // Adds a slight shadow for depth
//         shadowColor: '#000',
//         shadowOpacity: 0.1,
//         shadowOffset: { width: 0, height: 2 },
//         shadowRadius: 8,
//     },
//     heading: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         color: '#333',
//         marginBottom: 15,
//     },
//     taskItem: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 20,
//         paddingVertical: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#E0E0E0',
//     },
//     iconContainer: {
//         marginRight: 15,
//     },
//     taskText: {
//         flex: 1,
//         fontSize: 16,
//         color: '#333',
//     },
//     checkedText: {
//         textDecorationLine: 'line-through',
//         color: '#888',
//     },
// });

// export default TaskSection;


import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import axios from 'axios';

const categoriesData = [
    { id: '1', title: 'Maths', value: 'MATHS' },
    { id: '2', title: 'Astro', value: 'ASTRO' },
    { id: '3', title: 'Physics', value: 'PHYSICS' },
    { id: '4', title: 'Chemistry', value: 'CHEMISTRY' },
    { id: '5', title: 'Geometry', value: 'GEOMETRY' },
    { id: '6', title: 'English', value: 'ENGLISH' },
    { id: '7', title: 'French', value: 'FRENCH' },
    { id: '8', title: 'German', value: 'GERMAN' },
    { id: '9', title: 'Biology', value: 'BIOLOGY' },
];

const TaskSection = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
    };

    const handleSubmit = async () => {
        if (!selectedCategory) {
            Alert.alert("Error", "Please select a category before submitting.");
            return;
        }

        const studentId = sessionStorage.getItem('id');

        try {
            const response = await axios.put(
                `http://localhost:9091/users/students/${studentId}/category`,
                selectedCategory.value, // Send the category as plain string
                {
                    headers: {
                        'Content-Type': 'text/plain' // Set content type
                    }
                }
            );

            if (response.status === 200) {
                Alert.alert("Success", "Category updated successfully!");
            }
        } catch (error) {
            console.error("Error updating category: ", error);
            Alert.alert("Error", "There was an issue updating the category.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Select Your Category</Text>
            <ScrollView style={styles.scrollView}>
                <FlatList
                    data={categoriesData}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.categoryItem}>
                            <TouchableOpacity 
                                onPress={() => handleSelectCategory(item)} 
                                style={styles.categoryButton}
                            >
                                <View style={[styles.checkbox, selectedCategory?.id === item.id && styles.checkedCheckbox]}>
                                    {selectedCategory?.id === item.id && (
                                        <MaterialIcons name="check" size={18} color="#fff" />
                                    )}
                                </View>
                                <Text style={[styles.categoryText, selectedCategory?.id === item.id && styles.checkedText]}>
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </ScrollView>
            <TouchableOpacity 
                style={styles.submitButton} 
                onPress={handleSubmit}
                disabled={!selectedCategory} // Disable if no category is selected
            >
                <Text style={styles.submitButtonText}>Submit Choice</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    scrollView: {
        flex: 1,
        marginBottom: 20,
    },
    categoryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    categoryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    categoryText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 10,
    },
    checkedText: {
        color: '#333',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#BDBDBD',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    checkedCheckbox: {
        backgroundColor: '#7ED321',
        borderColor: '#7ED321',
    },
    submitButton: {
        backgroundColor: 'dodgerblue',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default TaskSection;
