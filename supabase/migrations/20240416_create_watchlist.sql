-- Create watchlist table
create table if not exists public.watchlist (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  symbol text not null,
  name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, symbol)
);

-- Set up Row Level Security (RLS)
alter table public.watchlist enable row level security;

-- Create policies
create policy "Users can view their own watchlist"
  on watchlist for select
  using (auth.uid() = user_id);

create policy "Users can insert into their own watchlist"
  on watchlist for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own watchlist"
  on watchlist for update
  using (auth.uid() = user_id);

create policy "Users can delete from their own watchlist"
  on watchlist for delete
  using (auth.uid() = user_id);

-- Grant necessary permissions
grant select, insert, update, delete on public.watchlist to authenticated; 