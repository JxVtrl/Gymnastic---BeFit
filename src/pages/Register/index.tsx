import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { Field, Form, Formik } from "formik";
import { useAuth } from "../../context";
import {
  validateName,
  validateConfirm,
  validatePassword,
} from "../../helpers";
import errorCodes from "../../utils/firebase-error-codes.json";

export function Register() {
  const { handleRegister, LogError, usernameAvailable, emailAvailable }: any =
    useAuth();
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const findErrorIndex = (item: any) => {
    for (let i = 0; i < errorCodes.error.length; i++) {
      if (errorCodes.error[i].code === item.code) {
        if (errorCodes.error[i].message !== "")
          return errorCodes.error[i].message;
        else return item.code;
      }
    }
    return null;
  };

  async function validateEmail(value: string) {
    if (!value) {
      return "E-mail é obrigatório";
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
      return "E-mail inválido";
    }

    const result = await emailAvailable(value);
    if (!result) return "E-mail já existe";
    return null;
  }

  async function validateUsername(value: string) {
    if (!value) {
      return "Nome de usuário é obrigatório";
    } else if (value.length < 3) {
      return "Nome de usuário deve ter no mínimo 3 caracteres";
    } else if (value.length > 20) {
      return "Nome de usuário deve ter no máximo 20 caracteres";
    } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
      return "Nome de usuário deve conter apenas letras e números";
    }

    const result = await usernameAvailable(value);
    if (!result) return "Nome de usuário já existe";
    return null;
  }

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
            Faça registro no Trainee App
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
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirm: "",
            username: "",
          }}
          onSubmit={(values, actions) => {
            if (step === 0) {
              setStep(1);
              actions.setSubmitting(false);
            } else {
              setTimeout(() => {
                handleRegister(values, () => navigate("/"));
                actions.setSubmitting(false);
              }, 1000);
            }
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
                {step === 0 ? (
                  <>
                    <Field name="name" validate={validateName}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={form.errors.name && form.touched.name}
                        >
                          <FormLabel>Nome</FormLabel>
                          <Input
                            {...field}
                            type="name"
                            placeholder="Insira seu nome"
                          />
                          <FormErrorMessage>
                            {form.errors.name}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="username" validate={validateUsername}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.username && form.touched.username
                          }
                        >
                          <FormLabel>Username</FormLabel>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Insira seu nome de usuário"
                          />
                          <FormErrorMessage>
                            {form.errors.username}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </>
                ) : step === 1 ? (
                  <>
                    <Field name="email" validate={validateEmail}>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={form.errors.email && form.touched.email}
                        >
                          <FormLabel>E-mail</FormLabel>
                          <Input
                            {...field}
                            type="email"
                            placeholder="Insira seu e-mail"
                          />
                          <FormErrorMessage>
                            {form.errors.email}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field
                      name="password"
                      validate={(value: string) => {
                        validatePassword(value);
                        validateConfirm(props.values.confirm, value);
                      }}
                    >
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.password && form.touched.password
                          }
                        >
                          <FormLabel>Senha</FormLabel>
                          <Input
                            {...field}
                            type="password"
                            placeholder="Insira sua senha"
                          />
                          <FormErrorMessage>
                            {form.errors.password}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field
                      name="confirm"
                      validate={(value: string) =>
                        validateConfirm(value, props.values.password)
                      }
                    >
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.confirm &&
                            form.touched.confirm &&
                            form.errors.confirm !== form.values.password
                          }
                        >
                          <FormLabel>Confirmar Senha</FormLabel>
                          <Input
                            {...field}
                            type="password"
                            placeholder="Confirme sua senha"
                          />
                          <FormErrorMessage>
                            {form.errors.confirm}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </>
                ) : (
                  <></>
                )}

                <Flex justify="center" align="center" gap="5px">
                  {step === 1 && (
                    <Button
                      w="100%"
                      mt={4}
                      colorScheme="teal"
                      variant="outline"
                      onClick={() => setStep(0)}
                    >
                      Voltar
                    </Button>
                  )}

                  <Button
                    mt={4}
                    colorScheme="teal"
                    isLoading={props.isSubmitting}
                    type="submit"
                    w="100%"
                    disabled={
                      step === 0
                        ? props.values.name === "" ||
                          props.values.username === "" ||
                          props.values.username.length < 3 ||
                          props.errors.username !== undefined ||
                          props.errors.name !== undefined
                        : step === 1
                        ? props.values.email === "" ||
                          props.values.password === "" ||
                          props.values.confirm === "" ||
                          props.values.password.length < 6 ||
                          props.values.confirm.length < 6 ||
                          props.values.password !== props.values.confirm ||
                          props.errors.password !== undefined ||
                          props.errors.confirm !== undefined ||
                          props.errors.email !== undefined
                        : false
                    }
                  >
                    {step === 0 ? "Próximo" : "Registrar"}
                  </Button>
                </Flex>
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
            Já tem conta?{" "}
            <Link
              to="/login"
              style={{
                color: "#58a6ff",
              }}
            >
              Logue-se aqui
            </Link>
            .
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
