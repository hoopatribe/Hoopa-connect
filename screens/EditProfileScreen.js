import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../lib/supabase';
import { useUser } from '../context/UserContext';
import uuid from 'react-native-uuid';

export default function EditProfileScreen() {
  const { user } = useUser();
  const [profile, setProfile] = useState(null);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [profilePic, setProfilePic] = useState(null);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Error loading profile:', error.message);
    } else {
      setProfile(data);
      setFullName(data.full_name || '');
      setPhone(data.phone || '');
      setProfilePic(data.profile_pic || null);
    }
  };

  const uploadProfilePic = async () => {
    if (!profilePic || !profilePic.uri) return profile?.profile_pic;

    const ext = profilePic.uri.split('.').pop();
    const filename = `${uuid.v4()}.${ext}`;
    const { error } = await supabase.storage
      .from('avatars')
      .upload(filename, {
        uri: profilePic.uri,
        type: 'image/jpeg',
        name: filename,
      });

    if (error) throw error;

    const { data } = supabase.storage.from('avatars').getPublicUrl(filename);
    return data.publicUrl;
  };

  const saveProfile = async () => {
    try {
      const picUrl = await uploadProfilePic();

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          phone,
          profile_pic: picUrl,
        })
        .eq('id', user.id);

      if (error) throw error;

      Alert.alert('Success', 'Profile updated!');
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to save profile');
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) setProfilePic(result.assets[0]);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>👤 Edit My Profile</Text>

      <TouchableOpacity onPress={pickImage}>
        {profilePic?.uri || profilePic ? (
          <Image
            source={{ uri: profilePic.uri || profilePic }}
            style={styles.avatar}
          />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={{ color: '#ccc' }}>Add Photo</Text>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        placeholder="Full Name"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        placeholder="Phone Number"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.button} onPress={saveProfile}>
        <Text style={styles.buttonText}>💾 Save Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111',
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    padding: 14,
    marginBottom: 12,
    borderRadius: 8,
    width: '100%',
  },
  button: {
    backgroundColor: '#E63946',
    padding: 14,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
});
