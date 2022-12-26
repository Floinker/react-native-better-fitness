import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { View } from "react-native";
import ModalSelector from "react-native-modal-selector";

function GenderPickerComponent() {
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
          setSelectedItem(option.label);
          console.log(selectedItem);
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
