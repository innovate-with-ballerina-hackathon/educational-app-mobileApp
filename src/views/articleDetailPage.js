import { useContext, useEffect, useRef, useState } from "react";
import { WIDTH } from "../helpers/constants";
import { articleList } from "../components/articleCard";
import { Box, Heading, Image, Text } from "@gluestack-ui/themed";
import { UserContext } from "../../App";


export const ArticleDetailPage = ({ route}) => {
    const [articleId, setArticleId] = useState();
    const [article, setArticle ] = useState();
    const {role, subject} = useContext(UserContext);
    console.log('>>>>>>>>>>'+ role + subject);
    const ref = useRef();
    const width = WIDTH;
    useEffect(()=> {
        if(route.params?.id){
            setArticleId(route.params.id);
        }
    }, []);

    useEffect(()=> { 
        setArticle(articleList.find((o) => o.id === articleId));
    }, [articleId]);

    return (
        <Box
            width={width}
            height={width}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            m="$3"
        >
            <Heading>{article?.title}</Heading>
            <Box
                width={width * 0.8}
                height={width * 0.8}
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                m="$3"
            >
                <Image
                    alt="article image"
                    source={{ uri: article?.imageUrl ?? "https://tse2.mm.bing.net/th?id=OIP.Hxm4Wr6uccQwifp7HH7uYQHaE8&pid=Api&P=0&h=220"}}
                    style={{
                            width: WIDTH , // Adjust the width
                            height: WIDTH * 0.3, // Adjust the height
                        }}
                    opacity={0.8}
                />
                <Text>{article?.content}</Text>
            </Box>
        </Box>
        
    );
}