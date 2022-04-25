import React from "react";
import {
  Container,
  Title,
  Amount,
  Foooter,
  Icon,
  Category,
  CategoryName,
  Date,
} from "./styles";

interface CategoryProps {
  key: string;
  name: string;
  icon: string;
}

interface TransactionCardProps {
  data: {
    title: string;
    amount: string;
    category: CategoryProps;
    date: string;
    type: "positive" | "negative";
  };
}

export function TransactionCard({ data }: TransactionCardProps) {
  const { title, amount, category, date, type } = data;
  return (
    <Container>
      <Title>{title}</Title>
      <Amount type={type}>
        {type === "negative" && "- "}
        {amount}
      </Amount>
      <Foooter>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <Date>{date}</Date>
      </Foooter>
    </Container>
  );
}
