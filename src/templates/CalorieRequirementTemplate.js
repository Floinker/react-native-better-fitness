import { View, Text, StyleSheet } from "react-native";
import { openDatabase } from "react-native-sqlite-storage";
import { useEffect, useState } from "react";

var db = openDatabase({ name: "HealthDB.db" });

function CalorieRequirementTemplate({ userId }) {
  const [calories, setCalories] = useState(0);

  const calculateCalories = (gender, dateOfBirth, weight, height) => {
    var calories = 0;

    var today = new Date();
    var birthDate = new Date(dateOfBirth);
    var ageInYears = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      ageInYears--;
    }

    if (gender === "female") {
      calories = 655 + 9.5 * weight + 1.9 * height - 4.7 * ageInYears;
      setCalories(calories);
      return;
    }

    calories = 66 + 13.8 * weight + 5.0 * height - 6.8 * ageInYears;

    setCalories(parseInt(calories));
  };

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM health_info where user_id=?",
        [userId],
        (tx, results) => {
          if (results.rows.length >= 1) {
            var healthInfo = results.rows.item(0);
            calculateCalories(
              healthInfo.gender,
              healthInfo.dateOfBirth,
              parseFloat(healthInfo.weight),
              parseFloat(healthInfo.height)
            );
          }
        }
      );
    });
  });

  return (
    <View style={styles.container}>
      <Text style={styles.calorieText}>{calories} kcal</Text>
    </View>
  );
}

export default CalorieRequirementTemplate;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    backgroundColor: "grey",
    padding: 10,
    borderRadius: 10,
  },
  calorieText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
