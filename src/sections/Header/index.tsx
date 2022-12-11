import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import bgImgHeader from "/bgImg.jpg";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <Flex
      style={{
        background: `url(${bgImgHeader})`,
        objectFit: "contain",
        backgroundPosition: "center",
      }}
      align="center"
      color="#fff"
      justifyContent="space-between"
      p="15px"
      h="15vh"
      w="100%"
    >
      <Text fontWeight="bold">ACADEMIA</Text>
      <Flex gap="10px">
        <Link to="/">Home</Link>
        <Link to="/about">Sobre nós</Link>
        <Link to="/trainingDivision">Divisão de treinos</Link>
      </Flex>
    </Flex>
  );
};
