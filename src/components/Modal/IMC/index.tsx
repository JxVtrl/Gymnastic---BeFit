import React from "react";
import {
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

interface iIMC {
  isOpen: boolean;
  onClose: () => void;
}

export const IMC: React.FC<iIMC> = ({ isOpen, onClose }) => {
  return (
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
            enfermeiros e nutricionistas, para saber, de uma forma rápida, se a
            pessoa precisa ganhar ou perder peso. Embora seja uma ferramenta
            muito comum, o IMC não é considerado a forma mais exata de avaliar o
            peso, já que não leva em consideração a composição corporal. Por
            isso, é comum que no caso de atletas (que possuem uma maior
            quantidade de massa muscular) seja aconselhado o uso de outras
            técnicas, como a bioimpedância, para uma avaliação mais detalhada do
            peso
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
  );
};
