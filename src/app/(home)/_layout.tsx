import { Stack } from "expo-router";
import { Fragment } from "react";

export default function Layout() {
  return (
    <Fragment>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Home'}} />
        <Stack.Screen name="[id]" options={{ title: 'Details'}}  />
      </Stack>
    </Fragment>
  );
}
