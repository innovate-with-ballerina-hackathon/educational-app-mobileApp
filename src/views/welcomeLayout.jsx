import { Heading, Text, VStack, View } from "@gluestack-ui/themed";

export const welcomeLayout = ({ title, description, content }) => {
    return (
        <VStack
            justifyContent="space-evenly"
            gap={50}
        >
            <View>{content}</View>
            <VStack>
                <Heading>{title}</Heading>
                <Text>{description}</Text>
            </VStack>
            <View>{content}</View>
        </VStack>
    );
};
