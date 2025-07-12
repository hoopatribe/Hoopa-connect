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
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../lib/supabase';

export default function HomeScreen({ navigation }) {
  const [events, setEvents] = useState([]);
  const [chairmanMessage, setChairmanMessage] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [profileExists, setProfileExists] = useState(false);

  useEffect(() => {
    fetchEvents();
    fetchChairmanMessage();
    fetchUserProfile();
  }, []);

  async function fetchUserProfile() {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session?.user) return;

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role, avatar_url')
      .eq('id', session.user.id)
      .single();

    if (profileError) return;

    setUserRole(profile.role);
    setAvatarUrl(profile.avatar_url);
    setProfileExists(true);
  }

  async function uploadAvatar() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: [ImagePicker.MediaType.Images],
      allowsEditing: true,
      quality: 0.7,
    });

    if (result.canceled || !result.assets) return;
    const image = result.assets[0];

    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user?.id) return Alert.alert('Error', 'User not logged in');

    const filePath = `${session.user.id}/${Date.now()}_avatar.jpg`;
    const response = await fetch(image.uri);
    const blob = await response.blob();

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, blob, {
        contentType: 'image/jpeg',
        upsert: true,
      });

    if (uploadError) return Alert.alert('Upload Error', uploadError.message);

    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
    await supabase
      .from('profiles')
      .update({ avatar_url: data.publicUrl })
      .eq('id', session.user.id);

    setAvatarUrl(data.publicUrl);
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
        <Pressable onPress={uploadAvatar} style={styles.avatarContainer}>
          <Image
            source={avatarUrl ? { uri: avatarUrl } : require('../assets/default-avatar.png')}
            style={styles.avatar}
          />
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
              { name: profileExists ? 'Edit Profile' : 'Create Profile', screen: profileExists ? 'EditProfile' : 'CreateProfile' },
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
        {chairmanMessage && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Words from our Chairman</Text>
            <Image
              source={require('../assets/chairman-joe.jpg')}
              style={styles.chairmanImage}
              resizeMode="contain"
            />
            <Text style={styles.sectionText} numberOfLines={2} ellipsizeMode="tail">
              {chairmanMessage.message}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('ChairmanMessage')} style={styles.button}>
              <Text style={styles.buttonText}>Read Full Message</Text>
            </TouchableOpacity>
            <Text style={styles.date}>{chairmanMessage.date}</Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Marketplace Preview</Text>
          <Image
            source={require('../assets/elkhorn_purses.jpeg')}
            style={styles.marketImage}
          />
          <Text style={styles.sectionText}>
            Explore handmade beadwork and more by local artists.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Marketplace')}
          >
            <Text style={styles.buttonText}>Visit Marketplace</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Community Events</Text>
          {events.map((event) => (
            <View key={event.id} style={styles.eventItem}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.date}>{event.date}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Hoopa Connect</Text>
          <Text style={styles.sectionText}>
            Hoopa Connect helps tribal members stay informed, access services, and connect with the community.
          </Text>
          <Text style={styles.sectionText}>
            Address: Hoopa Valley Tribe, Hoopa, CA 95546
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleContactUs}>
            <Text style={styles.buttonText}>Contact Us</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { position: 'relative' },
  backgroundImage: { width: '100%', height: 250 },
  logoOverlay: { position: 'absolute', top: 10, left: 10, width: 80, height: 80 },
  hamburger: { position: 'absolute', top: 20, right: 20 },
  bar: { width: 25, height: 3, backgroundColor: '#fff', marginVertical: 2 },
  avatarContainer: { position: 'absolute', top: 20, right: 60 },
  avatar: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: '#fff' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-start', paddingTop: 80 },
  menuContainer: { backgroundColor: '#fff', marginHorizontal: 20, borderRadius: 12, padding: 16 },
  menuItem: { paddingVertical: 10 },
  menuItemText: { fontSize: 16 },
  scrollContent: { padding: 16 },
  section: { marginBottom: 24, backgroundColor: '#fff', borderRadius: 12, padding: 16, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6, elevation: 3 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  sectionText: { fontSize: 14, color: '#333', marginBottom: 4 },
  chairmanImage: { width: '100%', height: 180, borderRadius: 10, marginBottom: 10 },
  marketImage: { width: '100%', height: 200, borderRadius: 10, marginBottom: 10 },
  button: { backgroundColor: '#4e6bff', paddingVertical: 10, borderRadius: 8, marginTop: 10 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  eventItem: { marginBottom: 8 },
  eventTitle: { fontWeight: 'bold', fontSize: 16 },
  date: { color: '#777', fontSize: 13 },
});
