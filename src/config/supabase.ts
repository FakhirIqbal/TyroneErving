import 'react-native-url-polyfill/auto';
const structuredClone = require('structured-clone') as (value: any) => any;
import { createClient } from '@supabase/supabase-js';
import { Buffer } from 'buffer';
import MMKVStorage from '../redux/MMKV';

const supabaseUrl = 'https://yunxfwplkhblmgnqyhus.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1bnhmd3Bsa2hibG1nbnF5aHVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0MzkzMzUsImV4cCI6MjA2NjAxNTMzNX0.P2UJwYcz7odKi6JyZqHVZgB-o-_l1eUdILZG4gvFnA8';

if (typeof globalThis.structuredClone === 'undefined') {
  globalThis.structuredClone = structuredClone;
}
if (typeof global.Buffer === 'undefined') {
  global.Buffer = Buffer;
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: MMKVStorage,
  },
});

// Key for checking the persisted token //
// sb-yunxfwplkhblmgnqyhus-auth-token //
