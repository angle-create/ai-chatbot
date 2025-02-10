-- messagesテーブルのRLS有効化
alter table public.messages enable row level security;

-- ポリシーの設定
create policy "ユーザーは自分のメッセージを読み取れる" 
  on public.messages 
  for select 
  using (auth.uid() = user_id);

create policy "ユーザーは新しいメッセージを作成できる" 
  on public.messages 
  for insert 
  with check (auth.uid() = user_id); 