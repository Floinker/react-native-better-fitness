import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./HomePage";
import PersonalDetailsPage from "./PersonalDetailsPage";
import Icon from "react-native-vector-icons/FontAwesome";
import * as RootNavigation from "../../src/util/RootNavigation";

function HomePageNav() {
  return (
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
  );
}

export default HomePageNav;

const Stack = createNativeStackNavigator();
