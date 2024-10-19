import { Box, Card, Heading, Image, VStack } from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native";
import { WIDTH } from "../helpers/constants";
import { useNavigation } from "@react-navigation/native";


export const articleList = [
    {
        id: 1,
        title: "Article 1 test change",
        content: "This is the content of the first article",
        imageUrl:
            "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        id: 2,
        title: "Article 2",
        content: "This is the content of the second article",
        imageUrl:
            "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        id: 3,
        title: "Article 3",
        content: "This is the content of the third article",
        imageUrl:
            "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        id: 4,
        title: "Article 4",
        content: "This is the content of the fourth article",
        imageUrl:
            "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    }
]

export const ArticleCard = ({ title, id, imageUrl }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate('ArticleDetail', { id: id, title: title })}>
            <Card
                width={'10px'}
                height={80}
                backgroundColor="#ffffff"
                style={{ borderRadius: 10 }}
                m={"$3"}
                px="$0"
                >
                <VStack justifyContent="center" alignItems="center">
                    <Image
                        alt="article image"
                        source={{ uri: imageUrl ?? "https://tse2.mm.bing.net/th?id=OIP.Hxm4Wr6uccQwifp7HH7uYQHaE8&pid=Api&P=0&h=220" }}
                        style={{
                            width: '50%', // Adjust the width
                            height: 180, // Adjust the height
                            borderRadius: 10,   // Maintain the borderRadius
                        }}
                        opacity={0.8}
                        resizeMode="cover"
                    />
                    <Heading size="$xl" fontWeight={600}> {title}</Heading>
                </VStack>
            </Card>
        </TouchableOpacity>

    )
}