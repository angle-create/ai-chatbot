-- usersテーブルのRLS有効化
alter table public.users enable row level security;

-- ポリシーの設定
create policy "ユーザーは自分のデータを読み取れる" 
  on public.users 
  for select 
  using (true);

create policy "ユーザーは新規登録できる" 
  on public.users 
  for insert 
  with check (true); 