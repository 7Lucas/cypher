import Cypher from '../screens/Cypher'
import Ultimate from '../screens/Ultimate'
import About from '../screens/About'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer, StackActions } from '@react-navigation/native'

const Stack = createNativeStackNavigator() // Utilização da vagegação por stacks como visto em aula
function AppStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Cypher"
                options={{ headerShown: false }}
                component={Cypher} />
            <Stack.Screen
                name="Ultimate"
                options={{ headerShown: false }}
                component={Ultimate} />
            <Stack.Screen
                name="About"
                options={{ headerShown: false }}
                component={About} />
        </Stack.Navigator>
    )
}
export default function Navigation() {
    return (
        <NavigationContainer>
            <AppStack />
        </NavigationContainer>
    )
}