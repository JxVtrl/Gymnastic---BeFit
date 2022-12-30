import React, { useState } from "react";
import { Flex, Text, Button, Select, useDisclosure } from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";
import QuizQuestions from "../../utils/quizJson.json";
import { useApp, useAuth } from "../../context";
import { IMC } from "../Modal/IMC";
import { ModalIMC } from "../Modal";

export const Diet: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleProfileGoal, userGoal }: any = useApp();
  const { user }: any = useAuth();

  const [imc, setImc] = useState<number>(0);
  const [height, setHeight] = useState<string | number>("");
  const [weight, setWeight] = useState<string | number>("");

  const calculateImc = (height: number | string, weight: number | string) => {
    const imc = Number(weight) / Math.pow(Number(height), 2);
    return imc.toFixed(2);
  };

  const options = [
    {
      id: 0,
      title: "Meu IMC",
      onClick: () => null,
      img: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      id: 1,
      title: "Minha dieta",
      img: "https://images.unsplash.com/photo-1561043433-aaf687c4cf04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      id: 2,
      title: "Meu treino",
      img: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
  ];

  return (
    <Flex flexDir="column" w="100%" align="center" maxW="310px" margin="0 auto">
      <Text as="h1" fontWeight="400" m="15px auto">
        Perfil do usuário
      </Text>

      <Select
        value={userGoal}
        onChange={(e) => handleProfileGoal(e.target.value)}
        borderColor="#000"
        w="250px"
        variant="flushed"
        color="#000"
        m="20px"
        placeholder="Selecione seu objetivo!"
      >
        
        <option value="emagrecer">
          {imc >= 25 ? "Emagrecer" : "Engordar"}
        </option>
        <option value="resistencia">Resistência</option>
        <option value="hipertrofia">Hipertrofia</option>
      </Select>

      {options.map((option) => (
        <Button
          key={option.id}
          onClick={option.onClick}
          w="100%"
          h="110px"
          m="10px auto"
          bgImg={`linear-gradient(180deg, rgba(9,9,121,0) 68%, rgba(0,0,0,1) 100%), url(${option.img})`}
          bgSize="cover"
          bgPosition="center"
          justifyContent="flex-start"
          alignItems="flex-end"
          p="12px"
          color="#fff"
          _hover={{ transform: "scale(1.05)" }}
        >
          <Flex>
            {option.title}
            {option.id === 0 && <></>}
          </Flex>
        </Button>
      ))}

      <Flex
        flexDir="column"
        gap="20px"
        w="80%"
        align="center"
        justify="center"
        m="10px auto"
      >
        {userGoal && user?.height && user?.weight && (
          <Flex flexDir="column" gap="5px" align="center" justify="center">
            <Text as="h1" fontWeight="400" m="15px auto">
              Seu IMC é: {calculateImc(user.height, user.weight)}
            </Text>
            <Text as="h1" fontWeight="400" m="15px auto">
              Seu objetivo é: {userGoal}
            </Text>
          </Flex>
        )}

        <ModalIMC isOpen={isOpen} onClose={onClose} />

        <Button
          w="50px"
          position="absolute"
          bottom="15%"
          right="10px"
          colorScheme="blue"
          variant="outline"
          onClick={onOpen}
        >
          <QuestionIcon />
        </Button>
      </Flex>
    </Flex>
  );
};
