import { supabase } from './supabase';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export async function uploadMarketplaceImage(file) {
  if (!file) return { error: 'No file selected' };

  const fileExt = file.uri.split('.').pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  const filePath = `uploads/${fileName}`;

  const { data, error } = await supabase.storage
    .from('marketplace')
    .upload(filePath, {
      uri: file.uri,
      type: file.type,
      name: file.name ?? fileName,
    });

  if (error) return { error };

  const { data: publicUrl } = supabase.storage
    .from('marketplace')
    .getPublicUrl(filePath);

  return { publicUrl: publicUrl.publicUrl };
}
