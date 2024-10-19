import { HStack, ScrollView, VStack } from "@gluestack-ui/themed";
import { Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { WIDTH } from "../helpers/constants";
import { ArticleCard, articleList } from "../components/articleCard";
import { useRef } from "react";

const HomeScreen = () => {
    const ref = useRef();
    console.log(">>>>>>articleList", articleList);
    return (
        <ScrollView>
            <VStack>
                <Carousel
                    ref={ref}
                    loop
                    width={WIDTH}
                    height={WIDTH * 0.5}
                    autoPlay={true}
                    data={articleList}
                    mode="normal"
                    scrollAnimationDuration={2000}
                    renderItem={({index, item }) => (
                        <View style={{ width: WIDTH, height: WIDTH * 0.5 }}>
                            <ArticleCard
                                title={item.title}
                                id={item.id}
                                imageUrl={item.imageUrl}
                            />
                        </View>
                    )}
                />
            </VStack>
        </ScrollView>
    );
};

export default HomeScreen;