import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
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
];

export const ArticleCard = ({ title, id, imageUrl }) => {
    const navigation = useNavigation();

    return (
        <Box 
            onClick={() => navigation.navigate('ArticleDetail', { id: id, title: title })} 
            sx={{ 
                cursor: 'pointer', 
                maxWidth: 345, 
                margin: 2 
            }}
        >
            <Card>
                <CardMedia
                    component="img"
                    height="180"
                    image={imageUrl || "https://tse2.mm.bing.net/th?id=OIP.Hxm4Wr6uccQwifp7HH7uYQHaE8&pid=Api&P=0&h=220"}
                    alt="article image"
                />
                <CardContent>
                    <Typography variant="h5" component="div">
                        {title}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}
