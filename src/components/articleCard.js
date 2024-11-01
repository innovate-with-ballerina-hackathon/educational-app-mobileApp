import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const articleList = [
    {
        id: 1,
        title: "Studying Effectively",
        content: "Discover strategies that transform your study habits. From active recall and spaced repetition to the Pomodoro technique, learn how to maximize retention and understanding.",
        imageUrl: "https://images.pexels.com/photos/3807755/pexels-photo-3807755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        id: 2,
        title: "Math in Daily Life",
        content: "Explore the role of mathematics in daily activities, from budgeting and cooking to understanding statistics in the news. Math influences decision-making and problem-solving.",
        imageUrl: "https://images.pexels.com/photos/6256258/pexels-photo-6256258.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        id: 3,
        title: "Physics Simplified",
        content: "Delve into the fascinating world of physics and its laws governing motion, energy, and force. Understand Newton's laws and their relevance to everyday life and technology.",
        imageUrl: "https://images.pexels.com/photos/714698/pexels-photo-714698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        id: 4,
        title: "Chemistry of Cooking",
        content: "Uncover the chemistry behind your favorite recipes. Learn how chemical reactions transform ingredients and the importance of pH in food preparation.",
        imageUrl: "https://images.pexels.com/photos/28992229/pexels-photo-28992229/free-photo-of-delicious-fried-appetizer-with-lime-and-tomato.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        id: 5,
        title: "Biology Insights",
        content: "Explore life’s intricate systems, from cellular processes to ecosystems. Understand how biology helps us grasp health, disease, and environmental issues.",
        imageUrl: "https://images.pexels.com/photos/5063442/pexels-photo-5063442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        id: 6,
        title: "Robotics Today",
        content: "Explore how robots are changing our lives, from autonomous vehicles to AI-driven assistants. Consider the productivity and ethical implications of robotics.",
        imageUrl: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        id: 7,
        title: "Tech & Math",
        content: "Learn how mathematics underpins new technologies. From AI algorithms to engineering simulations, math is the backbone of modern innovations.",
        imageUrl: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        id: 8,
        title: "Chemistry Careers",
        content: "Explore diverse career paths in chemistry, from pharmaceuticals to environmental science. Discover the impact chemists have on society and sustainability.",
        imageUrl: "https://images.pexels.com/photos/8513382/pexels-photo-8513382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        id: 9,
        title: "Biotechnology Future",
        content: "Discover how biotechnology merges biology and technology to tackle global challenges in medicine, agriculture, and environmental science.",
        imageUrl: "https://images.pexels.com/photos/5726788/pexels-photo-5726788.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        id: 10,
        title: "Tech in Education",
        content: "Explore how technology is reshaping education through online learning and interactive apps, highlighting benefits and challenges in a digital learning environment.",
        imageUrl: "https://images.pexels.com/photos/4144222/pexels-photo-4144222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
];


export const ArticleCard = ({ title, id, imageUrl }) => {
    const navigate = useNavigate();

    return (
        <Box 
            onClick={() => navigate(`/article/${id}`)}
            sx={{ 
                cursor: 'pointer', 
                maxWidth: 345, 
                margin: 2 
            }}
        >
            <Card>
                <CardMedia
                    component="img"
                    height="150"
                    image={imageUrl || "https://tse2.mm.bing.net/th?id=OIP.Hxm4Wr6uccQwifp7HH7uYQHaE8&pid=Api&P=0&h=220"}
                    alt="article image"
                />
                <CardContent>
                    <Typography variant="h6" component="div">
                        {title}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}
