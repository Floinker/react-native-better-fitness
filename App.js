import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationContainer } from "@react-navigation/native";
import { openDatabase } from "react-native-sqlite-storage";
import { useEffect } from "react";
import {
  CREATE_HEALTH_INFO_TABLE_STATEMENT,
  CREATE_USER_TABLE_STATEMENT,
} from "./assets/sql/DBSetup";
import { navigationRef } from "./src/util/RootNavigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MacroPage from "./src/pages/MacroPage";
import HomePageNav from "./src/pages/HomePageNav";

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
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomePageNav}
          options={{
            headerShown: false,
            tabBarIcon: () => <Icon name="home" size={25} />,
          }}
        />
        <Tab.Screen
          name="Markos"
          component={MacroPage}
          options={{
            tabBarIcon: () => <Icon name="pie-chart" size={25} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator();
