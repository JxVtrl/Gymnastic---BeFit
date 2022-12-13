import React from "react";
import { Input, Flex, Text } from "@chakra-ui/react";
import { useApp } from "../../context";

export const Inputs = ({ title, type, placeholder, valueSelect }: any) => {
  const { userAnswers, handleAnswer }: any = useApp();

  return (
    <Flex gap="10px" flexDir="column">
      <Text>{title}</Text>
      <Input
        value={valueSelect}
        onChange={(e: any) => {
          handleAnswer(e, type);
        }}
        placeholder={placeholder}
      />
    </Flex>
  );
};
