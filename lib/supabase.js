// lib/supabase.js
import { Buffer } from 'buffer';
global.Buffer = Buffer;
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tyfangqdrqciqrvanlfi.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5ZmFuZ3FkcnFjaXFydmFubGZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1MDA4NzksImV4cCI6MjA2NzA3Njg3OX0.pgK4S3X_Ih1BrOkXPEVvAdaQLVHEhwocVDdrFSMxssU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
