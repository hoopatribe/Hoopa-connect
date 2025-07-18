import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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

import MarketplaceListScreen from './screens/MarketplaceListScreen';
import EditItemScreen from './screens/MarketplaceEditScreen';
import MarketplaceCreateScreen from './screens/MarketplaceCreateScreen';
import MyMarketplaceScreen from './screens/MyMarketplaceScreen';

import { UserProvider } from './context/UserContext';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function MarketplaceStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MarketplaceMain"
        component={MarketplaceListScreen}
        options={{ title: 'Marketplace' }}
      />
      <Stack.Screen
        name="MarketplaceEdit"
        component={EditItemScreen}
        options={{ title: 'Edit Item' }}
      />
      <Stack.Screen
        name="MarketplacePost"
        component={MarketplaceCreateScreen}
        options={{ title: 'Post New Item' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.log('❌ Error getting session:', error.message);
          setInitialRoute('Welcome');
          return;
        }

        const session = data.session;

        if (session) {
          console.log('✅ Supabase session:', session);
          console.log('🔑 User ID:', session.user.id);
          setInitialRoute('Home');
        } else {
          console.log('⚠️ No active session found');
          setInitialRoute('Welcome');
        }
      } catch (err) {
        console.error('⚠️ Session check failed:', err);
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
          <Drawer.Screen name="Marketplace" component={MarketplaceStack} />
          <Drawer.Screen name="My Listings" component={MyMarketplaceScreen} />
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
