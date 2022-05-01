import React from "react";
import { categories } from "../../utils/categories";
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
    name: string;
    amount: string;
    category: CategoryProps;
    date: string;
    type: "positive" | "negative";
  };
}

export function TransactionCard({ data }: TransactionCardProps) {
  const { name, amount, category, date, type } = data;
  const ctgry = categories.find(ctgry => ctgry.key === category.key)
  return (
    <Container>
      <Title>{name}</Title>
      <Amount type={type}>
        {type === "negative" && "- "}
        {amount}
      </Amount>
      <Foooter>
        <Category>
          <Icon name={ctgry.icon} />
          <CategoryName>{ctgry.name}</CategoryName>
        </Category>
        <Date>{date}</Date>
      </Foooter>
    </Container>
  );
}
