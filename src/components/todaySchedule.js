import React from "react";
import { Text, ScrollView, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Importing Material Icons
import { HEIGHT, WIDTH } from "../helpers/constants";

const todaySessions = [
    { id: 1, tutorName: "Tutor 1", subject: "Maths", time: "10:00 AM", duration: "1 hour" },
    { id: 2, tutorName: "Tutor 2", subject: "Physics", time: "11:00 AM", duration: "1 hour" },
    { id: 3, tutorName: "Tutor 3", subject: "Chemistry", time: "12:00 PM", duration: "1 hour" },
    { id: 4, tutorName: "Tutor 4", subject: "Biology", time: "01:00 PM", duration: "1 hour" },
    { id: 5, tutorName: "Tutor 5", subject: "Maths", time: "02:00 PM", duration: "1 hour" },
];

const subjectIcons = {
    Maths: "calculate",
    Physics: "hub",
    Chemistry: "science",  // You can use another icon if needed
    Biology: "biotech",
};

const TodaySchedule = () => {
    return (
        <View style={styles.sessionBox}>
            <Text style={styles.heading}>Today's Sessions</Text>
            {todaySessions.length > 0 ? (
                <ScrollView>
                    {todaySessions.map((session, index) => (
                        <View key={index} style={styles.sessionCard}>
                            {/* Left Section: Icon and Tutor/Subject */}
                            <View style={styles.leftSection}>
                                <Icon
                                    name={subjectIcons[session.subject] || "school"} // Default icon if subject not found
                                    size={30}
                                    color="#007bff"
                                    style={styles.iconStyle}
                                />
                                <View>
                                    <Text style={styles.tutorText}>{session.tutorName}</Text>
                                    <Text style={styles.infoText}>{session.subject}</Text>
                                </View>
                            </View>

                            {/* Right Section: Time and Duration */}
                            <View style={styles.rightSection}>
                                <Text style={styles.infoText}>{session.time}</Text>
                                <Text style={styles.infoText}>{session.duration}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            ) : (
                <Text style={styles.noSessionText}>No sessions scheduled for today</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    sessionBox: {
        padding: 10,
        backgroundColor: "#f0f0f0",
        marginBottom: 10,
        borderRadius: 10,
        height: HEIGHT * 0.4,
        width: WIDTH * 0.5
    },
    heading: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    sessionCard: {
        flexDirection: "row",
        backgroundColor: "#fff",
        padding: 10,
        marginBottom: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        justifyContent: "space-between",  // Space between left and right sections
    },
    leftSection: {
        flexDirection: "row",  // Icon and text side by side
        alignItems: "center",
    },
    rightSection: {
        justifyContent: "center",
        alignItems: "flex-end",  // Align text to the right
    },
    iconStyle: {
        marginRight: 10,  // Space between icon and text
    },
    tutorText: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 3,
    },
    infoText: {
        fontSize: 14,
        color: "#555",
    },
    noSessionText: {
        fontSize: 16,
        color: "#888",
    },
});

export default TodaySchedule;
