import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { userRole } = useUser();

  const openEmail = () => {
    Linking.openURL('mailto:info@hoopatribe-nsn.gov');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Background Image with Overlay Logo */}
      <View style={styles.heroContainer}>
        <Image
          source={require('../assets/hoopaveiw.jpeg')}
          style={styles.backgroundImage}
        />
        <Image
          source={require('../assets/hoopa-logo.png')}
          style={styles.logoOverlay}
        />
        {/* Hamburger menu */}
        <TouchableOpacity
          style={styles.menuIcon}
          onPress={() => navigation.toggleDrawer?.()}
        >
          <Ionicons name="menu" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* Chairman's Daily Message */}
      <View style={styles.chairmanMessageContainer}>
        <Text style={styles.sectionTitle}>🗣 Words from our Chairman</Text>
        <Image
          source={require('../assets/chairman-joe.jpg')}
          style={styles.chairmanImage}
        />
        <Text style={styles.chairmanName}>Chairman Joe Davis</Text>
        <Text style={styles.chairmanMessage}>
          “Our tribe is strong and resilient. As we look toward Sovereign Day,
          let us remember our ancestors and honor the responsibility we carry
          forward.” – July 5, 2025
        </Text>
      </View>

      {/* Marketplace Preview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎨 Marketplace Spotlight</Text>
        <Image
          source={require('../assets/elkhorn_purses.jpeg')}
          style={styles.marketImage}
        />
        <Text style={styles.sectionText}>
          Explore handcrafted Elkhorn purses and beautiful Native jewelry by
          local artisans in our growing community marketplace.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Marketplace')}
        >
          <Text style={styles.buttonText}>Visit Marketplace</Text>
        </TouchableOpacity>
      </View>

      {/* Events and News */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📅 Community Events</Text>
        <Text style={styles.sectionText}>
          🎉 <Text style={{ fontWeight: 'bold' }}>Sovereign Day - July 10th:</Text> Join us for
          food, games, drumming, and cultural celebration at the Tribal Gym and
          ceremonial grounds. Parade starts at 10 AM, followed by feast, youth
          activities, and traditional performances. All are welcome.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Events')}
        >
          <Text style={styles.buttonText}>See All Events</Text>
        </TouchableOpacity>
      </View>

      {/* Footer and Contact Info */}
      <View style={styles.footer}>
        <Text style={styles.sectionTitle}>📞 Tribal Directory</Text>
        <Text style={styles.sectionText}>
          📍 Hoopa Valley Tribal Office{'\n'}
          Highway 96, Hoopa, CA 95546{'\n'}
          ☎️ (530) 625-4211
        </Text>
        <TouchableOpacity style={styles.contactButton} onPress={openEmail}>
          <Text style={styles.contactButtonText}>Contact Us</Text>
        </TouchableOpacity>
        <Text style={styles.aboutText}>
          Hoopa Connect is your mobile hub for events, services, and tribal
          resources. Stay informed and connected with your community.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111',
    flexGrow: 1,
  },
  heroContainer: {
    position: 'relative',
    height: 180,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  logoOverlay: {
    position: 'absolute',
    top: 12,
    left: 12,
    width: 70,
    height: 70,
  },
  menuIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  chairmanMessageContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#222',
  },
  chairmanImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginVertical: 8,
  },
  chairmanName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  chairmanMessage: {
    fontSize: 14,
    color: '#ddd',
    textAlign: 'center',
    marginTop: 8,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 15,
    color: '#ccc',
    marginBottom: 12,
  },
  marketImage: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#E63946',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#333',
    marginTop: 10,
  },
  contactButton: {
    marginTop: 10,
    backgroundColor: '#457B9D',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  aboutText: {
    color: '#888',
    fontSize: 13,
    marginTop: 10,
    textAlign: 'center',
  },
});
