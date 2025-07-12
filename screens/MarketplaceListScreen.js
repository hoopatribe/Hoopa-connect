// screens/MarketplaceListScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { supabase } from '../lib/supabase';

export default function MarketplaceListScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  // Fetch all items from Supabase marketplace_items table
  async function fetchItems() {
    setLoading(true);
    const { data, error } = await supabase
      .from('marketplace_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching marketplace items:', error.message);
      setLoading(false);
      return;
    }

    setItems(data);
    setFilteredItems(data);
    setLoading(false);
  }

  // Filter items based on search text (search title and category)
  const handleSearch = (text) => {
    setSearchText(text);
    if (!text) {
      setFilteredItems(items);
      return;
    }

    const lowerText = text.toLowerCase();
    const filtered = items.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerText) ||
        item.category.toLowerCase().includes(lowerText)
    );
    setFilteredItems(filtered);
  };

  // Render each marketplace item in the list
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('MarketplaceEdit', { item })}
    >
      <Image source={{ uri: item.image_url }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemCategory}>{item.category}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search by title or category"
        style={styles.searchInput}
        value={searchText}
        onChangeText={handleSearch}
        autoCorrect={false}
        autoCapitalize="none"
      />

      {loading ? (
        <ActivityIndicator size="large" color="#4e6bff" style={{ marginTop: 20 }} />
      ) : filteredItems.length === 0 ? (
        <Text style={styles.noItemsText}>No items found.</Text>
      ) : (
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}

      <TouchableOpacity
        style={styles.postButton}
        onPress={() => navigation.navigate('MarketplacePost')}
      >
        <Text style={styles.postButtonText}>+ Post New Item</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 12 },
  searchInput: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 3,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  itemInfo: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  itemTitle: { fontSize: 18, fontWeight: 'bold', color: '#111' },
  itemCategory: { fontSize: 14, color: '#666' },
  itemPrice: { fontSize: 16, fontWeight: 'bold', color: '#4e6bff' },
  noItemsText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
  },
  postButton: {
    backgroundColor: '#4e6bff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  postButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
