import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Stack } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { Pressable, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";
import {
  ReservationActionType,
  useReservationContext,
} from "../../provider/ReservationContext";
import {PersonActionType,usePersonContext} from "../../provider/PersonContext";
import { CategoryActionType, useCategoryContext } from "../../provider/CategoryContext";
import storage, { loadMockData } from "../../provider/Storage";
import React from "react";
import { Snackbar } from "react-native-paper";
import { SnackBarActionType, useSnackBarContext } from "../../provider/SnackBarContext";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const { state, dispatch } = useReservationContext();
  const {state: personState, dispatch: personDispatch} = usePersonContext();
  const {state: categoryState, dispatch: categoryDispatch} = useCategoryContext();

  const { state: snackBarState, dispatch: snackBarDispatch } = useSnackBarContext();

  if (!storage.loaded) {
    storage
      .getObject("reservations")
      .then((result) => {
        const reservations = JSON.parse(result || "[]");
        for (let reservation of reservations) {
          reservation.date = new Date(reservation.date);
          dispatch({ type: ReservationActionType.ADD_INITIAL, payload: reservation });
        }
        storage.loaded = true;
      })
      .catch((err) => {
        console.log(err.message);
      });

    storage.getObject("persons")
    .then((result) => {
      const persons = JSON.parse(result || "[]");
      for (let person of persons) {
        personDispatch({ type: PersonActionType.ADD_INITIAL, payload: person });
      }
      storage.loaded = true;
    })
    .catch((err) => {
      console.log(err.message);
    });

    storage.getObject("categories")
    .then((result) => {
      const categories = JSON.parse(result || "[]");
      for (let category of categories) {
        categoryDispatch({ type: CategoryActionType.ADD_INITIAL, payload: category });
      }
      storage.loaded = true;
    })
    .catch((err) => {
      console.log(err.message);
    });

  }

  return (
    <React.Fragment>
      <Drawer>
        <Drawer.Screen
          name="index"
          options={{
            title: "Inicio",
            drawerIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
            headerRight: () => (
              <Link href="/modal" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="info-circle"
                      size={25}
                      color={Colors[colorScheme ?? "light"].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
          }}
        />
        <Drawer.Screen
          name="reservations"
          options={{
            title: "Reservas",
          }}
        />
        <Drawer.Screen
          name="medicalRecord"
          options={{
            title: "Ficha Clínica",
          }}
        />
        <Drawer.Screen
          name="person"
          options={{
            title: "Personas",
          }}
        />
        <Drawer.Screen
          name="category"
          options={{
            title: "Categorias",
          }}
        />
      </Drawer>
        <Snackbar
            visible={snackBarState.visible}
            onDismiss={() =>
              snackBarDispatch({
                type: SnackBarActionType.DISABLE,
              })
            }
            action={{
              label: "Cerrar",
            }}
            duration={3000}>
            {snackBarState.text}
        </Snackbar>
    </React.Fragment>
  );
}
