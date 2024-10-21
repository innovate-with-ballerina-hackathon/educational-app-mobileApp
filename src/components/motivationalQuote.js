import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const quotesData = [
    { quote: "The future depends on what you do today.", author: "Mahatma Gandhi" },
    { quote: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
    { quote: "Don’t watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
];

const MotivationalQuote = () => {
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * quotesData.length);
        const randomQuote = quotesData[randomIndex];
        setQuote(randomQuote.quote);
        setAuthor(randomQuote.author);
    }, []);

    return (
        <View style={styles.card}>
            <Text style={styles.quoteText}>"{quote}"</Text>
            <Text style={styles.authorText}>- {author}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    quoteText: {
        fontSize: 16,
        fontStyle: 'italic',
    },
    authorText: {
        fontSize: 14,
        textAlign: 'right',
        marginTop: 5,
        fontWeight: 'bold',
    },
});

export default MotivationalQuote;
