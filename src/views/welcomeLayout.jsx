import React from "react";
import { Typography, Box, Stack } from "@mui/material";

export const WelcomeLayout = ({ title, description, content }) => {
    return (
        <Stack
            justifyContent="space-evenly"
            spacing={6} // 6 is equivalent to gap={50} in Material-UI's spacing system
        >
            <Box>{content}</Box>
            <Stack spacing={2}>
                <Typography variant="h4">{title}</Typography>
                <Typography variant="body1">{description}</Typography>
            </Stack>
            <Box>{content}</Box>
        </Stack>
    );
};
