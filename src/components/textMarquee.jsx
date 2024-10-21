import {Marquee} from "@animatereactnative/marquee";
import React from 'react';

export const TextMarquee = () => {
    const equations = ['E = mc^2', 'F = ma', 'a^2 + b^2 = c^2', 'V = IR', 'd = vt', 'pV = nRT'];


const marquees = [
    {
        speed: 1,
        size:15
    },
    {
        speed: 2,
        size: 20
    },
    {
        speed: 3,
        size: 25
    }
]

return (
    <Vstack gap={5}>
        {marquees.map((marquee, index) => {
            return (
                <Marquee
                    key={index}
                    spacing={marquee.size * 2}
                    speed={marquee.speed}
                >
                    <Text fontSize={marquee.size} m={0} lineHeight={"xl"}>
                        {equations.sort(() => Math.random() - 0.5).join(' ')}
                    </Text>
                </Marquee>
            );
        })}
    </Vstack>
)
};