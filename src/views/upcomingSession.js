// import React from 'react';
// import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

// const upcomingSessions = [
//   {
//     id: '1',
//     tutorName: 'Emily Johnson',
//     subject: 'Mathematics',
//     date: '2024-10-25',
//     time: '10:00 AM',
//   },
//   {
//     id: '2',
//     tutorName: 'Michael Brown',
//     subject: 'Physics',
//     date: '2024-10-26',
//     time: '11:00 AM',
//   },
//   {
//     id: '3',
//     tutorName: 'Emily Johnson',
//     subject: 'Chemistry',
//     date: '2024-10-27',
//     time: '02:00 PM',
//   },
// ];

// const UpcomingSessions = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Upcoming Sessions</Text>
//       <FlatList
//         data={upcomingSessions}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.sessionCard}>
//             <Text style={styles.sessionText}>Tutor: {item.tutorName}</Text>
//             <Text style={styles.sessionText}>Subject: {item.subject}</Text>
//             <Text style={styles.sessionText}>Date: {item.date}</Text>
//             <Text style={styles.sessionText}>Time: {item.time}</Text>
//             <TouchableOpacity style={styles.button}>
//                 <Text> Join </Text>
//               </TouchableOpacity>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#f5f5f5',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   sessionCard: {
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 8,
//     marginVertical: 8,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 1.41,
//     elevation: 2,
//   },
//   sessionText: {
//     fontSize: 16,
//     marginBottom: 4,
//   },
//   button: {
//     marginTop: 20,
//     backgroundColor: 'dodgerblue',
//     paddingVertical: 10,  // Adjusts the vertical padding
//     paddingHorizontal: 20,  // Adjusts the horizontal padding for the text
//     borderRadius: 5,
//     alignSelf: 'center',
//   },
// });

// export default UpcomingSessions;


import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import moment from 'moment';
import { UserContext } from '../../App';

const UpcomingSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const studentId = sessionStorage.getItem('id');
  const role = sessionStorage.getItem('role');

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const sessionResponse = await axios.get(`http://localhost:9091/users/sessions/${studentId}`);
        const sessionData = await Promise.all(sessionResponse.data.map(async (session) => {
          const startTime = moment(`${session.startingTime.year}-${session.startingTime.month}-${session.startingTime.day} ${session.startingTime.hour}:${session.startingTime.minute}:${session.startingTime.second}`).format('YYYY-MM-DD HH:mm');
          const endTime = moment(`${session.endingTime.year}-${session.endingTime.month}-${session.endingTime.day} ${session.endingTime.hour}:${session.endingTime.minute}:${session.endingTime.second}`).format('YYYY-MM-DD HH:mm');
          
          const tutorResponse = await axios.post(
            'http://localhost:9090',
            {
              query: `
                query {
                  tutorById(tutorId: ${session.tutorTutorId}) {
                    id
                    firstName
                    lastName
                    subject
                  }
                }
              `,
            },
            {
              headers: {
                userId: studentId,
                userRole: role,
              },
            }
          );

          const tutor = tutorResponse.data.data.tutorById;
          const tutorFullName = `${tutor.firstName} ${tutor.lastName}`;
          
          return {
            id: session.sessionId.toString(),
            tutorName: tutorFullName,
            subject: tutor.subject,
            startTime,
            endTime,
            status: session.status,
          };
        }));
        
        setSessions(sessionData);
      } catch (error) {
        console.error("Error fetching sessions or tutor data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [studentId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Sessions</Text>
      <FlatList
        data={sessions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.sessionCard}>
            <Text style={styles.tutorName}>{item.tutorName}</Text>
            <Text style={styles.subject}>{item.subject}</Text>
            <View style={styles.timeContainer}>
              <Text style={styles.timeLabel}>Start:</Text>
              <Text style={styles.timeValue}>{item.startTime}</Text>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.timeLabel}>End:</Text>
              <Text style={styles.timeValue}>{item.endTime}</Text>
            </View>
            <Text style={styles.status}>Status: {item.status}</Text>
            {/* <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Join</Text>
            </TouchableOpacity> */}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#E8F5E9',  // Light green background
    width: '100vw',
    height: '100vh',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#388E3C',  // Darker green for the title
    textAlign: 'center',
    marginBottom: 16,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sessionCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',  // Green accent
  },
  tutorName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2E7D32',  // Dark green for tutor name
  },
  subject: {
    fontSize: 16,
    fontWeight: '500',
    color: '#616161',  // Gray for the subject text
    marginBottom: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  timeLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#455A64',  // Darker gray for labels
  },
  timeValue: {
    fontSize: 16,
    marginLeft: 6,
    color: '#757575',  // Gray for time values
  },
  status: {
    fontSize: 16,
    color: '#0288D1',  // Blue for status
    marginTop: 10,
    fontWeight: '500',
  },
  button: {
    marginTop: 16,
    backgroundColor: '#4CAF50',  // Green button color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default UpcomingSessions;


