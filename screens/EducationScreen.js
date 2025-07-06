import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function YouthProgramsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🧒 Youth Programs</Text>
      <Text style={styles.section}>Available Programs:</Text>
      <Text style={styles.item}>• Hoopa Youth Council</Text>
      <Text style={styles.item}>• After-School Tutoring & STEM Club</Text>
      <Text style={styles.item}>• Summer Internships</Text>
      <Text style={styles.item}>• Cultural Mentorship: Language & Dance</Text>
      <Text style={styles.item}>• Basketball & Fitness Nights</Text>

      <Text style={styles.section}>📍 Youth Center:</Text>
      <Text style={styles.item}>Across from Hoopa High School</Text>

      <Text style={styles.section}>📞 Contact:</Text>
      <Text style={styles.item}>(530) 625-4300</Text>
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
