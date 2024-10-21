import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../App';

const TutorList = () => {  
  const role = useContext(UserContext);
  const navigation = useNavigation();
  const [tutors, setTutors] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchTutors();
  }, []);

  // print Role
  console.log(role.role);
  const fetchTutors = async () => {
    try {
      const response = await fetch('http://localhost:9090', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'userId': 1,
          'userRole': role.role,
        },
        body: JSON.stringify({
          query: `
            query {
              tutors {
                id
                firstName
                lastName
                subject
                price
                experienceYears
              }
            }
          `
        })
      });
      const result = await response.json();
      if (result.data && result.data.tutors) {
        const data = result.data.tutors.map(tutor => ({
          id: tutor.id,
          name: `${tutor.firstName} ${tutor.lastName}`,
          subject: tutor.subject,
          hourlyPay: tutor.price,
          qualifications: tutor.experienceYears + " years of experience",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s",
          bio: tutor.bio,
        }));
        setTutors(data);
        setFilteredTutors(data);
      } else {
        console.error('No tutors found in response:', result);
      }
    } catch (error) {
      console.error('Error fetching tutors:', error);
    }
  };

  const filterTutors = (text) => {
    setSearch(text);
    const filteredData = tutors.filter((tutor) => 
      tutor.name.toLowerCase().includes(text.toLowerCase()) ||
      tutor.subject.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredTutors(filteredData);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by subject or name"
        value={search}
        onChangeText={filterTutors}
      />
      <FlatList
        data={filteredTutors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image 
              source={{ uri: item.image }} 
              style={styles.image} 
            />
            <View style={styles.detailsContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('TutorDetail', { tutor: item })}>
                <Text style={styles.name}>{item.name}</Text>
              </TouchableOpacity>
              <Text style={styles.subject}>Subject: {item.subject}</Text>
              <Text style={styles.fee}>Hourly Pay: ${item.hourlyPay}</Text>
              <Text style={styles.qualifications}>Qualifications: {item.qualifications}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f5f5f5',
    },
    searchBar: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      paddingLeft: 10,
      marginBottom: 20,
    },
    card: {
      backgroundColor: '#fff',
      padding: 20,
      marginBottom: 10,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 2,
      flexDirection: 'row',
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginRight: 15,
    },
    detailsContainer: {
      flex: 1,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    subject: {
      fontSize: 16,
      marginVertical: 5,
    },
    fee: {
      fontSize: 16,
      color: 'green',
    },
    qualifications: {
      fontSize: 14,
      color: 'gray',
    },
  });

export default TutorList;
