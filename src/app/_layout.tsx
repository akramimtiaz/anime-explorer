import { Tabs } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { Fragment } from 'react';

export default function RootLayout() {
  return (
    <Fragment>
      <StatusBar style="auto" />
      <Tabs>
        <Tabs.Screen name="(home)" options={{ headerShown: false, title: "Home" }} />
        <Tabs.Screen name="favourites" options={{ title: "Favourites" }} />
      </Tabs>
    </Fragment>
  );
}
