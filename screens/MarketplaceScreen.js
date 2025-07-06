import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../lib/supabase';
import { useUser } from '../context/UserContext';
import uuid from 'react-native-uuid';

const CATEGORIES = ['Jewelry', 'Beadwork', 'Clothing', 'Paintings', 'Other'];

export default function MarketplaceScreen() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Jewelry');
  const [image, setImage] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const { user } = useUser();

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from('marketplace_items')
      .select('*, profiles(full_name, profile_pic)')
      .order('created_at', { ascending: false });

    if (error) console.error(error);
    else setItems(data);
  };

  const uploadImage = async () => {
    if (!image) return null;

    const ext = image.uri.split('.').pop();
    const filename = `${uuid.v4()}.${ext}`;
    const { error } = await supabase.storage
      .from('marketplace')
      .upload(filename, {
        uri: image.uri,
        type: 'image/jpeg',
        name: filename,
      });

    if (error) throw error;

    const { data } = supabase.storage.from('marketplace').getPublicUrl(filename);
    return data.publicUrl;
  };

  const resetForm = () => {
    setTitle('');
    setDesc('');
    setPrice('');
    setCategory('Jewelry');
    setImage(null);
    setEditingItem(null);
  };

  const submitItem = async () => {
    try {
      const imageUrl = image ? await uploadImage() : editingItem?.image_url;

      const payload = {
        title,
        description: desc,
        price,
        category,
        image_url: imageUrl,
        seller_id: user.id,
        seller_email: user.email || '',       // Added seller email
        seller_phone: user.phone || '',       // Added seller phone (make sure user.phone exists in your context)
      };

      let result;
      if (editingItem) {
        result = await supabase
          .from('marketplace_items')
          .update(payload)
          .eq('id', editingItem.id);
      } else {
        result = await supabase.from('marketplace_items').insert(payload);
      }

      if (result.error) throw result.error;

      Alert.alert('Success', editingItem ? 'Item updated!' : 'Item posted!');
      resetForm();
      fetchItems();
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to save item.');
    }
  };

  const deleteItem = async (id) => {
    Alert.alert('Confirm', 'Are you sure you want to delete this item?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        onPress: async () => {
          const { error } = await supabase.from('marketplace_items').delete().eq('id', id);
          if (error) console.error(error);
          else fetchItems();
        },
      },
    ]);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.canceled) setImage(result.assets[0]);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🛍️ Local Artist Marketplace</Text>

      <TextInput
        placeholder="Title"
        placeholderTextColor="#ccc"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Description"
        placeholderTextColor="#ccc"
        style={styles.input}
        value={desc}
        onChangeText={setDesc}
      />
      <TextInput
        placeholder="Price"
        placeholderTextColor="#ccc"
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="decimal-pad"
      />
      <TextInput
        placeholder="Category (e.g. Jewelry, Clothing)"
        placeholderTextColor="#ccc"
        style={styles.input}
        value={category}
        onChangeText={setCategory}
      />

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>📸 Choose Photo</Text>
      </TouchableOpacity>

      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{ width: '100%', height: 200, marginVertical: 10, borderRadius: 8 }}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={submitItem}>
        <Text style={styles.buttonText}>{editingItem ? 'Update Item' : '➕ Post Item'}</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { marginTop: 30 }]}>🖼️ Browse Listings</Text>

      {items.map((item) => (
        <View key={item.id} style={styles.card}>
          {item.image_url && (
            <Image
              source={{ uri: item.image_url }}
              style={{ width: '100%', height: 150, borderRadius: 8 }}
            />
          )}
          <Text style={styles.cardTitle}>{item.title} - ${item.price}</Text>
          <Text style={styles.cardText}>{item.description}</Text>
          <Text style={styles.cardText}>🎨 Category: {item.category}</Text>
          <Text style={styles.cardText}>👤 {item.profiles?.full_name || 'Unknown Artist'}</Text>
          {item.profiles?.profile_pic && (
            <Image
              source={{ uri: item.profiles.profile_pic }}
              style={{ width: 50, height: 50, borderRadius: 25, marginTop: 6 }}
            />
          )}
          <Text style={styles.cardText}>✉️ {item.seller_email || 'No email provided'}</Text>
          <Text style={styles.cardText}>📞 {item.seller_phone || 'No phone provided'}</Text>

          {item.seller_id === user.id && (
            <View style={{ flexDirection: 'row', marginTop: 8 }}>
              <TouchableOpacity
                style={[styles.button, { flex: 1, marginRight: 5 }]}
                onPress={() => {
                  setEditingItem(item);
                  setTitle(item.title);
                  setDesc(item.description);
                  setPrice(item.price);
                  setCategory(item.category);
                  setImage(null);
                }}
              >
                <Text style={styles.buttonText}>✏️ Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { flex: 1, backgroundColor: '#444' }]}
                onPress={() => deleteItem(item.id)}
              >
                <Text style={styles.buttonText}>🗑️ Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}
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
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    padding: 12,
    marginVertical: 6,
    width: '100%',
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#E63946',
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 12,
    width: '100%',
    marginTop: 16,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  cardText: {
    color: '#ccc',
    marginTop: 4,
  },
});
