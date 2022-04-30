import React from "react";
import { Container, Icon, Title, Button } from "./styles";
import { RectButtonProps } from "react-native-gesture-handler";

interface TransactionTypeButtonProps extends RectButtonProps {
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
    <Container isActive={isActive} type={type}>
      <Button {...rest}>
        <Icon name={icon[type]} type={type} />
        <Title>{title}</Title>
      </Button>
    </Container>
  );
}
