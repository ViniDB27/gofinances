import React, { useCallback, useEffect, useState } from "react";
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
  LoadCotnainer,
} from "./styles";

import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard } from "../../components/TransactionCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";
import { useAuth } from "../../hooks/auth";

interface Transaction {
  id: number;
  name: string;
  amount: string;
  date: string;
  type: "positive" | "negative";
  categoryKey: {
    key: string;
    name: string;
    icon: string;
  };
}

interface HighlightProps {
  amount: string;
  date: string;
}
interface HighlightData {
  entrie: HighlightProps;
  expensive: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const { user, signOut } = useAuth();
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData
  );

  const theme = useTheme();

  function getLastTransactions(
    transactions: Transaction[],
    type: "positive" | "negative"
  ) {
    const date = new Date(
      Math.max.apply(
        Math,
        transactions
          .filter((transaction) => transaction.type === type)
          .map((transaction) => new Date(transaction.date).getTime())
      )
    );

    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  async function loadTransactions() {
    const dataKey = "@gofinances:transactions";

    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormated: Transaction[] = transactions.map(
      (transaction: Transaction) => {
        if (transaction.type === "positive") {
          entriesTotal += Number(transaction.amount);
        } else {
          expensiveTotal += Number(transaction.amount);
        }

        const amount = Number(transaction.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const dateFormatted = new Date(transaction.date).toLocaleDateString(
          "pt-BR",
          {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }
        );

        return {
          ...transaction,
          amount,
          date: dateFormatted,
        };
      }
    );

    const lastEntrieTransaction = getLastTransactions(transactions, "positive");

    const lastExpensiveTransaction = getLastTransactions(
      transactions,
      "negative"
    );

    setTransactions(transactionsFormated);
    setHighlightData({
      entrie: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        date: lastEntrieTransaction,
      },
      expensive: {
        amount: expensiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        date: lastExpensiveTransaction,
      },
      total: {
        amount: (entriesTotal - expensiveTotal).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        date: `01 à ${lastExpensiveTransaction}`,
      },
    });
    setIsloading(false);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  async function handlerSignOut() {
    signOut();
  }

  return (
    <Container>
      {isLoading ? (
        <LoadCotnainer>
          <ActivityIndicator color={theme.colors.attention} />
        </LoadCotnainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: user?.photo,
                  }}
                />
                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={handlerSignOut}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>
          <HighlightCards>
            <HighlightCard
              type="up"
              title="Entradas"
              amount={highlightData?.entrie?.amount}
              lastTransaction={`Última entrada dia ${highlightData?.entrie?.date}`}
            />
            <HighlightCard
              type="down"
              title="Saídas"
              amount={highlightData?.expensive?.amount}
              lastTransaction={`Última saída dia ${highlightData?.expensive?.date}`}
            />
            <HighlightCard
              type="total"
              title="Total"
              amount={highlightData?.total?.amount}
              lastTransaction={highlightData?.total?.date}
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>
            <TransactionsList
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}
