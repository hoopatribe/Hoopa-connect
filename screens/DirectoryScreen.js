import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function DirectoryScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📒 Tribal Directory</Text>
      <Text style={styles.item}>🏛 Tribal Administration: (530) 625-4211</Text>
      <Text style={styles.item}>🧾 Enrollment Office: (530) 625-4211 ext. 132</Text>
      <Text style={styles.item}>🚔 Tribal Police: (530) 625-4202</Text>
      <Text style={styles.item}>🏥 K'ima:w Medical Center: (530) 625-4261</Text>
      <Text style={styles.item}>🏠 Housing Authority: (530) 625-4759</Text>
      <Text style={styles.item}>👨‍👩‍👧‍👦 TANF Program: (530) 625-4816</Text>
      <Text style={styles.item}>🎓 Education Department: (530) 625-4413</Text>
      <Text style={styles.item}>🛠 Employment Center: (530) 625-4722</Text>
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
  item: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 12,
  },
});
