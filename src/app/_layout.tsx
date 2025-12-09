import { Montserrat_500Medium, useFonts } from "@expo-google-fonts/montserrat";
import Entypo from '@expo/vector-icons/Entypo';
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Fragment } from "react";

export default function RootLayout() {
  let [fontsLoaded] = useFonts({
    Montserrat_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Fragment>
      <StatusBar style="auto" />
      <Tabs
        screenOptions={{
          tabBarInactiveTintColor: "grey",
          tabBarActiveTintColor: "orange",
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
    </Fragment>
  );
}
