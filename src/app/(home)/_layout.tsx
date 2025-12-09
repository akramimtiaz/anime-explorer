import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Fragment } from "react";

export default function Layout() {
  return (
    <Fragment>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="[id]" options={{ title: "Details" }} />
      </Stack>
    </Fragment>
  );
}
