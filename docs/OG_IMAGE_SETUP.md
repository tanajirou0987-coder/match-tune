# OG画像生成機能のセットアップ

## 概要

Next.js（App Router）を使用したSNSシェア用OG画像（シェアカード）の動的生成機能です。
X（旧Twitter）とLINEで正しく表示されます。

## 必要なパッケージ

Next.js 16では、`next/og`から`ImageResponse`をインポートできますが、
実際には`@vercel/og`パッケージが必要な場合があります。

```bash
npm install @vercel/og
```

または、Next.js 16の標準機能を使用する場合は、追加のパッケージは不要です。

## 実装ファイル

- `/src/app/api/og/route.tsx` - OG画像生成API
- `/src/lib/og-image-utils.ts` - OG画像URL生成ユーティリティ
- `/src/app/diagnoses/compatibility-18/result/metadata-example.ts` - metadata設定例
- `/src/components/SNSShareButtons-example.tsx` - SNS共有ボタン例

## 使用方法

### 1. OG画像URLの生成

```typescript
import { generateOGImageUrl } from '@/lib/og-image-utils';

const ogImageUrl = generateOGImageUrl({
  type: 'AAAタイプ',
  rank: 'Sランク',
  rankLabel: '神相性',
  comment: '最高の相性です！',
  service: 'Pairly Lab',
});
```

### 2. 結果ページでのmetadata設定

#### Server Componentの場合

```typescript
import { generateResultMetadata } from './metadata-example';

export async function generateMetadata({ 
  searchParams 
}: { 
  searchParams: { type: string; rank: string } 
}): Promise<Metadata> {
  return generateResultMetadata({
    type: searchParams.type || 'AAAタイプ',
    rank: searchParams.rank || 'Sランク',
    rankLabel: '神相性',
    comment: '最高の相性です！',
    serviceName: 'Pairly Lab',
    pageUrl: `https://your-domain.com/result?type=${searchParams.type}&rank=${searchParams.rank}`,
  });
}
```

#### Client Componentの場合

Client Componentでは直接metadataを設定できないため、
親のServer Componentでmetadataを設定するか、
`next/head`を使用してください。

### 3. SNS共有ボタンの実装

```typescript
import { SNSShareButtons } from '@/components/SNSShareButtons-example';

<SNSShareButtons
  type="AAAタイプ"
  rank="Sランク"
  rankLabel="神相性"
  comment="最高の相性です！"
  serviceName="Pairly Lab"
  pageUrl="https://your-domain.com/result?type=AAA&rank=S"
/>
```

## APIエンドポイント

### GET /api/og

OG画像を生成するAPIエンドポイントです。

#### クエリパラメータ

- `type` (必須): 診断タイプ名（例: `AAAタイプ`）
- `rank` (必須): 相性ランク（例: `Sランク`）
- `rankLabel` (任意): ランクラベル（例: `神相性`）
- `comment` (必須): 一言コメント（例: `最高の相性です！`）
- `service` (任意): サービス名（デフォルト: `Pairly Lab`）

#### 使用例

```
GET /api/og?type=AAAタイプ&rank=Sランク&rankLabel=神相性&comment=最高の相性です！
```

## デザインのカスタマイズ

`/src/app/api/og/route.tsx`の`ImageResponse`内のJSXを編集することで、
デザインをカスタマイズできます。

### 現在のデザイン

- 背景: 淡いグラデーション（白ベース）
- 情報階層: 3階層構造（メイン → サブ → 補足）
- 中央寄せ
- フォントサイズ: SNS閲覧前提で大きめ

### カスタマイズ例

```tsx
<div
  style={{
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // 背景色変更
    // ... その他のスタイル
  }}
>
  {/* コンテンツ */}
</div>
```

## 環境変数

`.env.local`に以下を設定してください：

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## トラブルシューティング

### OG画像が表示されない場合

1. `@vercel/og`パッケージがインストールされているか確認
2. APIエンドポイントが正しく動作しているか確認（`/api/og`にアクセス）
3. metadataが正しく設定されているか確認
4. ブラウザのキャッシュをクリア

### 日本語が正しく表示されない場合

システムフォントを使用しているため、日本語は正しく表示されるはずです。
カスタムフォントを使用する場合は、`loadFont`関数を実装してください。

## 参考リンク

- [Next.js ImageResponse](https://nextjs.org/docs/app/api-reference/functions/image-response)
- [Vercel OG Image Generation](https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation)
