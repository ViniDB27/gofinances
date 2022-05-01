import React from "react";
import { Container, Title, Amount } from "./styles";

interface HistoryCard {
  color: string;
  title: string;
  amount: string;
}

export function HistoryCard({ title, color, amount }: HistoryCard) {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  );
}
