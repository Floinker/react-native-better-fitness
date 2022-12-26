import { Button, StyleSheet } from "react-native";
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import ModalDatePickerComponent from "../components/ModalDatePickerComponent";
import { useState } from "react";
import GenderPickerComponent from "../components/GenderPickerComponent";

function PersonalDetailsPage() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.description}>
          Persönliche Angaben zu deinen Körpermaßen!
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.textLabel}>Geschlecht</Text>
          <GenderPickerComponent />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.textLabel}>Geburtsdatum</Text>
          <ModalDatePickerComponent />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.textLabel}>Körpergröße</Text>
          <TextInput
            style={styles.textInput}
            placeholder="150 cm"
            keyboardType="numeric"
            onChangeText={(newHeight) => setHeight(newHeight + " cm")}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.textLabel}>Gewicht</Text>
          <TextInput
            style={styles.textInput}
            placeholder="0 kg"
            keyboardType="numeric"
            onChangeText={(newWeight) => setWeight(newWeight + " kg")}
          />
        </View>
        <Button title="Speichern"></Button>
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
