import React, { useState } from "react";
import { Flex, Text, Button, Select, Input } from "@chakra-ui/react";

export const Diet: React.FC = () => {

  const [height, setHeight] = useState<string>('')
  const [weight, setWeight] = useState<string>('')
  const [goal, setGoal] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGoal(e.target.value)
  }

  const calculateImc = () => {
    const imc = weight / (height * height)
    return imc.toFixed(2)
  }

  return (
    <Flex flexDir='column' w="100%" h="100%">
        <Text as='h1' fontWeight='400' m='15px auto'>Qual o seu objetivo?</Text>
      <Flex flexDir='column' gap='20px' w='80%' align='center' justify='center' m='10px auto'>
      <Select
        value={goal}
        onChange={handleChange}
        borderColor='#000'
        borderSize='3px'
        w='250px'
        variant='flushed'
        color='#000'
        placeholder='Selecione seu objetivo!'
>
  <option value='emagrecer'>Emagrecer</option>
  <option value='resistencia'>Resistência</option>
  <option value='hipertrofia'>Hipertrofia</option>
</Select>
{goal &&
<Flex gap='5px'>
<Input w='250px' onChange={e =>setHeight(e.target.value)} value={height} placeholder='Altura. Ex. (1.71)'/>
<Input w='250px' onChange={e => setWeight(e.target.value)} value={weight} placeholder='Peso atual. Ex. (75.6)'/>
</Flex>
}
{goal && height && weight &&
<Flex flexDir='column' gap='5px' align='center' justify='center'>
<Text as='h1' fontWeight='400' m='15px auto'>Seu IMC é: {calculateImc()}</Text>
<Text as='h1' fontWeight='400' m='15px auto'>Seu objetivo é: {goal}</Text>
</Flex>
}
</Flex>
<Flex position='absolute' bgColor='red' w='20px' bottom='0' right='0'></Flex>
</Flex>
  );
};
