import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { supabase } from '../lib/supabase';

export default function EditItemScreen({ route, navigation }) {
  const { item } = route.params;
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [price, setPrice] = useState(String(item.price));

  const handleUpdate = async () => {
    await supabase
      .from('marketplace')
      .update({ title, description, price })
      .eq('id', item.id);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Edit Item</Text>
      <TextInput value={title} onChangeText={setTitle} style={styles.input} placeholder="Title" />
      <TextInput value={description} onChangeText={setDescription} style={styles.input} placeholder="Description" />
      <TextInput value={price} onChangeText={setPrice} style={styles.input} placeholder="Price" keyboardType="numeric" />
      <Button title="Save Changes" onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15 },
  label: { fontSize: 18, marginBottom: 10 },
  input: { backgroundColor: '#eee', padding: 10, marginBottom: 10, borderRadius: 5 },
});
