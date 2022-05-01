import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { SvgProps } from "react-native-svg";
import { Button, ImageContainer, TextContainer, Title } from "./styles";

interface SocialButtonProps extends RectButtonProps {
  title: string;
  svg: React.FC<SvgProps>;
}

export function SocialButton({ title, svg: Svg, ...rest }: SocialButtonProps) {
  return (
    <Button {...rest}>
      <ImageContainer>
        <Svg />
      </ImageContainer>
      <TextContainer>
        <Title>{title}</Title>
      </TextContainer>
    </Button>
  );
}
