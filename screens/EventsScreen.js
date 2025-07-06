import React from 'react';
import { View, Text, ScrollView, StyleSheet, Linking, TouchableOpacity } from 'react-native';

export default function EventsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🎉 Community Events</Text>

      {/* 🌟 Sovereign Days Spotlight */}
      <View style={styles.cardHighlighted}>
        <Text style={styles.cardTitle}>🌄 Hoopa Sovereign Days (Annual)</Text>
        <Text style={styles.cardSubtitle}>August 8–11 • Hoopa Valley Tribal Grounds</Text>
        <Text style={styles.cardText}>
          Celebrate our sovereignty with parades, cultural dances, stick tournaments, booths,
          family gatherings, and fireworks. Join fellow tribal members and visitors for a rich
          four-day experience of tradition, community, and pride. Hosted by Hoopa Valley Tribe.{' '}
        </Text>
        <Text style={styles.cardText}>📞 (530) 625‑4211 • info@hoopatribe.org</Text>
      </View>

      {/* Other Upcoming Events */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🎪 Sovereign Days Vendor Booth</Text>
        <Text style={styles.cardSubtitle}>Aug 9 • 10 AM – 4 PM</Text>
        <Text style={styles.cardText}>
          Tribe-sponsored booth featuring crafts, salmon conservation, and youth activities. On
          the Tribal Office Lawn, Highway 96.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🪶 Stick Tournament</Text>
        <Text style={styles.cardSubtitle}>Aug 10 • Hostler Field</Text>
        <Text style={styles.cardText}>
          Annual competition hosted by K’ima:w Medical Center & TANF — open to all ages!
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🎶 Community Pow-Wow</Text>
        <Text style={styles.cardSubtitle}>Aug 11 • 5 PM</Text>
        <Text style={styles.cardText}>
          Music, dancing, food & fellowship under the Hoopa sky. Bring your family, bring your
          spirit.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📆 Weekly Farmers’ Market</Text>
        <Text style={styles.cardSubtitle}>Mondays • July – Sept • 5–7 PM</Text>
        <Text style={styles.cardText}>
          Local produce, flowers & crafts at the tribal lawn. Contact: meagen18@gmail.com.
        </Text>
      </View>

      <TouchableOpacity style={styles.linkButton} onPress={() => Linking.openURL('https://willowcreekchamber.com/event/sovereign-days-parade-36th-annual/')}>
        <Text style={styles.linkButtonText}>📎 More info »</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#111',
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  cardHighlighted: {
    backgroundColor: '#222',
    borderColor: '#E63946',
    borderWidth: 2,
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#222',
    padding: 16,
    borderRadius: 10,
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 18,
    color: '#E63946',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#ddd',
    marginBottom: 4,
  },
  linkButton: {
    marginTop: 12,
    alignSelf: 'center',
  },
  linkButtonText: {
    color: '#4DA6FF',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
