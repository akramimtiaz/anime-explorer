import { Montserrat_500Medium, useFonts } from "@expo-google-fonts/montserrat";
import Entypo from '@expo/vector-icons/Entypo';
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Fragment } from "react";
import { ThemeProvider } from "styled-components/native";
import theme from "../theme";

export default function RootLayout() {
  let [fontsLoaded] = useFonts({
    Montserrat_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <StatusBar style="auto" />
        <Tabs
          screenOptions={{
            tabBarInactiveTintColor: theme.colors.contentSecondary,
            tabBarActiveTintColor: theme.colors.primary,
            tabBarStyle: {
              backgroundColor: theme.colors.tertiary,
            },
            headerStyle: {
              backgroundColor: theme.colors.tertiary,
            },
            headerTitleStyle: {
              color: theme.colors.primary,
            },
          }}
        >
          <Tabs.Screen
            name="(home)"
            options={{
              tabBarIcon: ({ color, size }) => (
                <Entypo name="home" size={size} color={color} />
              ),
              headerShown: false,
              title: "Home",
            }}
          />
          <Tabs.Screen
            name="favourites"
            options={{
              tabBarIcon: ({ color, size }) => (
                <Entypo name="heart" size={size} color={color} />
              ),
              title: "Favourites",
            }}
          />
        </Tabs>
      </ThemeProvider>
    </Fragment>
  );
}
