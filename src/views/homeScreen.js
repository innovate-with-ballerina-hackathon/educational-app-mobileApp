import React from 'react';
import { View, StyleSheet, ScrollView , Text } from 'react-native';
import TodaySchedule from '../components/todaySchedule';
import TaskSection from '../components/taskSection';
import MotivationalQuote from '../components/motivationalQuote';
import { ArticleCard, articleList } from '../components/articleCard';

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            {/* Left Section */}
            <View style={styles.leftSection}>
                <TodaySchedule />
                <Text style={styles.heading}>Today's picks</Text>
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    style={styles.articleScroll}>
                    <View style={styles.articleList}>
                        {articleList.map((item, index) => (
                            <View key={index} style={styles.articleItem}> 
                                <ArticleCard
                                    title={item.title}
                                    id={item.id}
                                    imageUrl={item.imageUrl}
                                />
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
            
            {/* Right Section for Task Section and Quote */}
            <View style={styles.rightSection}>
                <MotivationalQuote />
                <TaskSection />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#f9f9f9',
        paddingTop: 20,
    },
    leftSection: {
        flex: 1, // Takes equal space
        marginRight: 20,
    },
    articleScroll: {
        marginTop: 10,
    },
    articleList: {
        flexDirection: 'row',
    },
    articleItem: {
        marginRight: 10,
    },
    rightSection: {
        flex: 1, // Takes equal space with the left section
        justifyContent: 'flex-start',
        marginHorizontal: 20,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
        marginLeft:10
    },
});

export default HomeScreen;
