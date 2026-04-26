create table subscribers (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  created_at timestamptz default now()
);

alter table subscribers enable row level security;
