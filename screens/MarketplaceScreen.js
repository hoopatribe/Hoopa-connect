import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import { supabase } from '../lib/supabase';

export default function MarketplaceListScreen() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data, error } = await supabase
          .from('marketplace_items')
          .select(`
            id,
            title,
            description,
            category,
            image_url,
            created_at,
            profiles (
              full_name,
              email,
              phone
            )
          `)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error loading marketplace items:', error);
        } else {
          setItems(data || []);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#006400" />
        <Text>Loading marketplace items...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>🎨 Marketplace Listings</Text>
      {items.length === 0 ? (
        <Text style={styles.noItems}>No items posted yet.</Text>
      ) : (
        items.map((item) => (
          <View key={item.id} style={styles.card}>
            {item.image_url && (
              <Image source={{ uri: item.image_url }} style={styles.image} />
            )}
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.category}>Category: {item.category || 'N/A'}</Text>
            <Text style={styles.description}>{item.description}</Text>

            {item.profiles && (
              <View style={styles.artistInfo}>
                <Text style={styles.artist}>By: {item.profiles.full_name || 'Unknown Artist'}</Text>
                {item.profiles.email && (
                  <TouchableOpacity onPress={() => Linking.openURL(`mailto:${item.profiles.email}`)}>
                    <Text style={styles.contact}>📧 {item.profiles.email}</Text>
                  </TouchableOpacity>
                )}
                {item.profiles.phone && (
                  <TouchableOpacity onPress={() => Linking.openURL(`tel:${item.profiles.phone}`)}>
                    <Text style={styles.contact}>📞 {item.profiles.phone}</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#006400',
    marginVertical: 16,
    textAlign: 'center',
  },
  noItems: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: '#888',
    marginBottom: 6,
  },
  description: {
    fontSize: 15,
    color: '#444',
    marginBottom: 10,
  },
  artistInfo: {
    marginTop: 8,
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingTop: 8,
  },
  artist: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#333',
  },
  contact: {
    color: '#007AFF',
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
