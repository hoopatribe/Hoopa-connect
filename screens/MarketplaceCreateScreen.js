import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../lib/supabase';
import { useUser } from '../context/UserContext';
import uuid from 'react-native-uuid';

export default function MarketplaceCreateScreen({ navigation }) {
  const { user } = useUser();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Jewelry');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.status !== 'granted') {
      Alert.alert('Permission Denied', 'Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!image) return null;

    try {
      const fileExt = image.split('.').pop();
      const fileName = `${uuid.v4()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const response = await fetch(image);
      const blob = await response.blob();

      const { error } = await supabase.storage
        .from('marketplace-images')
        .upload(filePath, blob, {
          contentType: 'image/jpeg',
          upsert: true,  // allow overwrite if needed
        });

      if (error) {
        Alert.alert('Image upload failed', error.message);
        return null;
      }

      const { data } = supabase.storage.from('marketplace-images').getPublicUrl(filePath);
      return data.publicUrl;
    } catch (error) {
      Alert.alert('Upload error', error.message);
      return null;
    }
  };

  const handleSubmit = async () => {
    if (!title || !description || !price || !image) {
      Alert.alert('Please fill out all fields and select an image.');
      return;
    }

    const imageUrl = await uploadImage();
    if (!imageUrl) return;

    const { error } = await supabase.from('marketplace_items').insert({
      user_id: user.id,
      title,
      description,
      price: parseFloat(price),
      category: category.toLowerCase(),
      image_url: imageUrl,
    });

    if (error) {
      Alert.alert('Error posting item', error.message);
    } else {
      Alert.alert('Item posted successfully!');
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        placeholder="Description"
        style={styles.input}
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
      />

      <TextInput
        placeholder="Price"
        style={styles.input}
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.preview} />
        ) : (
          <Text style={styles.imageText}>📷 Pick Image</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Post Item</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1, backgroundColor: '#f5f5f5' },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  imagePicker: {
    backgroundColor: '#ddd',
    borderRadius: 8,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  imageText: { fontSize: 16, color: '#333' },
  preview: { width: '100%', height: '100%', borderRadius: 8 },
  button: {
    backgroundColor: '#006400',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
