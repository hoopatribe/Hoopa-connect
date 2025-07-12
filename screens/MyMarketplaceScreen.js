// screens/MyMarketplaceScreen.js
import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  RefreshControl,
} from 'react-native';
import { supabase } from '../lib/supabase';
import { useUser } from '../context/UserContext';

export default function MyMarketplaceScreen({ navigation }) {
  const { user } = useUser();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMyItems = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('marketplace_items')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      Alert.alert('Error', 'Error loading your items: ' + error.message);
    } else {
      setItems(data || []);
    }
    setLoading(false);
  }, [user.id]);

  useEffect(() => {
    fetchMyItems();
  }, [fetchMyItems]);

  const handleDelete = (itemId) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this item?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const { error } = await supabase
            .from('marketplace_items')
            .delete()
            .eq('id', itemId);
          if (error) {
            Alert.alert('Error', 'Failed to delete item: ' + error.message);
          } else {
            Alert.alert('Deleted', 'Item deleted successfully.');
            fetchMyItems();
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {item.image_url ? (
        <Image source={{ uri: item.image_url }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.imagePlaceholder]}>
          <Text style={{ color: '#999' }}>No Image</Text>
        </View>
      )}
      <Text style={styles.title}>{item.title || 'No Title'}</Text>
      <Text style={styles.description}>{item.description || 'No Description'}</Text>
      <Text style={styles.price}>${item.price != null ? item.price.toFixed(2) : 'N/A'}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => navigation.navigate('MarketplaceEdit', { item })}>
          <Text style={styles.edit}>✏️ Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Text style={styles.delete}>🗑️ Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchMyItems} />}
        ListEmptyComponent={
          !loading && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>You have no marketplace items yet.</Text>
            </View>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: '#f5f5f5' },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { fontWeight: 'bold', fontSize: 18, marginTop: 8, color: '#111' },
  description: { marginTop: 4, color: '#666' },
  price: { marginTop: 4, fontWeight: 'bold', color: '#222' },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  edit: { color: '#1D3557', fontWeight: 'bold' },
  delete: { color: '#D00000', fontWeight: 'bold' },
  emptyContainer: { marginTop: 50, alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#666' },
});
