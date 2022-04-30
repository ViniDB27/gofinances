import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { InputForm } from "../../components/Form/InputForm";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { CategorySelect } from "../CategorySelect";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Cotnainer,
  Header,
  Title,
  Form,
  Fileds,
  ButtonContainer,
} from "./styles";

interface Category {
  key: string;
  name: string;
  icon: string;
}

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatorio"),
  amount: Yup.number()
    .typeError("Informe um valor númerico")
    .positive("O Preço não pode ser negativo")
    .required("Preço é obrigatorio"),
});

export function Register() {
  const { control, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });

  const { errors } = formState;

  const [category, setCategory] = useState<Category>({
    name: "Categoria",
    key: "category",
    icon: "any",
  });
  const [transactionType, setTransactionType] = useState("");
  const [modalVisable, setModalVisable] = useState(false);

  function handleTransactionSelected(type: "input" | "output") {
    setTransactionType(type);
  }

  function handleOpenModal() {
    setModalVisable(true);
  }

  function handleCloseModal() {
    setModalVisable(false);
  }

  function handleRegister(form: FormData) {
    if (!transactionType) return Alert.alert("Selecione o tipo da transação");
    if (category.key === "category")
      return Alert.alert("Selecione uma categoria");

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    };

    console.log(data);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Cotnainer>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fileds>
            <InputForm
              control={control}
              name="name"
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              control={control}
              name="amount"
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />
            <ButtonContainer>
              <TransactionTypeButton
                title="Entrada"
                type="input"
                onPress={() => handleTransactionSelected("input")}
                isActive={transactionType === "input"}
              />
              <TransactionTypeButton
                title="Saída"
                type="output"
                isActive={transactionType === "output"}
                onPress={() => handleTransactionSelected("output")}
              />
            </ButtonContainer>
            <CategorySelectButton
              title={category.name}
              onPress={handleOpenModal}
            />
          </Fileds>
          <Button onPress={handleSubmit(handleRegister)}>Enviar</Button>
        </Form>

        <Modal visible={modalVisable}>
          <CategorySelect
            category={category}
            setCategory={(ctgry) => setCategory(ctgry)}
            closeSelectCategory={handleCloseModal}
          />
        </Modal>
      </Cotnainer>
    </TouchableWithoutFeedback>
  );
}
