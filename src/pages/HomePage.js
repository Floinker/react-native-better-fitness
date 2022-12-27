import { View, Text, StyleSheet } from "react-native";
import { openDatabase } from "react-native-sqlite-storage";
import { useEffect, useState } from "react";
import CalorieRequirementTemplate from "../templates/CalorieRequirementTemplate";

var db = openDatabase({ name: "HealthDB.db" });

function HomePage() {
  const [name, setName] = useState("");
  const [user_id, setUserId] = useState("");

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM user", [], (tx, results) => {
        if (results.rows.length >= 1) {
          var user = results.rows.item(0);
          setName(user.name);
          setUserId(user.user_id);
        }
      });
    });
  });

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Wilkommen zurück {name}</Text>
      <CalorieRequirementTemplate userId={user_id} />
    </View>
  );
}

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 20,
    textAlign: "center",
  },
});
