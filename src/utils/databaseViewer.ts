import { supabase } from '../lib/supabase';

export async function viewTableRecords(tableName: string) {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*');

    if (error) {
      console.error(`Error fetching ${tableName}:`, error);
      return null;
    }

    console.log(`Records from ${tableName}:`);
    console.table(data);
    return data;
  } catch (error) {
    console.error('Database query error:', error);
    return null;
  }
}

export async function viewUserProfiles() {
  return viewTableRecords('profiles');
}