# フロントエンドドキュメント

## 概要
React、TypeScript、Material-UIを使用したAIチャットボットのフロントエンド実装。
モダンでレスポンシブなUIを提供し、リアルタイムなチャット機能を実現しています。

## 技術スタック
- React
- TypeScript
- Material-UI
- Axios
- Emotion (スタイリング)

## プロジェクト構造
```
client/
├── src/
│   ├── api/           # APIクライアント
│   ├── components/    # Reactコンポーネント
│   ├── App.tsx        # ルートコンポーネント
│   └── index.tsx      # エントリーポイント
├── package.json
└── tsconfig.json
```

## コンポーネント構成

### App.tsx
- アプリケーションのルートコンポーネント
- テーマの設定
- ユーザー認証状態の管理
- ログイン/チャット画面の切り替え

### Login.tsx
- ユーザーログインフォーム
- Material-UIのスタイリング
- エラーハンドリング
- ユーザー作成APIの呼び出し

### ChatContainer.tsx
- チャットのメインコンテナ
- メッセージ履歴の管理
- 自動スクロール機能
- チャット履歴の取得と表示

### ChatMessage.tsx
- 個別のメッセージ表示
- ユーザー/ボットメッセージの区別
- Material-UIを使用したスタイリング

### ChatInput.tsx
- メッセージ入力フォーム
- 送信ボタン
- 入力バリデーション

## APIクライアント (chatApi.ts)

### インターフェース
```typescript
interface Message {
  _id: string;
  userId: string;
  content: string;
  isBot: boolean;
  createdAt: string;
}

interface ChatResponse {
  userMessage: Message;
  botMessage: Message;
}
```

### メソッド
```typescript
const chatApi = {
  sendMessage: (userId: string, content: string) => Promise<ChatResponse>;
  getChatHistory: (userId: string) => Promise<Message[]>;
  createUser: (username: string) => Promise<User>;
  getUser: (username: string) => Promise<User>;
}
```

## スタイリング
- Material-UIのテーマシステムを使用
- Emotionによるスタイルドコンポーネント
- レスポンシブデザイン対応
- ダークモード対応の準備

## 状態管理
- Reactの`useState`フックによるローカル状態管理
- `useEffect`フックによる副作用の管理
- コンポーネント間の状態共有

## 開発用コマンド
```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm start

# ビルド
npm run build

# テスト
npm test
```

## 機能一覧
1. ユーザー認証
   - ユーザー名による簡易ログイン
   - エラーハンドリング

2. チャット機能
   - メッセージの送信
   - リアルタイムレスポンス
   - チャット履歴の表示
   - 自動スクロール

3. UI/UX
   - モダンなデザイン
   - レスポンシブレイアウト
   - ローディング状態の表示
   - エラーメッセージの表示

## エラーハンドリング
- API通信エラーの処理
- 入力バリデーション
- ユーザーフレンドリーなエラーメッセージ

## パフォーマンス最適化
- メモ化によるレンダリングの最適化
- 効率的なリスト表示
- 画像の遅延読み込み

## 今後の改善点
1. ステート管理の改善（Redux/Zustandの導入）
2. テストカバレッジの向上
3. アクセシビリティの改善
4. オフライン対応
5. プログレッシブウェブアプリ（PWA）化

## 注意事項
- バックエンドサーバーが起動していることを確認してください
- 環境変数の設定が必要です
- ブラウザの互換性を確認してください 