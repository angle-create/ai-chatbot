-- スキーマの作成
create schema if not exists public;

-- 拡張機能の有効化
create extension if not exists "uuid-ossp";

-- 既存のテーブルが存在する場合は削除
drop table if exists public.messages;
drop table if exists public.users;

-- usersテーブルの作成
create table public.users (
  id uuid default uuid_generate_v4() primary key,
  username text unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- messagesテーブルの作成
create table public.messages (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) not null,
  content text not null,
  is_bot boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- インデックスの作成
create index if not exists messages_user_id_idx on public.messages(user_id);
create index if not exists messages_created_at_idx on public.messages(created_at);
create index if not exists users_username_idx on public.users(username);

-- Row Level Security (RLS) の有効化
alter table public.users enable row level security;
alter table public.messages enable row level security;

-- usersテーブルのポリシー設定
create policy "ユーザーは自分のデータを読み取れる" 
  on public.users 
  for select 
  using (true);

create policy "ユーザーは新規登録できる" 
  on public.users 
  for insert 
  with check (true);

-- messagesテーブルのポリシー設定
create policy "ユーザーは自分のメッセージを読み取れる" 
  on public.messages 
  for select 
  using (auth.uid() = user_id);

create policy "ユーザーは新しいメッセージを作成できる" 
  on public.messages 
  for insert 
  with check (auth.uid() = user_id);

-- コメント追加
comment on table public.users is 'ユーザー情報を管理するテーブル';
comment on table public.messages is 'チャットメッセージを管理するテーブル';
comment on column public.users.id is 'ユーザーの一意識別子';
comment on column public.users.username is 'ユーザー名（一意）';
comment on column public.users.created_at is 'ユーザー作成日時';
comment on column public.messages.id is 'メッセージの一意識別子';
comment on column public.messages.user_id is 'メッセージを送信したユーザーのID';
comment on column public.messages.content is 'メッセージの内容';
comment on column public.messages.is_bot is 'ボットからのメッセージかどうか';
comment on column public.messages.created_at is 'メッセージ作成日時'; 