import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from './src/pages/Login';
import MenuDrawer from './src/pages/MenuDrawer';
import Principal from "./src/pages/Principal";

const Stack = createNativeStackNavigator();

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="MenuDrawer" component={MenuDrawer} options={{ headerShown: false }}/>
        <Stack.Screen name="Principal" component={Principal} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}