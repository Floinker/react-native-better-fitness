import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { View } from "react-native";
import ModalSelector from "react-native-modal-selector";

function GenderPickerComponent({ getGender }) {
  const items = [
    { key: "male", label: "Männlich" },
    { key: "female", label: "Weiblich" },
    { key: "none", label: "Keine Angabe" },
  ];

  const [selectedItem, setSelectedItem] = useState("");

  return (
    <View style={styles.container}>
      <ModalSelector
        data={items}
        onChange={(option) => {
          getGender(option.key);
          setSelectedItem(option.label);
        }}
      >
        <TextInput
          editable={false}
          placeholder="Auswählen"
          value={selectedItem}
        />
      </ModalSelector>
    </View>
  );
}

export default GenderPickerComponent;

const styles = StyleSheet.create({});
