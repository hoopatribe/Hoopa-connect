import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { supabase } from '../lib/supabase';

export default function IDVaultScreen() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchSavedImage = async () => {
      const session = await supabase.auth.getSession();
      const user = session.data?.session?.user;

      if (!user) return;

      const { data, error } = await supabase
        .from('id_vault')
        .select('id_image_url')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.warn('No saved image found.');
        return;
      }

      if (data?.id_image_url) {
        setSelectedImage(data.id_image_url);
      }
    };

    fetchSavedImage();
  }, []);

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['image/*', 'application/pdf'],
      copyToCacheDirectory: true,
    });

    if (result.assets && result.assets[0]) {
      const file = result.assets[0];
      await uploadFile(file);
    }
  };

  const uploadFile = async (file) => {
    try {
      setUploading(true);

      const fileExt = file.name.split('.').pop();
      const filePath = `user_${Date.now()}.${fileExt}`;
      const fileContent = await FileSystem.readAsStringAsync(file.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const session = await supabase.auth.getSession();
      const user = session.data?.session?.user;

      if (!user) {
        Alert.alert('Not logged in');
        return;
      }

      const { error: uploadError } = await supabase.storage
        .from('id_cards')
        .upload(filePath, Buffer.from(fileContent, 'base64'), {
          contentType: file.mimeType || 'application/octet-stream',
          upsert: true,
        });

      if (uploadError) throw uploadError;

      // Get signed URL
      const { data: signedUrlData, error: urlError } = await supabase.storage
        .from('id_cards')
        .createSignedUrl(filePath, 60 * 60 * 24 * 365); // 1 year

      if (urlError) throw urlError;

      const imageUrl = signedUrlData.signedUrl;

      // Save to id_vault table
      const { error: dbError } = await supabase
        .from('id_vault')
        .upsert({ user_id: user.id, id_image_url: imageUrl });

      if (dbError) throw dbError;

      setSelectedImage(imageUrl);
      Alert.alert('Success', 'ID uploaded and saved!');
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Upload Failed', error.message || 'Something went wrong');
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Your Tribal ID</Text>

      <TouchableOpacity style={styles.button} onPress={pickDocument} disabled={uploading}>
        <Text style={styles.buttonText}>{uploading ? 'Uploading...' : 'Choose Image or PDF'}</Text>
      </TouchableOpacity>

      {uploading && <ActivityIndicator size="large" color="#E63946" style={{ marginTop: 20 }} />}

      {selectedImage && !uploading && selectedImage.endsWith('.pdf') ? (
        <Text style={styles.pdfText}>PDF Uploaded</Text>
      ) : selectedImage ? (
        <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#E63946',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  pdfText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 20,
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 8,
  },
});
