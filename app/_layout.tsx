import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack >
      <Stack.Screen name="index" options={{
          title: "Exercício 02",
      }} />
    </Stack>;
}
