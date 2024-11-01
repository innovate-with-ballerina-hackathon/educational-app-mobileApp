import React, {useEffect, useState} from "react";
import { Text, ScrollView, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Importing Material Icons
import { HEIGHT, WIDTH } from "../helpers/constants";
import axios from 'axios';
import { BACKEND_URL } from "../helpers/constants";

const subjectIcons = {
    Maths: "calculate",
    Physics: "hub",
    Chemistry: "science",  
    Biology: "biotech",
};

const TodaySchedule = () => {
    const [todaySessions, setTodaySessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const tutor_id = sessionStorage.getItem('id');

    useEffect(() => {
        const fetchSessions = async () => {
            const today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth() + 1;  // Month is 0-indexed
            const day = today.getDate();

            try {
                const response = await axios.get(`${BACKEND_URL}/users/tutor/${tutor_id}/booked`,
                    {
                        params: {
                            year: year,
                            month: month,
                            day: day,
                        }
                    });
                const sessions = response.data;
                const formattedSessions = sessions.map((session) => {
                    const startingTime = new Date(
                        session.startingTime.year,
                        session.startingTime.month - 1, // month is 0-indexed
                        session.startingTime.day,
                        session.startingTime.hour,
                        session.startingTime.minute
                    )
                    const endingTime = new Date(
                        session.endingTime.year,
                        session.endingTime.month - 1, // month is 0-indexed
                        session.endingTime.day,
                        session.endingTime.hour,
                        session.endingTime.minute
                    )

                    const duration = Math.ceil((endingTime - startingTime) / (60000 * 60));  // Convert milliseconds to minutes

                    return {
                        id: session.sessionId,
                        time: startingTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        duration: `${duration} hour${duration > 1 ? 's' : ''}`,
                    };
                });

                setTodaySessions(formattedSessions);

            } catch (error) {
                console.error('Error fetching sessions:', error);
                alert('An error occurred. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchSessions();
    }, []);
        

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
                                    <Text style={styles.tutorText}>Session Id</Text>
                                    <Text style={styles.infoText}>{session.id}</Text>
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
        height: HEIGHT * 0.5,

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
