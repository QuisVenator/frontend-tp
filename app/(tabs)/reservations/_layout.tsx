import { Stack } from "expo-router";
export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          // Hide the header for all other routes.
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="add"
        options={{
          headerShown: true,
          title: "Agregar Reservas",
        }}
      />
    </Stack>
  );
}
