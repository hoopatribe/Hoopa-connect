import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Pressable,
  Modal,
  Linking,
} from 'react-native';
import { supabase } from '../lib/supabase';

export default function HomeScreen({ navigation }) {
  const [events, setEvents] = useState([]);
  const [chairmanMessage, setChairmanMessage] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    fetchEvents();
    fetchChairmanMessage();
    fetchUserProfile();
  }, []);

  async function fetchUserProfile() {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.error('❌ Error fetching session:', sessionError.message);
      return;
    }

    const user = session?.user;
    if (!user) {
      console.warn('⚠️ No user found in session.');
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role, avatar_url')
      .eq('id', user.id)
      .single();

    if (profileError) {
      console.error('❌ Error fetching profile:', profileError.message);
    } else {
      console.log('✅ Logged in user role:', profile.role);
      console.log('🖼️ Avatar URL:', profile.avatar_url);
      setUserRole(profile.role);
      setAvatarUrl(profile.avatar_url);
    }
  }

  async function fetchEvents() {
    setEvents([
      { id: 1, title: 'Community Gathering', date: 'July 15, 2025' },
      { id: 2, title: 'Art Workshop', date: 'July 20, 2025' },
    ]);
  }

  async function fetchChairmanMessage() {
    setChairmanMessage({
      message: 'Welcome to the Hoopa Connect app! Stay connected, stay safe.',
      date: 'July 9, 2025',
    });
  }

  function openMenu() {
    setMenuVisible(true);
  }

  function closeMenu() {
    setMenuVisible(false);
  }

  function handleMenuNavigate(screen) {
    closeMenu();
    navigation.navigate(screen);
  }

  function handleContactUs() {
    Linking.openURL('mailto:contact@hoopatribe-nsn.gov');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/hoopaview.jpeg')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        <Image
          source={require('../assets/hoopa-logo.png')}
          style={styles.logoOverlay}
          resizeMode="contain"
        />
        <Pressable onPress={openMenu} style={styles.hamburger}>
          <View style={styles.bar} />
          <View style={styles.bar} />
          <View style={styles.bar} />
        </Pressable>
      </View>

      <Modal
        visible={menuVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={closeMenu}
      >
        <Pressable style={styles.modalOverlay} onPress={closeMenu}>
          <View style={styles.menuContainer}>
            {[
              { name: 'Home', screen: 'Home' },
              { name: 'ID Vault', screen: 'IDVault' },
              { name: 'Events', screen: 'Events' },
              { name: 'Marketplace', screen: 'Marketplace' },
              { name: 'Chairman Message', screen: 'ChairmanMessage' },
              { name: 'Directory', screen: 'Directory' },
              { name: 'Health Services', screen: 'HealthServices' },
              { name: 'Housing', screen: 'Housing' },
              { name: 'Public Safety', screen: 'PublicSafety' },
              { name: 'Youth Programs', screen: 'YouthPrograms' },
              { name: 'Education', screen: 'Education' },
              { name: 'Employment', screen: 'Employment' },
              { name: 'Contact', screen: 'Contact' },
            ].map((item) => (
              <TouchableOpacity
                key={item.screen}
                style={styles.menuItem}
                onPress={() => handleMenuNavigate(item.screen)}
              >
                <Text style={styles.menuItemText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <View style={styles.chairmanHeader}>
            <Image
              source={require('../assets/chairman-joe.jpg')}
              style={styles.chairmanImage}
              resizeMode="cover"
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.chairmanName}>Joe Davis</Text>
              <Text style={styles.chairmanDate}>{chairmanMessage?.date}</Text>
            </View>
          </View>
          <Text style={styles.chairmanMessage}>
            {chairmanMessage?.message}
          </Text>
          <Text style={styles.chairmanFooter}>Words from our Chairman</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Featured: Elkhorn Purses</Text>
          <Image
            source={require('../assets/elkhorn_purses.jpeg')}
            style={styles.marketplaceImage}
            resizeMode="cover"
          />
          <Text style={styles.marketplaceDescription}>
            Handcrafted purses made with traditional techniques and modern style. Support local Hoopa artisans.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Marketplace')}
          >
            <Text style={styles.buttonText}>Visit Marketplace</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Upcoming Community Events</Text>
          {events.length === 0 && (
            <Text style={{ fontStyle: 'italic' }}>No upcoming events.</Text>
          )}
          {events.map((event) => (
            <View key={event.id} style={styles.eventItem}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventDate}>{event.date}</Text>
            </View>
          ))}
          <TouchableOpacity
            style={[styles.button, { marginTop: 10 }]}
            onPress={() => navigation.navigate('Events')}
          >
            <Text style={styles.buttonText}>See All Events</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>About the Hoopa Tribe</Text>
          <Text style={styles.aboutText}>
            The Hoopa Valley Tribe is dedicated to preserving culture, supporting
            community, and fostering prosperity. Reach out to us anytime.
          </Text>
          <Text style={styles.contactInfo}>Address: 1300 Indian Rd, Hoopa, CA</Text>
          <Text style={styles.contactInfo}>Phone: (530) 625-4300</Text>
          <TouchableOpacity style={styles.button} onPress={handleContactUs}>
            <Text style={styles.buttonText}>Contact Us</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.card, { marginBottom: 30 }]}>
          <Text style={styles.sectionTitle}>Tribal Phone Directory</Text>
          <Text>Health Services: (530) 625-4250</Text>
          <Text>Housing Dept: (530) 625-4300 ext. 150</Text>
          <Text>Public Safety: (530) 625-4400</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: 250,
  },
  logoOverlay: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 80,
    height: 80,
  },
  hamburger: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  bar: {
    width: 25,
    height: 3,
    backgroundColor: '#fff',
    marginVertical: 2,
  },
  scrollContent: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 4,
  },
  chairmanHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chairmanImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  chairmanName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chairmanDate: {
    fontSize: 12,
    color: '#666',
  },
  chairmanMessage: {
    marginTop: 10,
    fontSize: 16,
  },
  chairmanFooter: {
    marginTop: 10,
    fontStyle: 'italic',
    color: '#888',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  marketplaceImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  marketplaceDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#b30000',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  eventItem: {
    marginBottom: 10,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  eventDate: {
    fontSize: 14,
    color: '#555',
  },
  aboutText: {
    marginBottom: 8,
    fontSize: 14,
  },
  contactInfo: {
    fontSize: 14,
    marginBottom: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-start',
    paddingTop: 80,
  },
  menuContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
  },
  menuItem: {
    paddingVertical: 10,
  },
  menuItemText: {
    fontSize: 16,
  },
});
