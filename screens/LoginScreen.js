import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { supabase } from '../lib/supabase';
import { useUser } from '../context/UserContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUserRole } = useUser();

  const getUserRole = async (userId) => {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching role:', error.message || error);
      return 'user';
    }

    if (!data || !data.role) {
      console.warn('No role found for user:', userId);
      return 'user';
    }

    return data.role;
  };

  const handleLogin = async () => {
    const { data: loginData, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      Alert.alert('Login Failed', error.message);
    } else {
      const user = loginData.user;
      const role = await getUserRole(user.id);

      setUserRole(role);
      console.log('Logged in user role:', role);

      if (role === 'chairman') {
        navigation.navigate('ChairmanDashboard');
      } else if (role === 'enrollment') {
        navigation.navigate('EnrollmentDashboard');
      } else {
        navigation.navigate('Home');
      }
    }
  };

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      Alert.alert('Signup Failed', error.message);
    } else {
      const user = data.user;
      if (user) {
        // Insert profile row
        const { error: profileError } = await supabase.from('profiles').insert({
          id: user.id,
          email: user.email,
          full_name: '',        // optional, you can add a name input if needed
          profile_pic: null,    // default profile picture
        });

        if (profileError) {
          console.error('Error creating profile:', profileError.message);
        } else {
          console.log('Profile created for', user.email);
        }
      }

      Alert.alert('Signup Successful', 'Check your email to confirm your account.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔥 Hoopa Connect 🔐</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#ccc"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#ccc"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={handleSignUp}>
        <Text style={styles.secondaryText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginTop: 20, alignItems: 'center' }}
        onPress={() => navigation.navigate('ForgotPassword')}
      >
        <Text style={{ color: '#E63946', fontWeight: 'bold' }}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    color: '#fff',
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#222',
    padding: 14,
    marginBottom: 16,
    borderRadius: 8,
    color: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#E63946',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    marginTop: 12,
    alignItems: 'center',
  },
  secondaryText: {
    color: '#ccc',
    fontSize: 14,
  },
});
