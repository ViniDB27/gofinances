import React from "react";
import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignTitle,
  Foooter,
  FooterWrapper,
} from "./styles";

import { Alert } from "react-native";

import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";

import { RFValue } from "react-native-responsive-fontsize";
import { SocialButton } from "../../components/SocialButton";

import { useAuth } from "../../hooks/auth";

export function SignIn() {
  const { signinWithGoogle, signinWithApple } = useAuth();

  async function handleSigninWithGoogle() {
    try {
      await signinWithGoogle();
    } catch (error) {
      console.log("signinWithGoogle error: ", error);
      Alert.alert("Desculpe nãp conseguimos acessar com google");
    }
  }

  async function handleSigninWithApple() {
    try {
      await signinWithApple();
    } catch (error) {
      console.log("signinWithApple error: ", error);
      Alert.alert("Desculpe nãp conseguimos acessar com apple");
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
          <Title>
            Controle suas {"\n"}finanças de forma {"\n"}muito simples
          </Title>
          <SignTitle>Faça seu login com {"\n"}uma das contas abaixo</SignTitle>
        </TitleWrapper>
      </Header>
      <Foooter>
        <FooterWrapper>
          <SocialButton
            onPress={handleSigninWithGoogle}
            title="Entrar com Google"
            svg={GoogleSvg}
          />
          <SocialButton
            onPress={handleSigninWithApple}
            title="Entrar com Apple"
            svg={AppleSvg}
          />
        </FooterWrapper>
      </Foooter>
    </Container>
  );
}
