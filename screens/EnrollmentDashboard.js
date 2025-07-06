import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EnrollmentDashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🪪 Enrollment Dashboard</Text>
      <Text style={styles.subtitle}>You’ll be able to upload tribal IDs for users here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#bbb',
    textAlign: 'center',
  },
});
