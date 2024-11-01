import { useContext, useEffect, useState } from "react";
import { WIDTH } from "../helpers/constants";
import { articleList } from "../components/articleCard";
import { Box, Typography, CardMedia } from "@mui/material";
import { UserContext } from "../../App";
import { useParams } from "react-router-dom";

export const ArticleDetailPage = () => {
    const [article, setArticle] = useState();
    const { role, subject } = useContext(UserContext);
    const { id } = useParams();
    
    useEffect(() => { 
        setArticle(articleList.find((o) => o.id === parseInt(id)));
    }, [id]);

    return (
        <Box
            width='100vw'
            height='100vh'
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            m={3} // Material-UI spacing system
            sx={{ bgcolor: '#f5f5f5', borderRadius: '8px', boxShadow: 2 }} // Background and shadow for aesthetic appeal
        >
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 1 }}> {/* Reduced bottom margin */}
                {article?.title}
            </Typography>
            <Box
                width={WIDTH > 600 ? WIDTH * 0.6 : WIDTH * 0.9} // Responsive width
                display="flex"
                flexDirection="column"
                alignItems="center"
                m={3}
            >
                <CardMedia
                    component="img"
                    alt="article image"
                    image={article?.imageUrl ?? "https://tse2.mm.bing.net/th?id=OIP.Hxm4Wr6uccQwifp7HH7uYQHaE8&pid=Api&P=0&h=220"}
                    sx={{
                        width: '100%', // Use full width of the container
                        maxHeight: '300px', // Limit max height for aesthetics
                        objectFit: 'cover', // Keep aspect ratio
                        borderRadius: '8px',
                        mb: 2 // Margin below the image
                    }}
                />
                <Typography variant="body1" sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                    {article?.content}
                </Typography>
            </Box>
        </Box>
    );
};
