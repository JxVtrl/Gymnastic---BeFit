import React, { useEffect, useState } from "react";
import {
  Button,
  Text,
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
} from "@chakra-ui/react";
import { validateEmail, validatePassword } from "../../helpers";
import { Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useApp, useAuth } from "../../context";
import errorCodes from "../../utils/firebase-error-codes.json";

export function Login() {
  const { handleLogin, LogError }: any = useAuth();
  const navigate = useNavigate();

  const findErrorIndex = (item: any) => {
    for (let i = 0; i < errorCodes.error.length; i++) {
      if (errorCodes.error[i].code === item.code) {
        if (errorCodes.error[i].message !== "")
          return errorCodes.error[i].message;
        else return item.code;
      }
    }
    return item.code;
  };

  return (
    <Flex
      h="100vh"
      w="100vw"
      overflow="hidden"
      bgColor="#0d1117"
      color="#c9d1d9"
    >
      <Flex
        justify="center"
        flexDir="column"
        maxW="310px"
        margin="0 auto"
        gap="20px"
        w="100%"
        overflow="hidden"
      >
        <Flex
          justify="center"
          align="center"
          flexDir="column"
          gap="35px"
          w="100%"
        >
          <i className="fa-solid fa-dumbbell fa-2xl" />

          <Text fontSize="2xl" fontWeight="light">
            Faça login no Trainee App
          </Text>
        </Flex>

        {LogError && (
          <Alert status="error" my="10px">
            <AlertIcon />
            <AlertTitle>Erro!</AlertTitle>
            <AlertDescription>{findErrorIndex(LogError)}</AlertDescription>
          </Alert>
        )}
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              handleLogin(values, () => navigate("/"));
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          {(props) => (
            <Form>
              <Flex
                direction="column"
                gap="20px"
                border="1px solid #21262d"
                p="16px"
                borderRadius="6px"
                w="100%"
              >
                <Field name="email" validate={validateEmail}>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.email && form.touched.email}
                    >
                      <FormLabel>E-mail</FormLabel>
                      <Input {...field} type="email" />
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="password" validate={validatePassword}>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.password && form.touched.password}
                    >
                      <FormLabel>Senha</FormLabel>
                      <Input {...field} type="password" />
                      <FormErrorMessage>
                        {form.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Button
                  mt={4}
                  colorScheme="teal"
                  isLoading={props.isSubmitting}
                  type="submit"
                  disabled={
                    props.values.email === "" || props.values.password === ""
                  }
                >
                  Fazer Login
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>

        <Flex
          direction="column"
          align="center"
          fontSize="14px"
          border="1px solid #21262d"
          p="16px"
          borderRadius="6px"
          w="100%"
        >
          <Text>
            Novo por aqui?{" "}
            <Link
              to="/register"
              style={{
                color: "#58a6ff",
              }}
            >
              Cadastre-se aqui
            </Link>
            .
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
