import styled from "styled-components/native";

import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(TouchableOpacity).attrs({
  activeOpacity: 0.7,
})`
  background-color: ${({ theme }) => theme.colors.secondary};

  justify-content: center;
  align-items: center;

  width: 100%;
  height: ${RFValue(56)}px;

  border-radius: 5px;

  padding: 18px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;
