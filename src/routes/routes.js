import * as React from 'react';

// Navigation modules
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';


//context
import {PlanContext} from '../contexts/PlanContext';

// Import Screens
import Home from '../screens/Home';

/// import components
// plans
import ListPlan from '../screens/ListPlansScreen';
import AddPlan from '../screens/AddPlanScreen';
import ViewPlan from '../screens/ViewPlanScreen';
import EditPlan from '../screens/EditPlanScreen';
// calendar
import CalendarScreen from '../screens/CalendarScreen';


// setup Navigations
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigtator = props => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Lession Plans" component={ListPlan} />
            <Drawer.Screen name="Calendar" component={CalendarScreen} />
        </Drawer.Navigator>
    );
}



// Main function
const Routes = props => {
        // initial load when app starts
        const { loadAllPlans } = React.useContext(PlanContext);
        loadAllPlans();



    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen 
                    name="Home"
                    component={DrawerNavigtator}
                    options={{
                        title: "Yin Energy Balance",
                        headerStyle: {
                            backgroundColor: "rgb(108, 184, 58)",
                        },
                        headerTintColor: "#fff",
                        headerTitleAlign: "center"
                    }} 
                />

                {/* plans */}
                <Stack.Screen name="Lession Plans" component={DrawerNavigtator} />

                <Stack.Screen name="Add Plan" component={AddPlan}
                    options={{
                    title: "Yin Energy Balance",
                    headerStyle: {
                        backgroundColor: "rgb(108, 184, 58)",
                    },
                    headerTintColor: "#fff",
                    headerTitleAlign: "center"
                    }} 
                />
                <Stack.Screen name="View Plan" component={ViewPlan}
                    options={{
                        title: "Yin Energy Balance",
                        headerStyle: {
                            backgroundColor: "rgb(108, 184, 58)",
                        },
                        headerTintColor: "#fff",
                        headerTitleAlign: "center"
                    }} 
                />
                <Stack.Screen name="Edit Plan" component={EditPlan}
                    options={{
                        title: "Yin Energy Balance",
                        headerStyle: {
                            backgroundColor: "rgb(108, 184, 58)",
                        },
                        headerTintColor: "#fff",
                        headerTitleAlign: "center"
                    }} 
                />

                {/* calandar/ session creator */}
                <Stack.Screen name="Calendar" component={DrawerNavigtator}
                
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;