import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { useApp } from "../../context";

export const Summary = () => {
  const { name }: any = useApp();

  return (
    <Flex w="100%" h="100%" bgColor="#000">
      <Text as="h1" color="#fff">
        Olá nome que virá do useApp rs!
      </Text>
    </Flex>
  );
};
