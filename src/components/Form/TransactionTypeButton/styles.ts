import styled, { css } from "styled-components/native";

import { Feather } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

type TypeProps = {
  type: "input" | "output";
};

type ActiveType = {
  isActive: boolean;
  type: "input" | "output";
};

export const Container = styled.View<ActiveType>`
  width: ${RFValue(149)}px;
  height: ${RFValue(56)}px;

  border-width: 1.5px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text};
  border-radius: 5px;

  ${({ type, isActive }) =>
    isActive &&
    type === "output" &&
    css`
      background-color: ${({ theme }) => theme.colors.attention_light};
      border: none;
    `}

  ${({ type, isActive }) =>
    isActive &&
    type === "input" &&
    css`
      background-color: ${({ theme }) => theme.colors.success_light};
      border: none;
    `}
`;

export const Button = styled(RectButton as any)`
  width: 100%;
  height: 100%;

  flex-direction: row;

  justify-content: center;
  align-items: center;
`;

export const Icon = styled(Feather as any)<TypeProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;
  color: ${({ theme, type }) =>
    type === "input" ? theme.colors.success : theme.colors.attention};
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;
