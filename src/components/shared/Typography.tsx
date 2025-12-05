import type { PropsWithChildren } from "react";
import type { TextProps } from "react-native";
import styled from "styled-components/native";

type TypographyProps = PropsWithChildren & Partial<TextProps>;

export default function Typography({ children, ...props }: TypographyProps) {
  return <TextStyled {...props}>{children}</TextStyled>;
}

const TextStyled = styled.Text`
  font-family: Montserrat_500Medium;
  size: 16px;
  color: black;
`;
