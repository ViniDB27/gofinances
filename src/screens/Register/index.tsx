import React, { useState } from "react";
import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { Input } from "../../components/Form/Input";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { Modal } from "react-native";
import { CategorySelect } from "../CategorySelect";
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

export function Register() {
  const [category, setCategory] = useState<Category>({
    name: "Categoria",
    key: "category",
    icon: "any"
  });
  const [TransactionType, setTransactionType] = useState("");
  const [modalVisable, setModalVisable] = useState(false);

  function handleTransactionSelected(type: "input" | "output") {
    setTransactionType(type);
  }

  function handleOpenModal() {
    setModalVisable(true)
  }
  
  function handleCloseModal() {
    setModalVisable(false)
  }

  return (
    <Cotnainer>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fileds>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />
          <ButtonContainer>
            <TransactionTypeButton
              title="Entrada"
              type="input"
              onPress={() => handleTransactionSelected("input")}
              isActive={TransactionType === "input"}
            />
            <TransactionTypeButton
              title="Saída"
              type="output"
              isActive={TransactionType === "output"}
              onPress={() => handleTransactionSelected("output")}
            />
          </ButtonContainer>
          <CategorySelectButton title={category.name} onPress={handleOpenModal} />
        </Fileds>
        <Button>Enviar</Button>
      </Form>

      <Modal visible={modalVisable} >
        <CategorySelect
          category={category}
          setCategory={(ctgry) => setCategory(ctgry)}
          closeSelectCategory={handleCloseModal}
        />
      </Modal>
    </Cotnainer>
  );
}
