import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Flex,
  Input,
  Select,
} from "@chakra-ui/react";
import { useApp, useAuth } from "../../../context";
import { Imc } from "../../Chart/Imc";
import { Inputs } from "../../Inputs";

export const Quiz: React.FC = () => {
  const [quizIndex, setQuizIndex] = useState(0);
  const [showBiotypeDetails, setShowBiotypeDetails] = useState(false);

  const { newUserFlag, setNewUserFlag, user }: any = useAuth();

  const {
    userAnswers,
    saveUserPersonalInfo,
    userPersonalInfoModal,
    setPersonalInfoModal,
    handleAnswer,
  }: any = useApp();

  const quizSteps = [
    {
      id: 1,
      title: "Qual sua altura ?",
      description: "Insira seu peso e sua altura para calcularmos o seu IMC:",
      content: (
        <Flex direction="column" gap="40px">
          <Flex direction="column" gap="20px">
            <Inputs
              placeholder="Peso Ex.(76Kg)"
              title="Peso"
              type="weight"
              value={userAnswers?.weight}
            />
            <Inputs
              placeholder="Peso Ex.(1.72m)"
              title="Altura"
              type="height"
              value={userAnswers?.height}
            />
          </Flex>
          <Imc height={userAnswers.height} weight={userAnswers.weight} />
        </Flex>
      ),
    },
    {
      id: 2,
      title: "Malha há quanto tempo ?",
      description:
        "O tempo de academia é importante para calcularmos a intensidade e divisões dos treinos.",

      content: (
        <>
          <Text>Malha há quanto tempo?</Text>
          <Select
            onChange={(e: any) => handleAnswer(e, "workoutTime")}
            value={userAnswers.workoutTime}
            placeholder="Selecione"
          >
            <option value="Menos de 1 mês">Menos de 1 mês</option>
            <option value="Entre 1 - 6 meses">Entre 1 - 6 meses</option>
            <option value="Entre 6 meses e 1 ano">Entre 6 meses e 1 ano</option>
            <option value="Mais de 1 ano">Mais de 1 ano</option>
          </Select>
        </>
      ),
    },
    {
      id: 3,
      title: "Qual seu biotipo?",
      description:
        "O biotipo é importante para calcularmos as variações de treinos e dietas tendo em base a resposta que seu corpo dará.",
      content: (
        <>
          <Text>Qual seu biotipo?</Text>
          <Select
            value={userAnswers.biotype}
            variant="flushed"
            onChange={(e: any) => handleAnswer(e, "biotype")}
            placeholder="Selecione"
          >
            <option value="Ectomorfo">Ectomorfo</option>
            <option value="Endomorfo">Endomorfo</option>
            <option value="Mesomorfo">Mesomorfo</option>
          </Select>
          <Button
            onClick={() => {
              setShowBiotypeDetails(true);
            }}
          >
            sobre biotipo
          </Button>
          {showBiotypeDetails && <Flex bgColor="#ccc" borderRadius="20px" top="0" color="#fff" bottom="0" position="absolute" w="400px" h="500px">
            </Flex>}
        </>
      ),
    },
    {
      id: 4,
      title: "Faz aeróbico?",
      content: (
        <>
          <Text>Faz aeróbico?</Text>
          <Select
            value={userAnswers.makeAerobyc}
            title="Você pratica atividades aeróbias?"
            onChange={(e: any) => handleAnswer(e, "makeAerobyc")}
            placeholder="Selecione"
          >
            <option value="Sim">Sim</option>
            <option value="Não">Não</option>
          </Select>
        </>
      ),
      description:
        "Precisamos saber como você se considera em relação a academia. É necessário para darmos continuidade e passar seu treino da melhor maneira à você.",
    },
    {
      id: 5,
      title: "Fuma?",
      content: (
        <>
          <Text>Você fuma (Cannabis, Cigarro, Vape)?</Text>
          <Select
            onChange={(e: any) => handleAnswer(e, "smoke")}
            value={userAnswers.smoke}
            placeholder="Selecione"
          >
            <option value="Sim">Sim</option>
            <option value="Não">Não</option>
          </Select>
        </>
      ),
      description:
        "Precisamos saber você fuma, para prestarmos mais atenção aos exercícios passados, em relação aos de alta intensidade.",
    },
    {
      id: 6,
      title: "Bebe ?",
      content: (
        <>
          <Text>
            Você consome bebidas alcóolicas (Cerveja, Vinho, Vodka, etc...) ?
          </Text>
          <Select
            onChange={(e: any) => handleAnswer(e, "drinks")}
            value={userAnswers.drinks}
            placeholder="Selecione"
          >
            <option value="Sim">Sim, com frequencia</option>
            <option value="Casualmente">Sim, casual</option>
            <option value="Não">Entre 6 meses e 1 ano</option>
          </Select>
        </>
      ),
      description:
        "O motivo desta pergunta é basicamente ter uma noção para saber se os resultados que vão ser passados ao usuário, será condizente com seus hábitos alimentares!",
    },
    {
      id: 7,
      title: "Possui alergia à algum remédio ou suplemento ?",
      content: (
        <Inputs
          title="Você possui alguma alergia ?"
          placeholder="Alergia"
          type="alergy"
          value={userAnswers.alergy}
        />
      ),
      description:
        "Essa informação é de suma importância, já que há recomendações de alguns suplementos e medicamentos que ajudam durante os treinos. Ex: Creatina, Hmb, Cafeína",
    },
  ];

  const handleClick = (active: boolean) => {
    if (!active) {
      return setQuizIndex(quizIndex - 1);
    }

    if (active && quizIndex !== quizSteps.length) {
      setQuizIndex(quizIndex + 1);
    } else if (active && quizIndex === quizSteps.length) {
      saveUserPersonalInfo();
      setNewUserFlag(false);
    }
  };

  const checkButtonDisabled = (): boolean => {
    switch (quizIndex) {
      case 1:
        return !userAnswers.height || !userAnswers.weight;
      case 2:
        return !userAnswers.workoutTime;
      case 3:
        return !userAnswers.biotype;
      case 4:
        return !userAnswers.makeAerobyc;
      case 5:
        return !userAnswers.smoke;
      case 6:
        return !userAnswers.drinks;
      case 7:
        return !userAnswers.alergy;
      default:
        return false;
    }
  };

  return (
    <Modal
      isOpen={userPersonalInfoModal}
      onClose={() => setPersonalInfoModal(false)}
      onOverlayClick={() => {
        if (!newUserFlag) {
          setPersonalInfoModal(false);
        } else {
          return;
        }
      }}
    >
      <ModalOverlay />
      <ModalContent mx="20px" placeSelf="center">
        <ModalHeader as={Flex} flexDir="column" gap="12px">
          <Text as="h1">
            {quizIndex === 0 ? (
              <>Bem-vindo, {user?.name.split(" ")[0]}!</>
            ) : (
              <>
                Etapa {quizIndex} de {quizSteps.length}
              </>
            )}
          </Text>
          <Text as="p" fontWeight={300} fontSize="18px">
            {quizIndex === 0 ? (
              <>
                Antes de começarmos precisamos coletar alguns dados seus para te
                apresentar as melhores indicações de treinos e dietas.
              </>
            ) : (
              quizSteps[quizIndex - 1].description
            )}
          </Text>
        </ModalHeader>
        <ModalBody>
          {quizIndex === 0 ? <></> : quizSteps[quizIndex - 1].content}
        </ModalBody>
        <ModalFooter>
          {quizIndex !== 0 && quizIndex !== quizSteps.length && (
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleClick(false)}
            >
              Voltar
            </Button>
          )}
          <Button
            colorScheme="blue"
            isDisabled={checkButtonDisabled()}
            onClick={() => handleClick(true)}
          >
            {quizIndex == quizSteps.length ? <>Salvar</> : <>Próximo</>}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
