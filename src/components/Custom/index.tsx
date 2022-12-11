import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
} from "@chakra-ui/react";

const createSliderMarks = (min: number, max: number, step: number) => {
  const marks = [];
  for (let i = min; i <= max; i += step) {
    marks.push(i);
  }
  return marks;
};

export const Custom = () => {
  const [sliderValue, setSliderValue] = useState("moderado");

  const moderationStatus = [
    "baixo",
    "moderado",
    "intenso",
    "muito intenso",
    "extremo",
  ];
  return (
    <Flex>
      {createSliderMarks(0, 4, 1).map((mark) => {
        return (
          <Text
            bgColor="#333"
            align="center"
            p="8px"
            borderRadius="5px"
            fontSize="13px"
            cursor="pointer"
            key={mark}
            fontWeight="300"
            color={
              sliderValue === moderationStatus[mark] ? "teal.500" : "white"
            }
            onClick={() => setSliderValue(moderationStatus[mark])}
          >
            {moderationStatus[mark]}
          </Text>
        );
      })}
    </Flex>
  );
};
