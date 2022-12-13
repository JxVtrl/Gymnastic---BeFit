import React from "react";
import { Flex, Text, Select } from "@chakra-ui/react";
import { useApp } from "../../context";

export const Selects = ({ title, type, children, valueSelect }: any) => {
  const { handleAnswer }: any = useApp();

  return (
    <Flex gap="10px" flexDir="column">
      <Text>{title}</Text>
      <Select
        defaultValue={'0'}
        value={valueSelect}
        variant="flushed"
        onChange={(e: any) => handleAnswer(e, type)}
      >
        <option value='0' selected disabled>
          Selecione
        </option>
        {children}
      </Select>
    </Flex>
  );
};
