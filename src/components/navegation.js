import Login from '../screens/Login'
import Signup from '../screens/Signup'
import Cypher from '../screens/Cypher'
import Ultimate from '../screens/Ultimate'
import About from '../screens/About'
import Locais from '../screens/Locais'
import EditLocal from '../screens/EditLocal'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer, StackActions } from '@react-navigation/native'

const Stack = createNativeStackNavigator() // Utilização da vagegação por stacks como visto em aula
function AppStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                options={{ headerShown: false }}
                component={Login} />
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
            <Stack.Screen
                name="Locais"
                options={{ headerShown: false }}
                component={Locais} />
            <Stack.Screen 
                name="EditLocal" 
                component={EditLocal} 
                options ={{ presentation: 'modal'}} /> 
            <Stack.Screen
                name="Signup"
                options={{ headerShown: false }}
                component={Signup} />
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