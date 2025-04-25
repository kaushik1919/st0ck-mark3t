-- Disable email verification
update auth.users set email_confirmed_at = now() where email = 'veeraking@gmail.com';

-- Create the pre-existing user if not exists
insert into auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_user_meta_data
) values (
  '00000000-0000-0000-0000-000000000001',
  'veeraking@gmail.com',
  crypt('goatveera', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"full_name": "Veera King"}'
) on conflict (email) do nothing;

-- Create profile for the pre-existing user
insert into public.profiles (
  id,
  email,
  full_name,
  updated_at,
  created_at
) values (
  '00000000-0000-0000-0000-000000000001',
  'veeraking@gmail.com',
  'Veera King',
  now(),
  now()
) on conflict (id) do nothing; 