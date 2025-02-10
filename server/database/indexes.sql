-- パフォーマンス最適化のためのインデックス
create index if not exists messages_user_id_idx on public.messages(user_id);
create index if not exists messages_created_at_idx on public.messages(created_at);
create index if not exists users_username_idx on public.users(username); 