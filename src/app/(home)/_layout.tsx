import { Stack } from "expo-router";
import { Fragment } from "react";

export default function Layout() {
  return (
    <Fragment>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="[id]" options={{ headerShown: false }} />
      </Stack>
    </Fragment>
  );
}
