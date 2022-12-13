import React, { useState } from "react";
import {
  Flex,
  Text,
  Button,
  Select,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";
import QuizQuestions from '../../utils/quizJson.json'

export const Diet: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [imc, setImc] = useState<number>(0);
  const [height, setHeight] = useState<string | number>("");
  const [weight, setWeight] = useState<string | number>("");
  const [goal, setGoal] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGoal(e.target.value);
  };

  const openModal = () => {
    alert("Em breve");
  };

  const calculateImc = (height: number | string, weight: number | string) => {
    const imc = Number(weight) / Math.pow(Number(height), 2);
    return imc.toFixed(2);
  };

  return (
    <Flex flexDir="column" w="100%">
      <Text as="h1" fontWeight="400" m="15px auto">
        Qual o seu objetivo?
      </Text>
      <Flex
        flexDir="column"
        gap="20px"
        w="80%"
        align="center"
        justify="center"
        m="10px auto"
      >
        <Select
          value={goal}
          onChange={handleChange}
          borderColor="#000"
          w="250px"
          variant="flushed"
          color="#000"
          placeholder="Selecione seu objetivo!"
        >
          <option value="emagrecer">Emagrecer</option>
          <option value="resistencia">Resistência</option>
          <option value="hipertrofia">Hipertrofia</option>
        </Select>
        {goal && (
          <Flex gap="5px">
            <Input
              w="250px"
              onChange={(e) => setHeight(e.target.value)}
              value={height}
              placeholder="Altura. Ex. (1.71)"
            />
            <Input
              w="250px"
              onChange={(e) => setWeight(e.target.value)}
              value={weight}
              placeholder="Peso atual. Ex. (75.6)"
            />
          </Flex>
        )}
        {goal && height && weight && (
          <Flex flexDir="column" gap="5px" align="center" justify="center">
            <Text as="h1" fontWeight="400" m="15px auto">
              Seu IMC é: {calculateImc(height, weight)}
            </Text>
            <Text as="h1" fontWeight="400" m="15px auto">
              Seu objetivo é: {goal}
            </Text>
          </Flex>
        )}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>IMC - O que significa?</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text as="p">
                O IMC é um cálculo simples que permite avaliar se a pessoa está
                dentro do peso que é considerado ideal para a sua altura. Também
                conhecido como Índice de Massa Corporal, o IMC é uma fórmula
                utilizada por vários profissionais de saúde, incluindo médicos,
                enfermeiros e nutricionistas, para saber, de uma forma rápida,
                se a pessoa precisa ganhar ou perder peso. Embora seja uma
                ferramenta muito comum, o IMC não é considerado a forma mais
                exata de avaliar o peso, já que não leva em consideração a
                composição corporal. Por isso, é comum que no caso de atletas
                (que possuem uma maior quantidade de massa muscular) seja
                aconselhado o uso de outras técnicas, como a bioimpedância, para
                uma avaliação mais detalhada do peso
              </Text>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
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
