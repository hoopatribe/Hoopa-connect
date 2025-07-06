import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function HousingScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🏠 Housing Services</Text>
      <Text style={styles.section}>Hoopa Housing Authority</Text>
      <Text style={styles.item}>• Low-Income Rental Assistance</Text>
      <Text style={styles.item}>• Elderly Housing Support</Text>
      <Text style={styles.item}>• Home Repairs & Renovation Program</Text>
      <Text style={styles.item}>• Emergency Shelter Access</Text>
      <Text style={styles.item}>• Housing Counseling Services</Text>

      <Text style={styles.section}>📍 Location:</Text>
      <Text style={styles.item}>123 Agency Rd, Hoopa, CA</Text>

      <Text style={styles.section}>📞 Contact:</Text>
      <Text style={styles.item}>(530) 625-4759</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#111',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    fontSize: 18,
    color: '#fff',
    marginTop: 16,
    fontWeight: '600',
  },
  item: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 8,
  },
});
