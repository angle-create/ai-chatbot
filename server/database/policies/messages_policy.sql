-- messagesテーブルのRLS有効化
alter table public.messages enable row level security;

-- ポリシーの設定
create policy "メッセージの読み取り許可" 
  on public.messages 
  for select 
  using (true);

create policy "メッセージの作成許可" 
  on public.messages 
  for insert 
  with check (true); 