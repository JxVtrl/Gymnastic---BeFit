import { Header } from "../sections";
import { Flex } from "@chakra-ui/react";
import { Home } from '../pages'

export const LoginLayout = ({ children }: any) => {
  return <>{children}</>;
};

export const AppLayout = ({ children }: any) => {
  return (
    <Flex flexDir='column'>
      <Header />
      <Home />
    </Flex>
  );
};
