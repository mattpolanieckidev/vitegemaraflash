import { supabase } from './supabase';

export async function getUsersList() {
  const { data: users, error } = await supabase
    .from('profiles')
    .select('*');

  if (error) {
    console.error('Error fetching users:', error);
    return null;
  }

  console.table(users);
  return users;
}

// Get a specific user's profile
export async function getUserProfile(userId: string) {
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }

  console.log('User profile:', profile);
  return profile;
}