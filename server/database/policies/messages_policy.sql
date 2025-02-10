-- messagesテーブルのRLS有効化
alter table public.messages enable row level security;

-- 既存のポリシーを削除
drop policy if exists "メッセージの読み取り許可" on public.messages;
drop policy if exists "メッセージの作成許可" on public.messages;

-- ポリシーの設定
create policy "メッセージの読み取り許可" 
  on public.messages 
  for select 
  using (true);

create policy "メッセージの作成許可" 
  on public.messages 
  for insert 
  with check (true);

create policy "メッセージの更新許可" 
  on public.messages 
  for update 
  using (true);

create policy "メッセージの削除許可" 
  on public.messages 
  for delete 
  using (true); 