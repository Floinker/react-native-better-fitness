import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PersonalDetailsPage from "./src/pages/PersonalDetailsPage";
import { openDatabase } from "react-native-sqlite-storage";
import { useEffect } from "react";
import {
  CREATE_HEALTH_INFO_TABLE_STATEMENT,
  CREATE_USER_TABLE_STATEMENT,
} from "./assets/sql/DBSetup";
import HomePage from "./src/pages/HomePage";
import { navigationRef } from "./src/util/RootNavigation";
import * as RootNavigation from "./src/util/RootNavigation";

var db = openDatabase({ name: "HealthDB.db" });

export default function App() {
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(CREATE_USER_TABLE_STATEMENT, []);
    });
    db.transaction((tx) => {
      tx.executeSql(CREATE_HEALTH_INFO_TABLE_STATEMENT, []);
    });
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM user", [], function (tx, results) {
        if (results.rows.length > 0) {
          console.log("all users in db");
          for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows.item(i);
            console.log(
              row.user_id +
                " | " +
                row.name +
                " | " +
                row.email +
                " | " +
                row.password
            );
          }
        }
      });
    });
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM health_info", [], function (tx, results) {
        if (results.rows.length > 0) {
          console.log("all health_info in db");
          for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows.item(i);
            console.log(
              row.id +
                " | " +
                row.user_id +
                " | " +
                row.gender +
                " | " +
                row.dateOfBirth +
                " | " +
                row.height +
                " | " +
                row.weight
            );
          }
        }
      });
    });
  });

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          name="Übersicht"
          component={HomePage}
          options={{
            headerRight: () => (
              <Icon
                name="user"
                size={25}
                onPress={() => RootNavigation.push("Gesundheitsinfos", {})}
              />
            ),
          }}
        />
        <Stack.Screen name="Gesundheitsinfos" component={PersonalDetailsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();
