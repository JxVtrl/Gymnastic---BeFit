import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { useApp } from "../../context";

export const Summary = () => {
  const { name }: any = useApp();

  return (
    <Flex p="20px" w="100%" h="100%" bgColor="#000">
      <Text as="h1" color="#fff">
        Olá! Somos a academia Gymnastic e estamos aqui para te mostrar que
        conquistar aquele corpo que você quer pode ser mais fácil do que vocẽ
        imagina!
      </Text>
    </Flex>
  );
};
