import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { supabase } from './lib/supabase';

import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import JobsScreen from './screens/JobsScreen';
import LoginScreen from './screens/LoginScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import IDVaultScreen from './screens/IDVaultScreen';
import ChairmanDashboard from './screens/ChairmanDashboard';
import EnrollmentDashboard from './screens/EnrollmentDashboard';
import ChairmanMessageScreen from './screens/ChairmanMessageScreen';
import MarketplaceScreen from './screens/MarketplaceScreen';
import EditProfileScreen from './screens/EditProfileScreen';

import EventsScreen from './screens/EventsScreen';
import DirectoryScreen from './screens/DirectoryScreen';
import HealthServicesScreen from './screens/HealthServicesScreen';
import HousingScreen from './screens/HousingScreen';
import PublicSafetyScreen from './screens/PublicSafetyScreen';
import YouthProgramsScreen from './screens/YouthProgramsScreen';
import EducationScreen from './screens/EducationScreen';
import EmploymentScreen from './screens/EmploymentScreen';
import ContactScreen from './screens/ContactScreen';

import { UserProvider } from './context/UserContext';

const Drawer = createDrawerNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      console.log('Supabase session:', data.session);
      if (data.session) {
        setInitialRoute('Home');
      } else {
        setInitialRoute('Welcome');
      }
    };
    checkSession();
  }, []);

  if (!initialRoute) return null;

  return (
    <UserProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName={initialRoute}
          screenOptions={{
            headerShown: true,
            drawerActiveTintColor: '#E63946',
            drawerStyle: { backgroundColor: '#111' },
            headerStyle: { backgroundColor: '#111' },
            headerTitleStyle: { color: '#fff' },
            drawerLabelStyle: { color: '#fff' },
          }}
        >
          <Drawer.Screen name="Welcome" component={WelcomeScreen} />
          <Drawer.Screen name="Login" component={LoginScreen} />
          <Drawer.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Jobs" component={JobsScreen} />
          <Drawer.Screen name="IDVault" component={IDVaultScreen} />
          <Drawer.Screen name="ChairmanDashboard" component={ChairmanDashboard} />
          <Drawer.Screen name="EnrollmentDashboard" component={EnrollmentDashboard} />
          <Drawer.Screen name="ChairmanMessage" component={ChairmanMessageScreen} />
          <Drawer.Screen name="Marketplace" component={MarketplaceScreen} />
          <Drawer.Screen name="EditProfile" component={EditProfileScreen} />
          <Drawer.Screen name="Events" component={EventsScreen} />
          <Drawer.Screen name="Directory" component={DirectoryScreen} />
          <Drawer.Screen name="HealthServices" component={HealthServicesScreen} />
          <Drawer.Screen name="Housing" component={HousingScreen} />
          <Drawer.Screen name="PublicSafety" component={PublicSafetyScreen} />
          <Drawer.Screen name="YouthPrograms" component={YouthProgramsScreen} />
          <Drawer.Screen name="Education" component={EducationScreen} />
          <Drawer.Screen name="Employment" component={EmploymentScreen} />
          <Drawer.Screen name="Contact" component={ContactScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
