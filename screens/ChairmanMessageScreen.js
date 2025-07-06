import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { supabase } from '../lib/supabase';
import { useUser } from '../context/UserContext';

export default function ChairmanMessageScreen() {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const { userRole, user } = useUser();

  const fetchMessage = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('chairman_messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error('Error fetching message:', error);
    } else {
      setMessage(data);
      setNewMessage(data?.message || '');
    }
    setLoading(false);
  };

  const postMessage = async () => {
    if (!newMessage.trim()) return Alert.alert('Error', 'Message cannot be empty');

    const { error } = await supabase.from('chairman_messages').insert({
      message: newMessage,
      created_by: user?.id,
    });

    if (error) {
      console.error(error);
      Alert.alert('Error', 'Could not post message');
    } else {
      Alert.alert('Success', 'Message posted!');
      fetchMessage();
    }
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📢 Chairman Message</Text>

      <Image
        source={require('../assets/chairman-joe.jpg')}
        style={styles.chairmanImage}
        resizeMode="cover"
      />

      {loading ? (
        <ActivityIndicator size="large" color="#E63946" />
      ) : message ? (
        <View style={styles.messageBox}>
          <Text style={styles.messageText}>{message.message}</Text>
          <Text style={styles.timestamp}>
            {new Date(message.created_at).toLocaleString()}
          </Text>
        </View>
      ) : (
        <Text style={styles.noMessage}>No message posted yet.</Text>
      )}

      {userRole === 'chairman' && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Write a new message..."
            placeholderTextColor="#666"
            multiline
            value={newMessage}
            onChangeText={setNewMessage}
          />
          <TouchableOpacity style={styles.button} onPress={postMessage}>
            <Text style={styles.buttonText}>Post Message</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111',
    flexGrow: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  chairmanImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#fff',
  },
  messageBox: {
    backgroundColor: '#222',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    marginBottom: 16,
  },
  messageText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 12,
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
  noMessage: {
    color: '#aaa',
    fontSize: 16,
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    width: '100%',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#E63946',
    padding: 14,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
