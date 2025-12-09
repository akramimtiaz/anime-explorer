import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Fragment } from "react";
import { useTheme } from "styled-components/native";

export default function Layout() {
  const theme = useTheme();
  return (
    <Fragment>
      <StatusBar style="auto" />
      <Stack screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.tertiary,
        },
        headerTitleStyle: {
          color: theme.colors.primary,
        }
      }}>
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="[id]" options={{ title: "Details" }} />
      </Stack>
    </Fragment>
  );
}
