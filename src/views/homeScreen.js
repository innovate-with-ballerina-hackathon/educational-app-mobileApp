import { Text, View , ScrollView} from "react-native";
import { WIDTH } from "../helpers/constants";
import { ArticleCard, articleList } from "../components/articleCard";
import React from "react";

const HomeScreen = () => {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{display:'flex', flexDirection:'row'}}>
                {articleList.map((item, index) => (
                    <View key={index} > 
                        <ArticleCard
                            title={item.title}
                            id={item.id}
                            imageUrl={item.imageUrl}
                        />
                    </View>
                ))}
        </View>
        </ScrollView>
        
    );
};

export default HomeScreen;