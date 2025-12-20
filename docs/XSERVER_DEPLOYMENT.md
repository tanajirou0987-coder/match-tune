# XサーバーへのNext.jsアプリデプロイ手順

## 📋 前提条件

- Xサーバーのドメイン取得済み
- Xサーバーのアカウント作成済み
- FTPまたはSSHアクセス情報を取得

## 🔍 ステップ1: XサーバーのNode.js対応確認

XサーバーでNext.jsを動かすには、以下のいずれかの方法が必要です：

### 方法A: XサーバーのNode.js対応プラン（推奨）
- Xサーバーの一部プランではNode.jsが利用可能
- コントロールパネルで「Node.js」機能が有効か確認

### 方法B: 静的エクスポート（API機能が制限される）
- APIルートが使えないため、一部機能が制限される可能性

### 方法C: 別のホスティングサービス（Vercel推奨）
- Next.jsに最適化されている
- 無料プランでも利用可能

## 📝 ステップ2: 環境変数の準備

デプロイ前に必要な環境変数を確認：

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 🚀 デプロイ手順（XサーバーでNode.jsが利用可能な場合）

### 1. ビルドの準備

```bash
# 依存関係のインストール
npm install

# 本番用ビルド
npm run build
```

### 2. ファイルのアップロード

XサーバーのFTPまたはSSHで以下をアップロード：
- `.next/` フォルダ（ビルド成果物）
- `public/` フォルダ
- `package.json`
- `node_modules/` または `npm install` をサーバーで実行

### 3. サーバーでの設定

SSHでサーバーに接続後：

```bash
# Node.jsのバージョン確認
node --version

# 依存関係のインストール
npm install --production

# アプリの起動
npm start
```

## 📝 次のステップ

1. XサーバーのコントロールパネルでNode.js機能を確認
2. ドメイン名を教えてください（環境変数の設定に必要）
3. FTP/SSH情報を確認
