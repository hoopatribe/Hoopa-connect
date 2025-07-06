import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function HealthServicesScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🏥 Health Services</Text>
      <Text style={styles.section}>K'ima:w Medical Center:</Text>
      <Text style={styles.item}>• Primary Care & Walk-ins</Text>
      <Text style={styles.item}>• Dental Services</Text>
      <Text style={styles.item}>• Behavioral Health</Text>
      <Text style={styles.item}>• Pharmacy (In-house pickup)</Text>
      <Text style={styles.item}>• Diabetes Support & Education</Text>

      <Text style={styles.section}>Hours:</Text>
      <Text style={styles.item}>Mon–Fri: 8:00 AM – 5:00 PM</Text>
      <Text style={styles.item}>Closed for lunch: 12–1 PM</Text>

      <Text style={styles.section}>📞 Contact:</Text>
      <Text style={styles.item}>(530) 625-4261</Text>
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
