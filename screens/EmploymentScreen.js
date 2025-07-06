import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function EmploymentScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>💼 Employment Services</Text>

      <Text style={styles.section}>Hoopa Career & Employment Center</Text>
      <Text style={styles.item}>• Job Listings & Tribal Job Board</Text>
      <Text style={styles.item}>• Resume & Interview Workshops</Text>
      <Text style={styles.item}>• Vocational Training & Certification</Text>
      <Text style={styles.item}>• Youth Work Experience (ages 14–24)</Text>
      <Text style={styles.item}>• Job Fairs & Hiring Events</Text>

      <Text style={styles.section}>📍 Location:</Text>
      <Text style={styles.item}>Agency Rd, next to TANF Office</Text>

      <Text style={styles.section}>📞 Contact:</Text>
      <Text style={styles.item}>(530) 625-4722</Text>
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
