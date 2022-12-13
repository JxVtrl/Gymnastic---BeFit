import { Flex } from "@chakra-ui/react";
import { UserQuiz } from "../../components";
import { Navigation } from "../Navigation";

export const Home = (): any => {
  return (
    <Flex>
      <Navigation />
      <UserQuiz />
    </Flex>
  );
};
