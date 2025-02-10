-- usersテーブルのRLS有効化
alter table public.users enable row level security;

-- 既存のポリシーを削除
drop policy if exists "ユーザーは自分のデータを読み取れる" on public.users;
drop policy if exists "ユーザーは新規登録できる" on public.users;

-- ポリシーの設定
create policy "ユーザーデータの読み取り許可" 
  on public.users 
  for select 
  using (true);

create policy "ユーザーの新規登録許可" 
  on public.users 
  for insert 
  with check (true);

create policy "ユーザーデータの更新許可" 
  on public.users 
  for update 
  using (true);

create policy "ユーザーデータの削除許可" 
  on public.users 
  for delete 
  using (true); 