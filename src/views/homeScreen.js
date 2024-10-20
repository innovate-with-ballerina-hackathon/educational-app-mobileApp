import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import TodaySchedule from '../components/todaySchedule';
import TaskSection from '../components/taskSection';
import MotivationalQuote from '../components/motivationalQuote';
import { ArticleCard, articleList } from '../components/articleCard';
import { HEIGHT } from '../helpers/constants';

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            {/* Top Section for Today's Schedule and Motivational Quotes / Task Section */}
            <View style={styles.topSection}>
                {/* Left Section */}
                <View style={styles.leftSection}>
                    <TodaySchedule />
                </View>
                
                {/* Right Section for Quote and Task */}
                <View style={styles.rightSection}>
                    <MotivationalQuote />
                    <TaskSection />
                </View>
            </View>

            {/* Bottom Section for Articles */}
            <View style={styles.bottomSection}>
                <Text style={styles.heading}>Today's Picks</Text>
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        paddingTop: 20,
    },
    topSection: {
        flex: 4, // Occupies 2/3 of the screen
        flexDirection: 'row',
        // marginBottom: 20,
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
        flex: 3, // Occupies 1/3 of the screen
        marginHorizontal: 20,
    },
    articleScroll: {
        // marginTop: 10,
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
        // marginBottom: 10,
    },
});

export default HomeScreen;
