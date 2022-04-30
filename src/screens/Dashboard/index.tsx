import React from "react";
import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LogoutButton,
} from "./styles";

import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard } from "../../components/TransactionCard";

interface Data {
  id: number;
  title: string;
  amount: string;
  date: string;
  type: "positive" | "negative";
  category: {
    key: string;
    name: string;
    icon: string;
  };
}

export function Dashboard() {
  const datas: Data[] = [
    {
      id: 1,
      title: "Desenvolvimento de site",
      amount: "R$12.450,00",
      category: {
        key: "up",
        name: "Vendas",
        icon: "dollar-sign",
      },
      date: "12/01/2022",
      type: "positive",
    },
    {
      id: 2,
      title: "Hamburgueria Pizza",
      amount: "R$ 59,36",
      category: {
        key: "up",
        name: "Alimentação",
        icon: "coffee",
      },
      date: "12/01/2022",
      type: "negative",
    },
    {
      id: 3,
      title: "Aluguel apartamento",
      amount: "R$1.200,00",
      category: {
        key: "up",
        name: "Casa",
        icon: "shopping-bag",
      },
      date: "12/01/2022",
      type: "positive",
    },
  ];

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/48477457?v=4",
              }}
            />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Vinicio</UserName>
            </User>
          </UserInfo>
          <LogoutButton onpRess={() => {}}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>
      <HighlightCards>
        <HighlightCard
          type="up"
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
        />
        <HighlightCard
          type="down"
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última saída dia 03 de abril"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 16 de abril"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>
        <TransactionsList
          data={datas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
