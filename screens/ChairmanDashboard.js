import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import { supabase } from '../lib/supabase';

export default function ChairmanDashboard() {
  const [message, setMessage] = useState('');
  const [existing, setExisting] = useState(null);

  useEffect(() => {
    fetchCurrentMessage();
  }, []);

  const fetchCurrentMessage = async () => {
    const { data, error } = await supabase
      .from('chairman_messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') console.error('Fetch error:', error);
    if (data) {
      setExisting(data);
      setMessage(data.message);
    }
  };

  const postMessage = async () => {
    if (!message.trim()) {
      Alert.alert('Message is empty');
      return;
    }

    const { error } = await supabase.from('chairman_messages').insert({ message });
    if (error) {
      console.error('Insert error:', error);
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Success', 'Message posted');
      fetchCurrentMessage();
    }
  };

  const deleteMessage = async () => {
    if (!existing) return;

    const { error } = await supabase
      .from('chairman_messages')
      .delete()
      .eq('id', existing.id);

    if (error) {
      console.error('Delete error:', error);
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Deleted', 'Message removed');
      setMessage('');
      setExisting(null);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>👑 Chairman Dashboard</Text>

      <Text style={styles.label}>Message to the Community:</Text>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Write your message here..."
        placeholderTextColor="#888"
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={postMessage}>
        <Text style={styles.buttonText}>📢 Post Message</Text>
      </TouchableOpacity>

      {existing && (
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={deleteMessage}>
          <Text style={styles.buttonText}>🗑️ Delete Message</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111',
    flexGrow: 1,
    padding: 24,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    color: '#ccc',
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    borderRadius: 8,
    padding: 12,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#E63946',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  deleteButton: {
    backgroundColor: '#555',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
