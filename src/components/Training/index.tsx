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
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { Effectivity } from "../Chart";
import { WorkoutCollection } from "../WorkoutCollection";

export const Training: React.FC = () => {
  return (
    <Flex p="20px" w="100%" direction="column" align="center" flexShrink={0}>
      <Text textAlign="center" fontSize="17px" fontWeight="700">
        Perfil de treino
      </Text>
      <Flex maxW='500px' direction="column" gap="20px" w='100%' flexShrink={0}>
        <Flex maxH='350px' justify='center' w='100%'>
          <Effectivity />
        </Flex>

        <Flex direction="column" w="100%" flexShrink={0}>
          <Text>Semana de treino de força</Text>
          <Flex>
            <UnorderedList
              display="flex"
              listStyleType="none"
              p="0"
              m="0"
              justifyContent="space-around"
              w="100%"
            >
              {["seg", "ter", "qua", "qui", "sex", "sab", "dom"].map((item) => (
                <ListItem
                  w="35px"
                  display="flex"
                  flexDir="column"
                  alignItems="center"
                >
                  <CheckCircleIcon />
                  {item}
                </ListItem>
              ))}
            </UnorderedList>
          </Flex>
        </Flex>

        <Flex direction="column" w="100%" flexShrink={0}>
          <Text>Semana de treino de resistência</Text>
          <Flex>
            <UnorderedList
              display="flex"
              listStyleType="none"
              p="0"
              m="0"
              justifyContent="space-around"
              w="100%"
            >
              {["seg", "ter", "qua", "qui", "sex", "sab", "dom"].map((item) => (
                <ListItem
                  w="35px"
                  display="flex"
                  flexDir="column"
                  alignItems="center"
                >
                  <CheckCircleIcon />
                  {item}
                </ListItem>
              ))}
            </UnorderedList>
          </Flex>
        </Flex>

        <Flex w="100%" flexShrink={0} direction='column'>
          <Text>Coleção de treinos</Text>
          <WorkoutCollection />
        </Flex>
      </Flex>
    </Flex>
  );
};
