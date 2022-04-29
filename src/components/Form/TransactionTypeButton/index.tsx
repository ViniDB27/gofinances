import React from "react";
import { Container, Icon, Title } from "./styles";
import { TouchableOpacityProps } from "react-native";

interface TransactionTypeButtonProps extends TouchableOpacityProps {
  title: string;
  type: "input" | "output";
  isActive: boolean;
}

const icon = {
  input: "arrow-up-circle",
  output: "arrow-down-circle",
};

export function TransactionTypeButton({
  title,
  type,
  isActive,
  ...rest
}: TransactionTypeButtonProps) {
  return (
    <Container {...rest} isActive={isActive} type={type} >
      <Icon name={icon[type]} type={type} />
      <Title>{title}</Title>
    </Container>
  );
}
