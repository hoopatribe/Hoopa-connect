import React from 'react';
import { View, Text, ScrollView, StyleSheet, Linking, TouchableOpacity } from 'react-native';

export default function ContactScreen() {
  const sendEmail = () => {
    Linking.openURL('mailto:info@hoopatribe.org');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📞 Contact Us</Text>

      <Text style={styles.item}>Hoopa Valley Tribal Offices</Text>
      <Text style={styles.item}>Highway 96 & Loop Road</Text>
      <Text style={styles.item}>Hoopa, CA 95546</Text>

      <Text style={styles.item}>Main Phone: (530) 625-4211</Text>
      <Text style={styles.item}>Fax: (530) 625-4594</Text>

      <TouchableOpacity onPress={sendEmail}>
        <Text style={[styles.item, styles.link]}>✉️ info@hoopatribe.org</Text>
      </TouchableOpacity>

      <Text style={styles.section}>Feedback & Suggestions</Text>
      <Text style={styles.item}>Your voice matters! Email us ideas to improve Hoopa Connect.</Text>
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
    marginTop: 24,
    fontWeight: '600',
  },
  item: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 12,
  },
  link: {
    color: '#4DA6FF',
    textDecorationLine: 'underline',
  },
});
