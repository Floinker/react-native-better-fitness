import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import DatePicker from "react-native-date-picker";
import { useState } from "react";
import { format } from "date-fns";

function ModalDatePickerComponent() {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setOpen(true)}>
        <Text>{format(date, "MMMM do, yyyy")}</Text>
      </TouchableOpacity>
      <DatePicker
        modal
        mode="date"
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
}

export default ModalDatePickerComponent;

const styles = StyleSheet.create({});
