import { Button, StyleSheet } from "react-native";
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import ModalDatePickerComponent from "../components/ModalDatePickerComponent";
import { useState, useEffect } from "react";
import GenderPickerComponent from "../components/GenderPickerComponent";
import { openDatabase } from "react-native-sqlite-storage";
import {
  INSERT_INTO_HEALTH_INFO_STATEMENT,
  INSERT_INTO_USER_STATEMENT,
} from "../../assets/sql/DBInsert";

var db = openDatabase({ name: "HealthDB.db" });

function PersonalDetailsPage() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const insertUserAndHealthInfo = (
    name,
    gender,
    weight,
    height,
    dateOfBirth
  ) => {
    if (!name || !gender || !weight || !height || !dateOfBirth) {
      alert("All fields are required");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT user_id FROM user WHERE name=?",
        [name],
        function (txn, res) {
          if (res.rows.length === 0) {
            txn.executeSql(INSERT_INTO_USER_STATEMENT, [name, "", ""]);
          }
        }
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT user_id FROM user WHERE name=?",
        [name],
        function (txn, res) {
          console.log(res.rows.item(0));
          txn.executeSql(INSERT_INTO_HEALTH_INFO_STATEMENT, [
            res.rows.item(0).user_id,
            gender,
            dateOfBirth,
            height,
            weight,
          ]);
        }
      );
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.description}>
          Persönliche Angaben zu deinen Körpermaßen!
        </Text>
        <View style={styles.inputContainer}>
          <Text style={styles.textLabel}>Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Name"
            onChangeText={(newName) => setName(newName)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.textLabel}>Geschlecht</Text>
          <GenderPickerComponent getGender={setGender} />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.textLabel}>Geburtsdatum</Text>
          <ModalDatePickerComponent getDateOfBirth={setDateOfBirth} />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.textLabel}>Körpergröße</Text>
          <TextInput
            style={styles.textInput}
            placeholder="150"
            keyboardType="numeric"
            onChangeText={(newHeight) =>
              setHeight(
                Number(newHeight).toLocaleString("de-DE", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })
              )
            }
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.textLabel}>Gewicht</Text>
          <TextInput
            style={styles.textInput}
            placeholder="0"
            keyboardType="numeric"
            onChangeText={(newWeight) =>
              setWeight(
                Number(newWeight).toLocaleString("de-DE", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })
              )
            }
          />
        </View>
        <Button
          title="Speichern"
          onPress={() =>
            insertUserAndHealthInfo(name, gender, weight, height, dateOfBirth)
          }
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

export default PersonalDetailsPage;

const styles = StyleSheet.create({
  description: {
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
