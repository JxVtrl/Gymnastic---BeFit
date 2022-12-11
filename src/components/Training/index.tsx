import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Box,
} from "@chakra-ui/react";

export const Training: React.FC = () => {

    const possibleModerations = ['leve', 'moderado', 'intenso', 'muito intenso']

    const [sliderValue, setSliderValue] = useState(0);

    const labelStyles = {
        mt: "2",
        ml: "-2.5",
        fontSize: "sm",
    };

  return (
    <Flex flexDir="column" p="20px" w="100%">
      <Text fontSize='15px' fontWeight="400">Intensidade de treino</Text>
      <Box w="100%" pt={6} pb={2}>
        <Slider
          w="200px"
          aria-label="slider-ex-6"
          colorScheme='teal'
          min={0}
          max={4}
          onChange={(val) => setSliderValue(val)}
        >
          <SliderMark value={25} {...labelStyles}>
            25%
          </SliderMark>
          <SliderMark value={50} {...labelStyles}>
            50%
          </SliderMark>
          <SliderMark value={75} {...labelStyles}>
            75%
          </SliderMark>
          <SliderMark
            value={sliderValue}
            textAlign="center"
            bg="blue.500"
            color="white"
            mt="-10"
            ml="-5"
            w="10"
          >
            {sliderValue}
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>
    </Flex>
  );
};
