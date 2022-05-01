import React, { useCallback, useEffect, useState } from "react";
import { HistoryCard } from "../../components/HistoryCard";
import {
  Container,
  Header,
  Title,
  HistoryList,
  ChartContainer,
  MonthSelect,
  Month,
  MonthSelectButtun,
  MonthSelectIcon,
  LoadCotnainer,
} from "./styles";
import { categories } from "../../utils/categories";
import { VictoryPie } from "victory-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import { addMonths, subMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useTheme } from "styled-components";
import { ActivityIndicator } from "react-native";

interface Transaction {
  id: string;
  name: string;
  amount: string;
  type: string;
  category: {
    key: string;
  };
  date: string;
}

interface Category {
  key: string;
  name: string;
  icon: string;
  color: string;
  amount: number;
}

export function Resume() {
  const [isLoading, setIsloading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [category, setCategory] = useState<Category[]>([]);
  const charData = getVictoryCategory();
  const theme = useTheme();

  function handleChangeDate(action: "next" | "prev") {
    if (action === "next") {
      const newDate = addMonths(selectedDate, 1);
      setSelectedDate(newDate);
    } else {
      const newDate = subMonths(selectedDate, 1);
      setSelectedDate(newDate);
    }
  }

  useEffect(() => {
    loadTransactions();
  }, [selectedDate]);

  useEffect(() => {
    loadCategories();
  }, [transactions]);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  function getPercent(category: Category) {
    const amounTotal = getTotal();
    return Math.round((category.amount * 100) / amounTotal);
  }

  async function loadTransactions() {
    setIsloading(true);
    const dataKey = "@gofinances:transactions";

    const response = await AsyncStorage.getItem(dataKey);
    const transactions: Transaction[] = response ? JSON.parse(response) : [];
    setTransactions(transactions);
  }

  function loadCategories() {
    const data = categories
      .map((category) => ({
        ...category,
        amount: getAmountForCategory(category as Category),
      }))
      .filter((category) => category.amount > 0);

    setCategory(data);
    setIsloading(false);
  }

  function getAmountForCategory(category: Category): number {
    return transactions
      .filter(
        (transaction) =>
          transaction.category.key === category.key &&
          transaction.type === "negative" &&
          new Date(transaction.date).getMonth() === selectedDate.getMonth() &&
          new Date(transaction.date).getFullYear() ===
            selectedDate.getFullYear()
      )
      .reduce((amount, transaction) => {
        return amount + Number(transaction.amount);
      }, 0);
  }

  function getTotal(): number {
    return transactions
      .filter((transaction) => transaction.type === "negative")
      .reduce((amount, transaction) => {
        return amount + Number(transaction.amount);
      }, 0);
  }

  function formatAmount(amount: number) {
    return amount.toLocaleString("pt-Br", {
      style: "currency",
      currency: "BRL",
    });
  }

  function getVictoryCategory() {
    return category.map((ctgry: Category) => ({
      ...ctgry,
      x: `${getPercent(ctgry)}%`,
      y: ctgry.amount,
    }));
  }

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <MonthSelect>
        <MonthSelectButtun onPress={() => handleChangeDate("prev")}>
          <MonthSelectIcon name="chevron-left" />
        </MonthSelectButtun>
        <Month>
          {format(selectedDate, "MMMM, yyyy", {
            locale: ptBR,
          })}
        </Month>
        <MonthSelectButtun onPress={() => handleChangeDate("next")}>
          <MonthSelectIcon name="chevron-right" />
        </MonthSelectButtun>
      </MonthSelect>

      {isLoading ? (
        <>
          <LoadCotnainer>
            <ActivityIndicator color={theme.colors.primary} />
          </LoadCotnainer>
        </>
      ) : (
        <>
          <ChartContainer>
            <VictoryPie
              data={charData}
              colorScale={charData.map((data) => data.color)}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: "bold",
                  fill: "white",
                },
              }}
              labelRadius={60}
              animate={{
                duration: 2000,
              }}
            />
          </ChartContainer>

          <HistoryList
            data={category}
            keyExtractor={(item: Category) => item.key}
            renderItem={({ item }) => {
              const category = item as Category;
              return (
                <HistoryCard
                  color={category.color}
                  title={category.name}
                  amount={formatAmount(category.amount)}
                />
              );
            }}
          />
        </>
      )}
    </Container>
  );
}
