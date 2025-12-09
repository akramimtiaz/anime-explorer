import { ThemeType } from "@/src/theme";
import type { PropsWithChildren } from "react";
import type { TextProps } from "react-native";
import styled from "styled-components/native";

type TypographyProps = PropsWithChildren & Partial<TextProps> & {
  size?: keyof ThemeType['font']['sizing'];
  color?: keyof ThemeType['colors'];
};

export default function Typography({
  size = "m",
  color = "contentPrimary",
  children,
  ...props
}: TypographyProps) {
  return <TextStyled size={size} color={color} {...props}>{children}</TextStyled>;
}

const TextStyled = styled.Text<Pick<TypographyProps, 'size' | 'color'>>`
  font-family: Montserrat_500Medium;
  font-size: ${({ theme, size }) => theme.font.sizing[size ?? 'm']};
  color: ${({ theme, color }) => theme.colors[color ?? 'contentPrimary']};
`;
