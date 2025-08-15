// Polyfills for React Native
import 'react-native-url-polyfill/auto';
const structuredClone = require('structured-clone') as (value: any) => any;
import { createClient } from '@supabase/supabase-js';
import { Buffer } from 'buffer';
// import MMKVStorage from '../redux/MMKV'; // Uncomment if you want to use custom storage

const supabaseUrl = 'https://yunxfwplkhblmgnqyhus.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1bnhmd3Bsa2hibG1nbnF5aHVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0MzkzMzUsImV4cCI6MjA2NjAxNTMzNX0.P2UJwYcz7odKi6JyZqHVZgB-o-_l1eUdILZG4gvFnA8';

// Polyfill structuredClone globally if it doesn't exist
if (typeof globalThis.structuredClone === 'undefined') {
  globalThis.structuredClone = structuredClone;
}
if (typeof global.Buffer === 'undefined') {
  global.Buffer = Buffer;
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false, // disable auto token refresh
    persistSession: false, // disable session persistence
    detectSessionInUrl: false, // disable auto session parsing from deep links
    // storage: MMKVStorage,    // optional: uncomment if you want to use MMKVStorage for session persistence
  },
});
