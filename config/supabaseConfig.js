import { createClient } from "@supabase/supabase-js";

const supabase = createClient('https://recstcojduuucrxsqxki.supabase.co' ,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlY3N0Y29qZHV1dWNyeHNxeGtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA3Mjc3MTUsImV4cCI6MjAzNjMwMzcxNX0.NItortZs-p59Sz6Ns9JY83yt92S4HinJ68t-b8ERGj0')
export default supabase;