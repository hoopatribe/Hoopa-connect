import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function PublicSafetyScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🚓 Public Safety</Text>
      <Text style={styles.section}>Hoopa Tribal Police Department:</Text>
      <Text style={styles.item}>• Emergency Response</Text>
      <Text style={styles.item}>• Community Patrols</Text>
      <Text style={styles.item}>• Youth Outreach & Prevention</Text>
      <Text style={styles.item}>• Domestic Violence Assistance</Text>

      <Text style={styles.section}>📞 Emergency:</Text>
      <Text style={styles.item}>Call 911</Text>

      <Text style={styles.section}>📞 Non-Emergency:</Text>
      <Text style={styles.item}>(530) 625-4202</Text>

      <Text style={styles.section}>📍 Office Location:</Text>
      <Text style={styles.item}>Hoopa Safety Complex, Loop Rd</Text>
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
