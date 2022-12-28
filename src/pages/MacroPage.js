import { View, Text, StyleSheet } from "react-native";
import { openDatabase } from "react-native-sqlite-storage";
import PieChart from "react-native-pie-chart";

var db = openDatabase({ name: "HealthDB.db" });

function MacroPage() {
  const series = [60, 20, 20];
  const sliceColor = ["#F44336", "#2196F3", "#FFEB3B"];

  return (
    <View style={styles.container}>
      <Text>MacroPage</Text>
      <PieChart
        widthAndHeight={250}
        series={series}
        sliceColor={sliceColor}
        doughnut={true}
        coverRadius={0.45}
        coverFill={"#FFF"}
      />
    </View>
  );
}

export default MacroPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
