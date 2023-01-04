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
      <Link to="/"><Text fontWeight="bold">ACADEMIA</Text></Link>
      <Flex gap="10px">
        <Text  bgColor="transparent" p="5px">
          <Link to="/">Home</Link>
        </Text>
        <Text bgColor="transparent" p="5px">
          <Link to="/about">Sobre nós</Link>
        </Text>
        <Text  bgColor="transparent" p="5px">
          <Link to="/trainingDivision">Divisão de treinos</Link>
        </Text>
        <Text bgColor="transparent" p="5px">
          <Link to="/customTraining">Treino Personalizado</Link>
        </Text>
      </Flex>
    </Flex>
  );
};
