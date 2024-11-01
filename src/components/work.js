import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // For icons

const tasksData = [
    { id: '1', title: 'Give Math Homework to Reilee', type: 'homework', checked: false },
    { id: '2', title: 'Math Revision with John', type: 'revision', checked: false },
    { id: '3', title: 'Math Questions prep', type: 'task', checked: false },
];

const Work = () => {
    const [tasks, setTasks] = useState(tasksData);

    const toggleTask = (id) => {
        const updatedTasks = tasks.map(task =>
            task.id === id ? { ...task, checked: !task.checked } : task
        );
        setTasks(updatedTasks);
    };

    const renderIcon = (type) => {
        switch (type) {
            case 'homework':
                return <MaterialIcons name="assignment" size={28} color="#4A90E2" />;
            case 'revision':
                return <MaterialIcons name="refresh" size={28} color="#F5A623" />;
            case 'task':
                return <MaterialIcons name="task-alt" size={28} color="#7ED321" />;
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Tasks</Text>
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.taskItem}>
                        <View style={styles.iconContainer}>
                            {renderIcon(item.type)}
                        </View>
                        <Text style={[styles.taskText, item.checked && styles.checkedText]}>
                            {item.title}
                        </Text>
                        <TouchableOpacity onPress={() => toggleTask(item.id)}>
                            <MaterialIcons
                                name={item.checked ? 'check-box' : 'check-box-outline-blank'}
                                size={28}
                                color={item.checked ? '#7ED321' : '#BDBDBD'}
                            />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 12,
        elevation: 3, // Adds a slight shadow for depth
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        flex: 1,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    taskItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    iconContainer: {
        marginRight: 15,
    },
    taskText: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    checkedText: {
        textDecorationLine: 'line-through',
        color: '#888',
    },
});

export default Work;
