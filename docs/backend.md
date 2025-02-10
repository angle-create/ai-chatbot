# バックエンドドキュメント

## 概要
Node.js、Express、TypeScript、MongoDBを使用したAIチャットボットのバックエンドAPIサーバー。
Google Gemini APIを利用して自然言語処理を実現しています。

## 技術スタック
- Node.js
- TypeScript
- Express.js
- MongoDB (Mongoose)
- Google Gemini API

## プロジェクト構造
```
server/
├── src/
│   ├── config/         # 設定ファイル
│   ├── controllers/    # コントローラー
│   ├── models/        # データモデル
│   ├── routes/        # ルーティング
│   └── index.ts       # エントリーポイント
├── package.json
└── tsconfig.json
```

## API エンドポイント

### ユーザー関連
#### ユーザーの作成
- エンドポイント: `POST /api/users`
- リクエストボディ:
  ```json
  {
    "username": "string"
  }
  ```
- レスポンス:
  ```json
  {
    "_id": "string",
    "username": "string",
    "createdAt": "string"
  }
  ```

#### ユーザーの取得
- エンドポイント: `GET /api/users/:username`
- レスポンス:
  ```json
  {
    "_id": "string",
    "username": "string",
    "createdAt": "string"
  }
  ```

### チャット関連
#### メッセージの送信
- エンドポイント: `POST /api/chat`
- リクエストボディ:
  ```json
  {
    "userId": "string",
    "content": "string"
  }
  ```
- レスポンス:
  ```json
  {
    "userMessage": {
      "_id": "string",
      "userId": "string",
      "content": "string",
      "isBot": false,
      "createdAt": "string"
    },
    "botMessage": {
      "_id": "string",
      "userId": "string",
      "content": "string",
      "isBot": true,
      "createdAt": "string"
    }
  }
  ```

#### チャット履歴の取得
- エンドポイント: `GET /api/chat/:userId`
- レスポンス:
  ```json
  [
    {
      "_id": "string",
      "userId": "string",
      "content": "string",
      "isBot": boolean,
      "createdAt": "string"
    }
  ]
  ```

## データモデル

### User
```typescript
{
  username: string;  // ユーザー名（一意）
  createdAt: Date;  // 作成日時
}
```

### ChatMessage
```typescript
{
  userId: ObjectId;  // ユーザーID
  content: string;   // メッセージ内容
  isBot: boolean;    // ボットのメッセージかどうか
  createdAt: Date;   // 作成日時
}
```

## 環境設定
`.env`ファイルに以下の環境変数を設定する必要があります：
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-chatbot
GEMINI_API_KEY=your_gemini_api_key_here
```

## 開発用コマンド
```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# 本番サーバーの起動
npm start
```

## エラーハンドリング
- 400: Bad Request - リクエストパラメータが不正
- 404: Not Found - リソースが見つからない
- 500: Internal Server Error - サーバー内部エラー

## セキュリティ
- CORSの設定
- 環境変数による機密情報の管理
- リクエストボディのバリデーション

## 注意事項
- MongoDBが起動していることを確認してください
- 有効なGemini APIキーが必要です
- 本番環境では適切なセキュリティ設定を行ってください 