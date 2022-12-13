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
import { useApp, useAuth } from "../../context";
import { Imc } from "../../components/Chart/Imc";
import { Selects } from "../Selects";
import { Inputs } from "../Inputs";

export const UserQuiz: React.FC = () => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);

  const { newUserFlag, setNewUserFlag, user }: any = useAuth();

  const { userAnswers, handleAnswer }: any = useApp();

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
        <Selects
          title="Malha há quanto tempo?"
          type="workoutTime"
          valueSelect={userAnswers.workoutTime}
        >
          <option value="Menos de 1 mês">Menos de 1 mês</option>
          <option value="Entre 1 - 6 meses">Entre 1 - 6 meses</option>
          <option value="Entre 6 meses e 1 ano">Entre 6 meses e 1 ano</option>
          <option value="Mais de 1 ano">Mais de 1 ano</option>
        </Selects>
      ),
    },
    {
      id: 3,
      title: "Qual seu biotipo ?",
      description:
        "O biotipo é importante para calcularmos as variações de treinos e dietas tendo em base a resposta que seu corpo dará.",
      content: (
        <Selects
          title="Qual seu biotipo ?"
          type="biotype"
          valueSelect={userAnswers.biotype}
        >
          <option value="Ectomorfo">Ectomorfo</option>
          <option value="Endomorfo">Endomorfo</option>
          <option value="Mesomorfo">Mesomorfo</option>
        </Selects>
      ),
    },
    {
      id: 4,
      title: "Faz aeróbico ?",
      content: (
        <Selects
          valueSelect={userAnswers.makeAerobyc}
          title="Você pratica atividades aeróbias ?"
          type="makeAerobyc"
        >
          <option value="Sim">Sim</option>
          <option value="Não">Não</option>
        </Selects>
      ),
      description:
        "Precisamos saber como você se considera em relação a academia. É necessário para darmos continuidade e passar seu treino da melhor maneira à você.",
    },
    {
      id: 5,
      title: "Fuma ?",
      content: (
        <Selects
          title="Você fuma (Cannabis, Cigarro, Vape) ?"
          type="smoke"
          valueSelect={userAnswers.smoke}
        >
          <option value="Sim">Sim</option>
          <option value="Não">Não</option>
        </Selects>
      ),
      description:
        "Precisamos saber você fuma, para prestarmos mais atenção aos exercícios passados, em relação aos de alta intensidade.",
    },
    {
      id: 6,
      title: "Bebe ?",
      content: (
        <Selects
          title="Você consome bebidas alcóolicas ?"
          type="drinks"
          valueSelect={userAnswers.drinks}
        >
          <option value="Sim">Sim, com frequencia</option>
          <option value="Casualmente">Sim, casual</option>
          <option value="Não">Entre 6 meses e 1 ano</option>
        </Selects>
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
    if (active && quizIndex !== quizSteps.length) {
      setQuizIndex(quizIndex + 1);
    } else setQuizIndex(quizIndex - 1);
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
    return false;
  };

  return (
    <Modal isOpen={newUserFlag} onClose={() => setNewUserFlag(false)}>
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
          {quizIndex !== 0 && (
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
            mr={3}
            onClick={() => handleClick(true)}
          >
            {quizIndex == quizSteps.length - 1 ? <>Salvar</> : <>Próximo</>}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
