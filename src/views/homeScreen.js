import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import TodaySchedule from '../components/todaySchedule';
import TaskSection from '../components/taskSection';
import MotivationalQuote from '../components/motivationalQuote';
import { ArticleCard, articleList } from '../components/articleCard';
import Work from '../components/work';

const HomeScreen = () => {
    const role = sessionStorage.getItem('role');
    return (
        <ScrollView style={styles.container}>
            {/* Top Section for Today's Schedule and Motivational Quotes */}
            <View style={styles.topSection}>
                {/* Left Section */}
                <View style={styles.leftSection}>
                    <TodaySchedule />
                </View>

                {/* Right Section for Quote and Task */}
                <View style={styles.rightSection}>
                    <MotivationalQuote />
                    {role === 'tutor' ? <Work/> : <TaskSection />}
                </View>
            </View>

            {/* Today's Picks Section - now at the bottom */}
            <View style={styles.bottomSection}>
                <Text style={styles.heading}>Today's Picks</Text>
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    style={styles.articleScroll}
                >
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
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        paddingTop: 20,
        width: '100vw',
        height: '100vh',
    },
    topSection: {
        flexDirection: 'row',
        marginBottom: 20,
        paddingHorizontal: 20,
        flex: 1, // Allow this section to grow
    },
    leftSection: {
        flex: 1, // Takes equal space
        marginRight: 20,
    },
    rightSection: {
        flex: 1, // Takes equal space with the left section
        justifyContent: 'flex-start',
    },
    bottomSection: {
        flex: 1, // Allow this section to grows
        marginHorizontal: 20,
        marginTop: 20,
    },
    articleScroll: {
    },
    articleList: {
        flexDirection: 'row',
    },
    articleItem: {
        marginRight: 10,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
});

export default HomeScreen;
